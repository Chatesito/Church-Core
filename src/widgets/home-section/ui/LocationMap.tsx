export interface LocationMapProps {
  embedUrl: string;
}

export function LocationMap({ embedUrl }: LocationMapProps) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl text-primary mb-6 font-bold">Ubicación</h2>
      <div className="w-full h-96 bg-accent rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de la Parroquia"
        />
      </div>
    </div>
  );
}
