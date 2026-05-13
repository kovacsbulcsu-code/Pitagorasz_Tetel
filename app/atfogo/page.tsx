"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Atfogo() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [eredmeny, setEredmeny] = useState<string | null>(null);
  const [activeSides, setActiveSides] = useState({ a: false, b: false, c: false });

  // Figyeljük, melyik mező van kitöltve a grafika színezéséhez
  useEffect(() => {
    setActiveSides({
      a: a !== "" && !isNaN(parseFloat(a)),
      b: b !== "" && !isNaN(parseFloat(b)),
      c: c !== "" && !isNaN(parseFloat(c)),
    });
  }, [a, b, c]);

  const szamolas = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (!isNaN(numA) && !isNaN(numB) && isNaN(numC)) {
      const res = Math.sqrt(numA ** 2 + numB ** 2);
      setEredmeny(`Az átfogó (c) hossza: ${res.toFixed(2)}`);
    } 
    else if (isNaN(numA) && !isNaN(numB) && !isNaN(numC)) {
      if (numC <= numB) setEredmeny("Hiba: c > b kell legyen!");
      else setEredmeny(`Az "a" befogó: ${Math.sqrt(numC**2 - numB**2).toFixed(2)}`);
    }
    else if (!isNaN(numA) && isNaN(numB) && !isNaN(numC)) {
      if (numC <= numA) setEredmeny("Hiba: c > a kell legyen!");
      else setEredmeny(`A "b" befogó: ${Math.sqrt(numC**2 - numA**2).toFixed(2)}`);
    }
    else {
      setEredmeny("Kérlek, pontosan két mezőt tölts ki!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-6 selection:bg-blue-500/30">
      
      <Link href="/" className="self-start group flex items-center text-slate-500 hover:text-blue-400 transition-colors mb-8">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Főoldal
      </Link>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Bal oldal: Kalkulátor forma */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-black italic text-blue-500 uppercase tracking-tighter">Geometriai <span className="text-white">Motor</span></h2>
            <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">Input v1.0 // Pythagorean Theorem</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl space-y-6">
            {[ {id: 'a', val: a, set: setA, label: 'a befogó'}, {id: 'b', val: b, set: setB, label: 'b befogó'}, {id: 'c', val: c, set: setC, label: 'c átfogó'} ].map((item) => (
              <div key={item.id} className="relative">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest absolute -top-2 left-4 bg-slate-950 px-2 z-10">{item.label}</label>
                <input 
                  type="number" 
                  className={`w-full bg-transparent border ${activeSides[item.id as keyof typeof activeSides] ? 'border-blue-500' : 'border-slate-800'} p-4 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none transition-all font-mono text-xl`}
                  value={item.val}
                  onChange={(e) => item.set(e.target.value)}
                  placeholder="?"
                />
              </div>
            ))}

            <button onClick={szamolas} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-900/20">
              Kalkuláció indítása
            </button>

            {eredmeny && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl animate-pulse">
                <p className="text-blue-400 font-mono font-bold text-center">{eredmeny}</p>
              </div>
            )}
          </div>
        </div>

        {/* Jobb oldal: Dinamikus Grafika */}
        <div className="flex flex-col items-center justify-center p-8 bg-slate-900/20 border border-slate-800/50 rounded-[3rem] min-h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
          
          <svg width="300" height="300" viewBox="0 0 120 120" className="relative z-10 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            {/* Háromszög kitöltése */}
            <path 
              d="M 20 100 L 100 100 L 20 20 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              className="text-slate-800"
            />
            
            {/* Oldalak - Színeződnek ha van érték */}
            <line x1="20" y1="100" x2="20" y2="20" strokeWidth="3" className={`transition-all duration-500 ${activeSides.a ? 'stroke-blue-500' : 'stroke-slate-700'}`} />
            <line x1="20" y1="100" x2="100" y2="100" strokeWidth="3" className={`transition-all duration-500 ${activeSides.b ? 'stroke-blue-500' : 'stroke-slate-700'}`} />
            <line x1="100" y1="100" x2="20" y2="20" strokeWidth="3" className={`transition-all duration-500 ${activeSides.c ? 'stroke-blue-400' : 'stroke-slate-700'}`} />

            {/* Címkék */}
            <text x="10" y="60" className={`text-[8px] font-bold fill-current transition-colors ${activeSides.a ? 'fill-blue-400' : 'fill-slate-600'}`}>a</text>
            <text x="60" y="110" className={`text-[8px] font-bold fill-current transition-colors ${activeSides.b ? 'fill-blue-400' : 'fill-slate-600'}`}>b</text>
            <text x="65" y="55" className={`text-[8px] font-bold fill-current transition-colors ${activeSides.c ? 'fill-blue-300' : 'fill-slate-600'}`} transform="rotate(-45 65 55)">c</text>

            {/* Derékszög jelölő */}
            <path d="M 20 90 L 30 90 L 30 100" fill="none" stroke="#334155" strokeWidth="1" />
          </svg>

          <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-[280px]">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center">
              <span className="block text-[8px] uppercase text-slate-500 tracking-widest">Formula</span>
              <span className="font-mono text-xs text-blue-400">a² + b² = c²</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center">
              <span className="block text-[8px] uppercase text-slate-500 tracking-widest">Status</span>
              <span className="font-mono text-xs text-green-500">Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}