// src/pages-flat/home/ui/HomePage.tsx
// Using "pages-flat" to avoid naming conflicts with Next.js "app" folder routing

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section (Aislada por ahora para la iteración de la Home) */}
      <section className="flex flex-col items-center justify-center py-20 bg-secondary text-primary">
        <h1 className="text-5xl font-serif font-bold text-center mb-4">
          Parroquia San Juan María Vianney
        </h1>
        <p className="text-xl font-sans text-center max-w-2xl px-4 text-surface/80">
          Bienvenidos a nuestra comunidad de fe en Neiva, Huila.
        </p>
      </section>

      {/* Placeholder para los próximos componentes atómicos (Quick Info, Lecturas) */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full text-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border border-primary/20 rounded-lg bg-surface shadow-sm">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">Próxima Misa</h2>
            <p className="text-lg">Próximamente estaremos configurando los horarios dinámicos.</p>
          </div>
          <div className="p-6 border border-primary/20 rounded-lg bg-surface shadow-sm">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">Evangelio del Día</h2>
            <p className="text-lg">Cargando lecturas diarias de la liturgia...</p>
          </div>
        </div>
      </section>
    </main>
  );
}
