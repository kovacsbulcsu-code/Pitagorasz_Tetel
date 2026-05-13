"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Atfogo() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [eredmeny, setEredmeny] = useState<string | null>(null);

  const szamolas = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    // Eset 1: Átfogó számítása (c)
    if (!isNaN(numA) && !isNaN(numB) && isNaN(numC)) {
      const res = Math.sqrt(numA ** 2 + numB ** 2);
      setEredmeny(`Az átfogó (c) hossza: ${res.toFixed(2)}`);
    } 
    // Eset 2: Befogó számítása (a)
    else if (isNaN(numA) && !isNaN(numB) && !isNaN(numC)) {
      if (numC <= numB) {
        setEredmeny("Hiba: Az átfogónak nagyobbnak kell lennie!");
      } else {
        const res = Math.sqrt(numC ** 2 - numB ** 2);
        setEredmeny(`Az "a" befogó hossza: ${res.toFixed(2)}`);
      }
    }
    // Eset 3: Befogó számítása (b)
    else if (!isNaN(numA) && isNaN(numB) && !isNaN(numC)) {
      if (numC <= numA) {
        setEredmeny("Hiba: Az átfogónak nagyobbnak kell lennie!");
      } else {
        const res = Math.sqrt(numC ** 2 - numA ** 2);
        setEredmeny(`A "b" befogó hossza: ${res.toFixed(2)}`);
      }
    }
    else {
      setEredmeny("Kérlek, pontosan két mezőt tölts ki!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-8 selection:bg-blue-500/30">
      
      <Link href="/" className="self-start group flex items-center text-slate-500 hover:text-blue-400 transition-colors mb-12">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Vissza a központba
      </Link>

      <div className="w-full max-w-xl">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black italic tracking-tight text-blue-500 mb-2">SZÁMÍTÓ <span className="text-white">MODUL</span></h2>
          <p className="text-slate-500 font-mono text-sm uppercase tracking-[0.2em]">Pitagorasz-tétel kalkulátor</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full"></div>
          
          <div className="grid gap-6 relative z-10">
            {/* Input mezők */}
            {[ {id: 'a', val: a, set: setA}, {id: 'b', val: b, set: setB}, {id: 'c', val: c, set: setC} ].map((item) => (
              <div key={item.id} className="space-y-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-1">"{item.id}" oldal</label>
                <input 
                  type="number" 
                  placeholder="Érték megadása..." 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-900 text-lg font-mono"
                  value={item.val}
                  onChange={(e) => item.set(e.target.value)}
                />
              </div>
            ))}

            <button 
              onClick={szamolas}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] uppercase tracking-widest"
            >
              Művelet végrehajtása
            </button>
          </div>

          {/* Eredmény kártya */}
          {eredmeny && (
            <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-[10px] uppercase font-bold tracking-widest text-blue-400 mb-1 opacity-60">Kalkulált eredmény</p>
              <p className="text-2xl font-mono font-bold text-blue-100">{eredmeny}</p>
            </div>
          )}
        </div>

        {/* Útmutató */}
        <p className="mt-6 text-center text-slate-600 text-xs font-medium">
          Tölts ki <span className="text-slate-400">bármelyik két mezőt</span> a harmadik kiszámításához.
        </p>
      </div>
    </div>
  );
}