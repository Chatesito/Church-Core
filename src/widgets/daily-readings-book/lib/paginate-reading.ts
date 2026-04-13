import type { BookPage, DayReading, PaginationConfig } from '../model/types';
import { READING_TYPE_LABELS, READING_TYPE_ORDER } from '../model/types';
import { layoutNextLine, prepareWithSegments } from '@chenglou/pretext';
import type { LayoutCursor } from '@chenglou/pretext';

const MIN_LINES_PER_PAGE = 8;
const HORIZONTAL_SAFETY_PX = 10;
const EXTRA_VERTICAL_BUFFER_MULTIPLIER = 1;
const LINES_SAFETY_BUFFER = 2;
const HEIGHT_USAGE_RATIO = 0.65;
const WIDTH_USAGE_RATIO = 0.75;
const AVG_GLYPH_WIDTH_RATIO = 0.56;

const DEFAULT_PAGINATION_CONFIG: PaginationConfig = {
  containerWidth: 820,
  containerHeight: 980,
  fontSize: 18,
  lineHeight: 1.625,
  fontFamily: 'Georgia, serif',
  paddingX: 32,
  paddingY: 32,
};

interface TextChunk {
  text: string;
}

function normalizeContent(input: string): string {
  return input
    .replaceAll('\r\n', '\n')
    .replaceAll('\t', ' ')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim();
}

function getPageMetrics(config: PaginationConfig) {
  const innerWidth = Math.max(1, config.containerWidth - config.paddingX * 2 - HORIZONTAL_SAFETY_PX);
  const innerHeight = Math.max(
    1,
    config.containerHeight - config.paddingY * 2 - config.paddingY * EXTRA_VERTICAL_BUFFER_MULTIPLIER,
  );
  const lineHeightPx = Math.max(1, config.fontSize * config.lineHeight);
  const conservativeHeight = Math.max(1, innerHeight * HEIGHT_USAGE_RATIO);

  const linesPerPage = Math.max(
    MIN_LINES_PER_PAGE,
    Math.floor(conservativeHeight / lineHeightPx) - LINES_SAFETY_BUFFER,
  );

  const conservativeWidth = Math.max(1, innerWidth * WIDTH_USAGE_RATIO);
  const charsPerLine = Math.max(
    8,
    Math.floor(conservativeWidth / Math.max(1, config.fontSize * AVG_GLYPH_WIDTH_RATIO)),
  );
  const safeWidth = Math.max(1, charsPerLine * config.fontSize * AVG_GLYPH_WIDTH_RATIO);

  return { safeWidth, linesPerPage, charsPerLine };
}

function canUseBrowserTextMeasurement(): boolean {
  const isBrowser = typeof window !== 'undefined' || typeof document !== 'undefined';
  if (!isBrowser) {
    return false;
  }

  const hasOffscreenCanvas = typeof OffscreenCanvas !== 'undefined';
  const hasCanvasElement =
    typeof document !== 'undefined' && typeof document.createElement === 'function';

  return hasOffscreenCanvas || hasCanvasElement;
}

function toMeasuredLines(text: string, maxWidth: number, font: string): string[] {
  const paragraphs = text.split('\n');
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    const trimmedParagraph = paragraph.trim();

    if (trimmedParagraph.length === 0) {
      lines.push('');
      continue;
    }

    const prepared = prepareWithSegments(trimmedParagraph, font);
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

    while (true) {
      const line = layoutNextLine(prepared, cursor, maxWidth);
      if (!line) {
        break;
      }

      lines.push(line.text.trimEnd());
      cursor = line.end;
    }
  }

  return lines;
}

function splitLongToken(token: string, maxCharsPerLine: number): string[] {
  if (token.length <= maxCharsPerLine) {
    return [token];
  }

  const pieces: string[] = [];
  for (let start = 0; start < token.length; start += maxCharsPerLine) {
    pieces.push(token.slice(start, start + maxCharsPerLine));
  }

  return pieces;
}

function wrapParagraphHeuristically(paragraph: string, charsPerLine: number): string[] {
  const trimmed = paragraph.trim();
  if (trimmed.length === 0) {
    return [''];
  }

  const words = trimmed.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidates = splitLongToken(word, charsPerLine);

    for (const candidate of candidates) {
      if (current.length === 0) {
        current = candidate;
        continue;
      }

      const next = `${current} ${candidate}`;
      if (next.length <= charsPerLine) {
        current = next;
      } else {
        lines.push(current);
        current = candidate;
      }
    }
  }

  if (current.length > 0) {
    lines.push(current);
  }

  return lines;
}

