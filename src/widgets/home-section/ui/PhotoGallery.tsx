import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';

export interface PhotoGalleryProps {
  images: string[];
}

/**
 * Calcula la mejor distribución de columnas para llenar el espacio uniformemente.
 * Busca el número de columnas que minimice los espacios vacíos.
 */
function getOptimalColumns(imageCount: number): number {
  if (imageCount <= 1) return 1;
  if (imageCount === 2) return 2;
  if (imageCount === 3) return 3;
  if (imageCount === 4) return 2; // 2×2 perfecto
  if (imageCount === 5) return 3; // 3+2 (mejor que 2+2+1)
  if (imageCount === 6) return 3; // 3×2 perfecto
  if (imageCount === 7) return 4; // 4+3 (mejor que 3+3+1)
  if (imageCount === 8) return 4; // 4×2 perfecto
  if (imageCount === 9) return 3; // 3×3 perfecto
  
  // Para 10+, buscar el divisor más cercano a la raíz cuadrada
  const sqrt = Math.sqrt(imageCount);
  const floor = Math.floor(sqrt);
  const ceil = Math.ceil(sqrt);
  
  // Preferir el que deje menos huecos
  if (imageCount % ceil === 0) return ceil;
  if (imageCount % floor === 0) return floor;
  return ceil; // Si no hay divisor exacto, usar el mayor
}

/**
 * Calcula cuántas filas necesitamos
 */
function getRowCount(imageCount: number, columns: number): number {
  return Math.ceil(imageCount / columns);
}

export function PhotoGallery({ images }: PhotoGalleryProps) {
  const columns = getOptimalColumns(images.length);
  const rows = getRowCount(images.length, columns);
  
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-3xl text-primary mb-4 font-bold">Galería</h2>
      <div 
        className="grid gap-2 flex-1"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg relative min-h-[80px]"
          >
            <ImageWithFallback
              src={image}
              alt={`Galería ${index + 1}`}
              fill
              sizes={`(max-width: 768px) ${100/columns}vw, ${50/columns}vw`}
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
