import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 selection:bg-purple-500/30">
      
      {/* Cím és Mottó */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-br from-white via-slate-400 to-slate-600 bg-clip-text text-transparent italic">
          PITAGORASZ <span className="text-purple-500 italic">.SYS</span>
        </h1>
        <p className="text-slate-500 font-mono tracking-[0.3em] uppercase text-xs">
          Engineered by Horváth & Kovács
        </p>
      </div>

      {/* "Bubi" kártyák rólatok */}
      <div className="flex flex-wrap justify-center gap-12 mb-20">
        {/* Horváth Dominik */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex flex-col items-center">
            <div className="w-40 h-40 rounded-full border-2 border-slate-800 p-2 bg-slate-900 overflow-hidden shadow-2xl">
              <img 
                src="/dominik.jpg" 
                alt="Horváth Dominik" 
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-blue-400">Horváth Dominik</h3>
              <p className="text-slate-500 text-sm font-medium">Lead Developer</p>
            </div>
          </div>
        </div>

        {/* Kovács Bulcsú */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex flex-col items-center">
            <div className="w-40 h-40 rounded-full border-2 border-slate-800 p-2 bg-slate-900 overflow-hidden shadow-2xl">
              <img 
                src="/bulcsu.jpg" 
                alt="Kovács Bulcsú" 
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-purple-400">Kovács Bulcsú</h3>
              <p className="text-slate-500 text-sm font-medium">Math & Logic Expert</p>
            </div>
          </div>
        </div>
      </div>

      {/* Funkció választó gombok (Buborékok) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        
        <Link href="/atfogo" className="group relative block">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur transition group-hover:opacity-100"></div>
          <div className="relative h-full bg-slate-900/50 border border-slate-800 p-10 rounded-3xl hover:bg-slate-900/80 transition-all hover:-translate-y-2">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-600 tracking-widest uppercase">Tool 01</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Számítás</h2>
            <p className="text-slate-400">Kalkuláld ki az átfogót vagy a befogót azonnal.</p>
            <div className="mt-6 flex items-center text-blue-400 font-bold group-hover:translate-x-2 transition-transform">
              Indítás <span className="ml-2">→</span>
            </div>
          </div>
        </Link>

        <Link href="/ellenorzes" className="group relative block">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur transition group-hover:opacity-100"></div>
          <div className="relative h-full bg-slate-900/50 border border-slate-800 p-10 rounded-3xl hover:bg-slate-900/80 transition-all hover:-translate-y-2">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-600 tracking-widest uppercase">Tool 02</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Ellenőrzés</h2>
            <p className="text-slate-400">Derítsd ki, hogy a háromszöged valóban derékszögű-e.</p>
            <div className="mt-6 flex items-center text-purple-400 font-bold group-hover:translate-x-2 transition-transform">
              Indítás <span className="ml-2">→</span>
            </div>
          </div>
        </Link>

      </div>

      {/* Footer dísz elem */}
      <div className="mt-20 opacity-20 hover:opacity-50 transition-opacity">
        <p className="font-mono text-[10px]">VER: 2.0.26 // CALC_STABLE</p>
      </div>
    </main>
  );
}