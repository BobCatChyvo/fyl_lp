export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="font-serif text-5xl font-bold mb-6 text-center">
        Bienvenido a la <span className="text-primary">Pastelería</span>
      </h1>
      <p className="text-xl text-textMuted max-w-lg text-center mb-8">
        Explora nuestros pasteles, bollería y postres creados con pasión y los mejores ingredientes.
      </p>
      <div className="flex gap-4">
        <button className="bg-primary hover:bg-[hsl(347,79%,45%)] text-white px-6 py-3 rounded-md font-medium transition-colors shadow-lg shadow-primary/20">
          Ver Catálogo
        </button>
        <button className="bg-card hover:bg-card/80 border border-secondary text-secondary px-6 py-3 rounded-md font-medium transition-colors">
          Sobre Nosotros
        </button>
      </div>
    </main>
  );
}
