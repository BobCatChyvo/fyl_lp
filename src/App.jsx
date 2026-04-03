import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Minimalista */}
      <nav className="w-full py-6 px-8 flex justify-between items-center border-b border-white/10 bg-bakery-dark/80 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_30px_rgba(212,175,55,0.1)]">
        <div className="text-2xl font-bold tracking-wider text-bakery-accent border-2 border-bakery-accent p-2 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] transition-all duration-300 cursor-pointer animate-glow">FYL</div>
        <ul className="flex gap-8 text-sm uppercase tracking-wide font-medium">
          <li className="hover:text-bakery-accent hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] cursor-pointer transition-all duration-300">Inicio</li>
          <li className="hover:text-bakery-accent hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] cursor-pointer transition-all duration-300">Creaciones</li>
          <li className="hover:text-bakery-accent hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] cursor-pointer transition-all duration-300">Nosotros</li>
        </ul>
        <button className="px-5 py-2 bg-transparent border border-bakery-accent text-bakery-accent hover:bg-bakery-accent hover:text-bakery-dark hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300 uppercase text-sm tracking-wider font-semibold">
          Hacer Pedido
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative w-full h-[80vh] flex items-center px-8 lg:px-24">
          {/* Fondo oscuro y gradiente simulando textura */}
          <div className="absolute inset-0 bg-gradient-to-r from-bakery-dark via-bakery-dark to-transparent z-0"></div>
          
          <div className="relative z-10 max-w-3xl space-y-8 animate-fade-in-up">
            <span className="text-bakery-accent uppercase tracking-[0.3em] text-sm font-semibold animate-pulse block">Pastelería Artesanal</span>
            <h1 className="text-5xl lg:text-7xl font-serif leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Diseños que cautivan, <br />
              <span className="text-bakery-accent italic drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">sabores que enamoran.</span>
            </h1>
            <p className="text-lg text-bakery-muted max-w-xl leading-relaxed">
              En FYL transformamos los mejores ingredientes y tu imaginación en piezas únicas de repostería. Elaborado desde cero, con una dedicación absoluta al detalle.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="px-8 py-3 bg-bakery-accent text-bakery-dark font-bold uppercase tracking-wider hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] hover:scale-105 animate-float transform">
                Ver Catálogo
              </button>
            </div>
          </div>
        </section>

        {/* Sección de Highlights Decorativa */}
        <section className="py-24 px-8 lg:px-24 bg-bakery-card border-t border-b border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4 group p-6 rounded-2xl hover:bg-white/5 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] cursor-default border border-transparent hover:border-bakery-accent/30">
              <div className="h-16 w-16 mx-auto rounded-full border border-bakery-accent flex items-center justify-center text-bakery-accent text-2xl font-serif group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] group-hover:bg-bakery-accent group-hover:text-bakery-dark">1</div>
              <h3 className="text-xl font-semibold group-hover:text-bakery-accent transition-colors duration-300">Ingredientes Premium</h3>
              <p className="text-bakery-muted text-sm">Chocolate belga, vainilla de Madagascar y frutos seleccionados.</p>
            </div>
            <div className="space-y-4 group p-6 rounded-2xl hover:bg-white/5 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] cursor-default border border-transparent hover:border-bakery-accent/30">
              <div className="h-16 w-16 mx-auto rounded-full border border-bakery-accent flex items-center justify-center text-bakery-accent text-2xl font-serif group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] group-hover:bg-bakery-accent group-hover:text-bakery-dark">2</div>
              <h3 className="text-xl font-semibold group-hover:text-bakery-accent transition-colors duration-300">Diseño Personalizado</h3>
              <p className="text-bakery-muted text-sm">Cada pastel es esculpido para que coincida exactamente con tu visión.</p>
            </div>
            <div className="space-y-4 group p-6 rounded-2xl hover:bg-white/5 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] cursor-default border border-transparent hover:border-bakery-accent/30">
              <div className="h-16 w-16 mx-auto rounded-full border border-bakery-accent flex items-center justify-center text-bakery-accent text-2xl font-serif group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] group-hover:bg-bakery-accent group-hover:text-bakery-dark">3</div>
              <h3 className="text-xl font-semibold group-hover:text-bakery-accent transition-colors duration-300">Frescura Absoluta</h3>
              <p className="text-bakery-muted text-sm">Horneados el mismo día del evento para garantizar textura y sabor ideal.</p>
            </div>
          </div>
        </section>

        {/* CTA Minimalista Final */}
        <section className="py-32 px-8 text-center space-y-8">
          <h2 className="text-4xl font-serif">¿Listo para endulzar tu evento?</h2>
          <p className="text-bakery-muted">Agenda una degustación o cuéntanos tu idea para empezar a bocetar.</p>
          <button className="px-10 py-4 bg-transparent border-2 border-bakery-accent text-bakery-accent hover:bg-bakery-accent hover:text-bakery-dark transition-all duration-500 uppercase tracking-[0.2em] font-bold hover:scale-110 hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:-translate-y-2">
            Contactar por WhatsApp
          </button>
        </section>
      </main>

      {/* Footer base */}
      <footer className="py-8 text-center text-sm text-bakery-muted border-t border-white/10 bg-bakery-card">
        <p>&copy; {new Date().getFullYear()} FYL Pastelería. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
