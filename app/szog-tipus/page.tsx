"use client";

import { useState } from "react";
import Link from "next/link";

export default function SzogTipus() {
  const [a, setA] = useState<number | "">("");
  const [b, setB] = useState<number | "">("");
  const [c, setC] = useState<number | "">("");

  const getResult = () => {
    if (a === "" || b === "" || c === "") return { msg: "ADATOKRA VÁR...", color: "text-slate-600", type: 'empty' };
    if (a <= 0 || b <= 0 || c <= 0) return { msg: "HIBÁS ÉRTÉKEK", color: "text-red-500", type: 'error' };
    if (!(a + b > c && a + c > b && b + c > a)) return { msg: "NEM HÁROMSZÖG", color: "text-red-500", type: 'error' };

    const sides = [Number(a), Number(b), Number(c)].sort((x, y) => x - y);
    const [s1, s2, max] = sides;
    const a2b2 = s1 * s1 + s2 * s2;
    const c2 = max * max;

    if (Math.abs(a2b2 - c2) < 0.1) return { msg: "DERÉKSZÖGÜ", color: "text-emerald-400", type: 'right' };
    if (a2b2 > c2) return { msg: "HEGYESSZÖGÜ", color: "text-emerald-400", type: 'acute' };
    return { msg: "TOMPASZÖGÜ", color: "text-emerald-400", type: 'obtuse' };
  };

  const res = getResult();

  const renderTriangle = () => {
    if (res.type === 'empty' || res.type === 'error') return null;
    
    const sideA = Number(a);
    const sideB = Number(b);
    const sideC = Number(c);

    const cosC = (sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB);
    const sinC = Math.sqrt(Math.max(0, 1 - cosC * cosC));

    // Nagyobb méretezés
    const width = 350;
    const height = 300;
    const scale = 220 / Math.max(sideA, sideB, sideC);
    
    const p1 = { x: 40, y: 260 }; 
    const p2 = { x: 40 + sideB * scale, y: 260 };
    const p3 = { x: 40 + sideA * cosC * scale, y: 260 - sideA * sinC * scale };

    return (
      <polygon 
        points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`} 
        className="fill-emerald-500/10 stroke-emerald-500 stroke-[4] transition-all duration-500 ease-in-out" 
      />
    );
  };

  return (
    <main className="min-h-screen bg-[#02040a] text-white flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="w-full max-w-5xl">
        {/* Egyszerű vissza gomb */}
        <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 w-fit uppercase tracking-[0.2em] text-[10px] font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Vissza
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          
          {/* Beviteli Panel */}
          <div className="bg-[#0b1120]/50 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-block border border-emerald-500/50 px-3 py-1 rounded-md mb-8">
                 <span className="text-emerald-500 font-black italic text-sm tracking-tighter uppercase">Validátor_v1.0</span>
              </div>

              <div className="space-y-6">
                {[ {label: 'A OLDAL HOSSZA', val: a, set: setA},
                   {label: 'B OLDAL HOSSZA', val: b, set: setB},
                   {label: 'C OLDAL HOSSZA', val: c, set: setC} ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block text-[10px] text-slate-500 font-bold mb-3 tracking-widest uppercase italic">"{item.label}"</label>
                    <input 
                      type="number" 
                      value={item.val}
                      onChange={(e) => item.set(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full bg-[#030712] border border-slate-800 rounded-2xl p-5 text-2xl font-mono focus:border-emerald-500/50 outline-none transition-all"
                      placeholder="0.00"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Gomb helyett egy állapotjelző doboz */}
            <div className="mt-10 border border-slate-800 bg-[#030712]/50 rounded-2xl p-5 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${res.type === 'empty' ? 'bg-slate-700' : 'bg-emerald-500 animate-pulse'}`}></div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em]">RENDSZER ÁLLAPOT:</span>
               </div>
               <span className={`text-[10px] font-mono font-bold ${res.type === 'error' ? 'text-red-500' : 'text-emerald-500'}`}>
                 {res.type === 'empty' ? 'IDLE' : 'ACTIVE_CALCULATION'}
               </span>
            </div>
          </div>

          {/* Vizualizációs Panel */}
          <div className="bg-[#0b1120]/50 border border-slate-800 rounded-[2.5rem] p-8 relative flex flex-col items-center justify-between min-h-[500px]">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Live Visualizer</span>
              </div>

              <div className="w-full aspect-square flex justify-center items-center bg-[#030712]/30 rounded-3xl border border-slate-800/50 overflow-hidden">
                <svg viewBox="0 0 350 300" className="w-full h-full p-4 drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  {renderTriangle()}
                </svg>
              </div>
            </div>

            <div className="w-full space-y-4 mt-6">
              <div className="bg-[#030712] border border-slate-800 p-6 rounded-2xl flex justify-between items-center shadow-inner">
                 <span className="text-[11px] text-slate-500 font-bold italic uppercase tracking-widest">Eredmény:</span>
                 <span className={`font-mono text-xl font-black ${res.color} tracking-tighter`}>{res.msg}</span>
              </div>
              <p className="text-[10px] text-slate-600 text-center italic tracking-wider px-4">
                A rendszer valós időben dolgozza fel a bemeneti adatokat.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}