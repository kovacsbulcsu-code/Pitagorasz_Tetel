import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Háttér fények */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Cím szekció */}
      <div className="text-center mb-12 space-y-6 relative">
        <div className="inline-block px-4 py-1.5 mb-4 border border-slate-800 rounded-full bg-slate-900/50 backdrop-blur-md">
          <span className="text-[10px] font-mono tracking-[0.4em] text-blue-400 uppercase font-bold">Iskolai Projekt v1.1</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
          <span className="bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">PITAGORASZ</span>
          <span className="text-blue-500 block sm:inline ml-2">.APP</span>
        </h1>
        <p className="max-w-md mx-auto text-slate-500 font-medium text-lg italic">
          "Interaktív matematikai segédlet a derékszögű háromszögek világához."
        </p>
      </div>

      {/* Csapat szekció */}
      <div className="flex flex-wrap justify-center gap-8 mb-16 scale-90">
        <div className="group relative w-64">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-[#0f172a] border border-slate-800/50 p-6 rounded-[2rem] flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl rotate-3 overflow-hidden border-2 border-blue-500/30 mb-4">
              <img src="/dominik.jpg" alt="Dominik" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Horváth Dominik</h3>
            <p className="text-blue-400 text-[9px] font-mono uppercase tracking-widest font-bold">Fejlesztés & UI Design</p>
          </div>
        </div>

        <div className="group relative w-64">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 to-pink-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-[#0f172a] border border-slate-800/50 p-6 rounded-[2rem] flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl -rotate-3 overflow-hidden border-2 border-purple-500/30 mb-4">
              <img src="/bulcsu.jpg" alt="Bulcsú" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Kovács Bulcsú</h3>
            <p className="text-purple-400 text-[9px] font-mono uppercase tracking-widest font-bold">Matematikai Logika</p>
          </div>
        </div>
      </div>

      {/* Navigáció - Most már 3 kártyával */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        
        {/* 1. SZÁMÍTÁS */}
        <Link href="/atfogo" className="group relative bg-[#0f172a] border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition-all hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h2 className="text-xl font-bold italic">SZÁMÍTÁS</h2>
          </div>
          <p className="text-slate-400 text-xs">Oldalhosszak kiszámítása a tétellel.</p>
          <div className="mt-4 text-blue-500 text-[10px] font-black tracking-widest uppercase">Indítás →</div>
        </Link>

        {/* 2. ELLENŐRZÉS */}
        <Link href="/ellenorzes" className="group relative bg-[#0f172a] border border-slate-800 p-8 rounded-3xl hover:border-purple-500/50 transition-all hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-xl font-bold italic">VALIDÁTOR</h2>
          </div>
          <p className="text-slate-400 text-xs">Derékszögű-e a háromszög?</p>
          <div className="mt-4 text-purple-500 text-[10px] font-black tracking-widest uppercase">Indítás →</div>
        </Link>

        {/* 3. ÚJ: SZÖG-TÍPUS (Zöld színnel) */}
        <Link href="/szog-tipus" className="group relative bg-[#0f172a] border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/50 transition-all hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            </div>
            <h2 className="text-xl font-bold italic">SZÖG-TÍPUS</h2>
          </div>
          <p className="text-slate-400 text-xs">Hegyestojás, tompa vagy derékszög?</p>
          <div className="mt-4 text-emerald-500 text-[10px] font-black tracking-widest uppercase">Indítás →</div>
        </Link>

      </div>

      <footer className="mt-16 text-slate-800 font-mono text-[9px] tracking-widest italic">
        © 2026 HORVÁTH DOMINIK & KOVÁCS BULCSÚ - 9.A
      </footer>
    </main>
  );
}