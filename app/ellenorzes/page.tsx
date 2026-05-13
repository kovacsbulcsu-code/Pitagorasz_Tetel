"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Ellenorzes() {
  const [sides, setSides] = useState({ a: "", b: "", c: "" });
  const [result, setResult] = useState<{ status: boolean; msg: string } | null>(null);

  const checkTriangle = () => {
    const a = parseFloat(sides.a);
    const b = parseFloat(sides.b);
    const c = parseFloat(sides.c);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
      setResult({ status: false, msg: "Adj meg három érvényes pozitív számot!" });
      return;
    }

    // Sorba rendezzük az oldalakat (a leghosszabb lesz a 'c')
    const s = [a, b, c].sort((x, y) => x - y);
    
    // Pitagorasz-tétel megfordítása: a² + b² = c²
    // Kis hibahatár (0.0001) a tizedesjegyek miatt
    const isRightAngled = Math.abs(s[0]**2 + s[1]**2 - s[2]**2) < 0.0001;

    if (isRightAngled) {
      setResult({ status: true, msg: "IGAZOLVA: Ez egy derékszögű háromszög." });
    } else {
      setResult({ status: false, msg: "CÁFOLVA: Ez nem derékszögű háromszög." });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-8 selection:bg-purple-500/30">
      
      {/* Vissza gomb */}
      <Link href="/" className="self-start group flex items-center text-slate-500 hover:text-purple-400 transition-colors mb-12">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Vissza a főoldalra
      </Link>

      <div className="w-full max-w-xl">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black italic tracking-tight text-purple-500 mb-2 underline decoration-purple-800 underline-offset-8">VALIDÁTOR <span className="text-white">MODUL</span></h2>
          <p className="text-slate-500 font-mono text-sm uppercase">Háromszög-geometria ellenőrzése</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Neon effekt a háttérben */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[80px] rounded-full"></div>
          
          <div className="grid gap-6 relative z-10">
            {['a', 'b', 'c'].map((label) => (
              <div key={label} className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest ml-1">"{label}" oldal hossza</label>
                <input 
                  type="number" 
                  placeholder="Mért érték..." 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-slate-800 text-lg font-mono"
                  onChange={(e) => setSides({...sides, [label]: e.target.value})}
                  value={sides[label as keyof typeof sides]}
                />
              </div>
            ))}

            <button 
              onClick={checkTriangle}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-5 rounded-2xl shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98] uppercase tracking-widest"
            >
              Logikai futtatás
            </button>
          </div>

          {/* Eredmény kijelző panel */}
          {result && (
            <div className={`mt-8 p-6 rounded-2xl border transition-all animate-in fade-in zoom-in duration-300 ${
              result.status 
              ? 'bg-green-500/10 border-green-500/40 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
              : 'bg-red-500/10 border-red-500/40 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${result.status ? 'border-green-500' : 'border-red-500'}`}>
                  <span className="text-xl font-bold">{result.status ? '✓' : '✕'}</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Rendszerüzenet</p>
                  <p className="font-bold text-lg leading-tight">{result.msg}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-slate-900/10 border border-slate-900 rounded-2xl italic text-slate-600 text-sm text-center">
          "Ha a háromszög két oldalának négyzetösszege egyenlő a harmadik oldal négyzetével, akkor a háromszög derékszögű."
        </div>
      </div>
    </div>
  );
}