"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Ellenorzes() {
  const [sides, setSides] = useState({ a: "", b: "", c: "" });
  const [result, setResult] = useState<{ status: boolean; msg: string } | null>(null);
  const [drawingSides, setDrawingSides] = useState({ a: 40, b: 80, c: 89 }); // Alaphelyzet a grafikának

  const checkTriangle = () => {
    const a = parseFloat(sides.a);
    const b = parseFloat(sides.b);
    const c = parseFloat(sides.c);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
      setResult({ status: false, msg: "Adj meg három érvényes pozitív számot!" });
      return;
    }

    // Háromszög-egyenlőtlenség csekk (lehet-e egyáltalán háromszög)
    const s = [a, b, c].sort((x, y) => x - y);
    if (s[0] + s[1] <= s[2]) {
      setResult({ status: false, msg: "HIBA: Ezekből az oldalakból nem szerkeszthető háromszög!" });
      return;
    }

    // Grafika frissítése (arányosítás a 100-as skálához)
    const max = Math.max(a, b, c);
    setDrawingSides({
      a: (a / max) * 80,
      b: (b / max) * 80,
      c: (c / max) * 80
    });

    const isRightAngled = Math.abs(s[0]**2 + s[1]**2 - s[2]**2) < 0.01;

    if (isRightAngled) {
      setResult({ status: true, msg: "IGAZOLVA: Ez egy derékszögű háromszög." });
    } else {
      setResult({ status: false, msg: "CÁFOLVA: Ez nem derékszögű háromszög." });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-6 selection:bg-purple-500/30">
      
      <Link href="/" className="self-start group flex items-center text-slate-500 hover:text-purple-400 transition-colors mb-8 text-sm font-bold uppercase tracking-tighter">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">← Biztonsági kilépés</span>
      </Link>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Adatbevitel */}
        <div className="space-y-6">
          <div className="p-2 inline-block bg-purple-500/10 border border-purple-500/20 rounded-lg">
             <h2 className="text-2xl font-black italic text-purple-500 tracking-tighter">VALIDÁTOR_V1.0</h2>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="grid gap-5 relative z-10">
              {['a', 'b', 'c'].map((label) => (
                <div key={label} className="group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors inline-block mb-1">"{label}" oldal hossza</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-950/50 border border-slate-800 p-4 rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all font-mono text-xl"
                    placeholder="0.00"
                    onChange={(e) => setSides({...sides, [label]: e.target.value})}
                    value={sides[label as keyof typeof sides]}
                  />
                </div>
              ))}

              <button 
                onClick={checkTriangle}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-500 py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-purple-900/40 transition-all active:scale-95"
              >
                Analízis indítása
              </button>
            </div>
          </div>
          
          {result && (
            <div className={`p-6 rounded-2xl border-2 animate-in slide-in-from-left duration-500 ${result.status ? 'bg-green-500/5 border-green-500/20 text-green-400' : 'bg-red-500/5 border-red-500/20 text-red-400'}`}>
              <div className="flex items-center gap-4">
                <span className="text-3xl">{result.status ? '✅' : '🚫'}</span>
                <p className="font-bold tracking-tight">{result.msg}</p>
              </div>
            </div>
          )}
        </div>

        {/* Grafikus Vizualizáció */}
        <div className="bg-slate-900/20 border border-slate-800 rounded-[3rem] p-10 flex flex-col items-center justify-center min-h-[500px] relative">
          <div className="absolute top-6 left-6 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></div>
             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Live Visualizer</span>
          </div>

          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Dinamikus SVG Háromszög */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              {/* Pontok kiszámítása a beírt adatok alapján (egyszerűsített vázlat) */}
              <path 
                d={`M 10 90 L 90 90 L 10 ${90 - drawingSides.a} Z`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className={`transition-all duration-700 ${result?.status ? 'text-green-500' : 'text-purple-500'}`}
              />
              {/* Derékszög jelölő négyzet - csak ha true az eredmény */}
              {result?.status && (
                <path d="M 10 80 L 20 80 L 20 90" fill="none" stroke="#22c55e" strokeWidth="1" />
              )}
            </svg>
            
            {/* Feliratok az ábrán */}
            <span className="absolute bottom-[-20px] font-mono text-xs text-slate-500">befogó (b)</span>
            <span className="absolute left-[-40px] rotate-[-90deg] font-mono text-xs text-slate-500">befogó (a)</span>
            <span className="absolute top-[20%] right-[-10px] rotate-[45deg] font-mono text-xs text-slate-500">átfogó (c)</span>
          </div>

          <div className="mt-12 w-full space-y-4">
             <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase italic">Logikai feltétel:</span>
                <span className={`font-mono text-sm ${result?.status ? 'text-green-400' : 'text-slate-400'}`}>a² + b² = c²</span>
             </div>
             <p className="text-[10px] text-slate-600 text-center italic">
                A rendszer a Pitagorasz-tétel megfordítását alkalmazza a validáláshoz.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}