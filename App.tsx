
import React, { useState } from 'react';
import { CULTURES } from './constants';
import { Culture } from './types';
import CultureCard from './components/CultureCard';
import CultureDetail from './components/CultureDetail';

const App: React.FC = () => {
  const [selectedCultureId, setSelectedCultureId] = useState<string | null>(null);

  const selectedCulture = CULTURES.find(c => c.id === selectedCultureId);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-stone-900 text-white py-12 px-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Lengua y Cultura</h1>
          <p className="text-xl md:text-2xl text-stone-400 font-serif italic">Guardianes de la Montaña y el Mar en Guerrero</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {!selectedCultureId ? (
          <div className="animate-in fade-in duration-700">
            <section className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-stone-800">Un legado vivo en cuatro voces</h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                Guerrero es cuna de una diversidad lingüística y cultural inmensa. A pesar de los siglos, 
                estas cuatro raíces se mantienen firmes, protegiendo sus tierras, sus palabras y su alma. 
                Haz clic en una cultura para sumergirte en su mundo.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {CULTURES.map(culture => (
                <CultureCard 
                  key={culture.id} 
                  culture={culture} 
                  onClick={setSelectedCultureId} 
                />
              ))}
            </div>

            <section className="mt-24 p-8 bg-amber-50 rounded-3xl border border-amber-100 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">¿Sabías qué?</h3>
                <p className="text-amber-800 text-lg">
                  Guerrero es uno de los estados con mayor densidad de población indígena en México. 
                  Las lenguas Me'phaa, Na Savi, Náhuatl y Mñondaa no son solo dialectos, sino sistemas 
                  completos de pensamiento con miles de años de evolución.
                </p>
              </div>
              <div className="w-32 h-32 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </section>
          </div>
        ) : (
          selectedCulture && (
            <CultureDetail 
              culture={selectedCulture} 
              onBack={() => setSelectedCultureId(null)} 
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-stone-800">Lengua y Cultura</h4>
            <p className="text-stone-500">Preservando el mosaico cultural de Guerrero.</p>
          </div>
          <div className="flex gap-6 text-stone-400">
            <span className="text-sm">Me'phaa</span>
            <span className="text-sm">Na Savi</span>
            <span className="text-sm">Nahuatl</span>
            <span className="text-sm">Mñondaa</span>
          </div>
          <p className="text-stone-400 text-sm">© 2024 • Raíces de Guerrero</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
