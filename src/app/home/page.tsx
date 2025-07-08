import Link from 'next/link'




export default function Home1() {
  return (
    <div className="bg-gray-100">
      <header className="bg-primary-dark shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-white mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-white">Transportadoras</h1>
          </div>
          <nav className="space-x-4">
            <a
              href="#planos"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Planos
            </a>
            <a
              href="#contato"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contato
            </a>
            <Link
              href='/componetes/Tela_login'
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-4 py-2 rounded-md text-sm font-semibold transition duration-300"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-primary-dark text-white py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Otimize as Rotas da Sua Frota e Economize Combustível
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Nosso sistema calcula a rota mais eficiente baseada nos pontos de
            embarque e número de passageiros, minimizando a quilometragem e os
            custos.
          </p>
          <a
            href="#experimente"
            className="bg-primary-light hover-bg-primary-lighter text-white font-semibold py-3 px-8 rounded-lg text-lg inline-flex items-center transition duration-300"
          >
            Experimente já
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ...adicione outras seções aqui */}

      {/* Estilos personalizados adicionados diretamente */}
      <style jsx global>{`
        .bg-primary-dark {
          background-color: #1e3a8a;
        }
        .bg-primary-light {
          background-color: #2563eb;
        }
        .hover-bg-primary-lighter:hover {
          background-color: #1e40af;
        }
        .text-primary-accent {
          color: #facc15;
        }
      `}</style>
    </div>
  );
}