function toHeuristicLines(text: string, charsPerLine: number): string[] {
  const paragraphs = text.split('\n');
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    lines.push(...wrapParagraphHeuristically(paragraph, charsPerLine));
  }

  return lines;
}

function toSafeLines(text: string, maxWidth: number, font: string, charsPerLine: number): string[] {
  if (!canUseBrowserTextMeasurement()) {
    return toHeuristicLines(text, charsPerLine);
  }

  try {
    return toMeasuredLines(text, maxWidth, font);
  } catch {
    return toHeuristicLines(text, charsPerLine);
  }
}

function sanitizeChunkLines(lines: string[]): string[] {
  const firstTextLine = lines.findIndex((line) => line.trim().length > 0);
  if (firstTextLine < 0) {
    return [];
  }

  const lastTextLine = (() => {
    for (let index = lines.length - 1; index >= 0; index -= 1) {
      if (lines[index].trim().length > 0) {
        return index;
      }
    }
    return firstTextLine;
  })();

  return lines.slice(firstTextLine, lastTextLine + 1);
}

function chunkMeasuredLines(lines: string[], maxLinesPerChunk: number): TextChunk[] {
  const chunks: TextChunk[] = [];

  for (let cursor = 0; cursor < lines.length; cursor += maxLinesPerChunk) {
    const rawChunk = lines.slice(cursor, cursor + maxLinesPerChunk);
    const trimmedChunk = sanitizeChunkLines(rawChunk);

    if (trimmedChunk.length === 0) {
      continue;
    }

    chunks.push({
      text: trimmedChunk.join('\n').trim(),
    });
  }

  return chunks;
}

function mergeConfig(config: PaginationConfig): PaginationConfig {
  return {
    ...DEFAULT_PAGINATION_CONFIG,
    ...config,
  };
}

/**
 * Heuristic paginator for the Daily Readings Book.
 *
 * This function is SSR-safe and does not rely on DOM measurements.
 * It estimates line breaks from container and typography configuration,
 * then chunks each reading into page-sized sections.
 *
 * Intended usage:
 * - Server-side: produce deterministic first paint pages
 * - Client-side hook: can replace or refine with browser/pretext measurements
 */
export function paginateReading(dayReading: DayReading, config: PaginationConfig): BookPage[] {
  const resolvedConfig = mergeConfig(config);
  const { safeWidth, linesPerPage, charsPerLine } = getPageMetrics(resolvedConfig);
  const font = `${resolvedConfig.fontSize}px ${resolvedConfig.fontFamily}`;
  const pages: BookPage[] = [];

  for (const readingType of READING_TYPE_ORDER) {
    const reading = dayReading.readings.find((entry) => entry.type === readingType);
    if (!reading) {
      continue;
    }

    const normalizedText = normalizeContent(reading.text);
    if (normalizedText.length === 0) {
      continue;
    }

    const firstPageHeaderLines = 4;
    const continuationHeaderLines = 2;

    const firstPageBudget = Math.max(1, linesPerPage - firstPageHeaderLines);
    const continuationBudget = Math.max(1, linesPerPage - continuationHeaderLines);

    const measuredLines = toSafeLines(normalizedText, safeWidth, font, charsPerLine);
    const preliminaryChunks = chunkMeasuredLines(measuredLines, firstPageBudget);

    if (preliminaryChunks.length === 0) {
      continue;
    }

    const firstChunk = preliminaryChunks[0];
    pages.push({
      content: firstChunk.text,
      pageNumber: pages.length + 1,
      isFirstOfReading: true,
      readingType,
      reference: reading.reference,
      readingTypeLabel: READING_TYPE_LABELS[readingType],
    });

    const remainderText = preliminaryChunks.slice(1).map((chunk) => chunk.text).join('\n\n').trim();
    if (remainderText.length === 0) {
      continue;
    }

    const continuationLines = toSafeLines(remainderText, safeWidth, font, charsPerLine);
    const continuationChunks = chunkMeasuredLines(continuationLines, continuationBudget);

    for (const chunk of continuationChunks) {
      pages.push({
        content: chunk.text,
        pageNumber: pages.length + 1,
        isFirstOfReading: false,
        readingType,
        reference: reading.reference,
        readingTypeLabel: READING_TYPE_LABELS[readingType],
      });
    }
  }

  return pages;
}
