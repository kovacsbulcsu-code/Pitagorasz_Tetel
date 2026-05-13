"use client";

import { useState } from "react";
import Link from "next/link";

export default function Ellenorzes() {
  const [sides, setSides] = useState({ a: "", b: "", c: "" });

  const getResult = () => {
    const a = parseFloat(sides.a);
    const b = parseFloat(sides.b);
    const c = parseFloat(sides.c);

    if (isNaN(a) || isNaN(b) || isNaN(c)) return { msg: "ADATOKRA VÁR...", color: "text-slate-600", type: 'empty' };
    if (a <= 0 || b <= 0 || c <= 0) return { msg: "HIBÁS ÉRTÉKEK", color: "text-red-500", type: 'error' };
    
    if (!(a + b > c && a + c > b && b + c > a)) {
      return { msg: "NEM HÁROMSZÖG", color: "text-red-500", type: 'error' };
    }

    const s = [a, b, c].sort((x, y) => x - y);
    const isRightAngled = Math.abs(s[0]**2 + s[1]**2 - s[2]**2) < 0.1;

    if (isRightAngled) {
      return { msg: "IGAZOLVA", color: "text-purple-400", type: 'success' };
    } else {
      return { msg: "CÁFOLVA", color: "text-red-400", type: 'fail' };
    }
  };

  const res = getResult();

  const renderTriangle = () => {
    if (res.type === 'empty' || res.type === 'error') return null;
    
    const sideA = parseFloat(sides.a);
    const sideB = parseFloat(sides.b);
    const sideC = parseFloat(sides.c);

    const cosC = (sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB);
    const sinC = Math.sqrt(Math.max(0, 1 - cosC * cosC));

    const scale = 220 / Math.max(sideA, sideB, sideC);
    
    const p1 = { x: 40, y: 260 }; 
    const p2 = { x: 40 + sideB * scale, y: 260 };
    const p3 = { x: 40 + sideA * cosC * scale, y: 260 - sideA * sinC * scale };

    return (
      <polygon 
        points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`} 
        className={`${res.type === 'success' ? 'fill-purple-500/10 stroke-purple-500' : 'fill-red-500/10 stroke-red-500'} stroke-[4] transition-all duration-500 ease-in-out`} 
      />
    );
  };

  return (
    <main className="min-h-screen bg-[#02040a] text-white flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="w-full max-w-5xl">
        {/* Vissza gomb pontosan ugyanott */}
        <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 w-fit uppercase tracking-[0.2em] text-[10px] font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Vissza
        </Link>

        {/* Két buborék egymás mellett */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          
          {/* Bal panel: Beviteli mezők */}
          <div className="bg-[#0b1120]/50 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-block border border-purple-500/50 px-3 py-1 rounded-md mb-8">
                 <span className="text-purple-500 font-black italic text-sm tracking-tighter uppercase">Validátor_v1.0</span>
              </div>

              <div className="space-y-6">
                {['a', 'b', 'c'].map((label) => (
                  <div key={label}>
                    <label className="block text-[10px] text-slate-500 font-bold mb-3 tracking-widest uppercase italic">"{label.toUpperCase()}" OLDAL HOSSZA</label>
                    <input 
                      type="number" 
                      value={sides[label as keyof typeof sides]}
                      onChange={(e) => setSides({...sides, [label]: e.target.value})}
                      className="w-full bg-[#030712] border border-slate-800 rounded-2xl p-5 text-2xl font-mono focus:border-purple-500/50 outline-none transition-all"
                      placeholder="0.00"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 border border-slate-800 bg-[#030712]/50 rounded-2xl p-5 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${res.type === 'empty' ? 'bg-slate-700' : 'bg-purple-500 animate-pulse'}`}></div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em]">RENDSZER ÁLLAPOT:</span>
               </div>
               <span className={`text-[10px] font-mono font-bold ${res.type === 'error' ? 'text-red-500' : 'text-purple-500'}`}>
                 {res.type === 'empty' ? 'IDLE' : 'VALIDATION_ACTIVE'}
               </span>
            </div>
          </div>

          {/* Jobb panel: Vizualizáció */}
          <div className="bg-[#0b1120]/50 border border-slate-800 rounded-[2.5rem] p-8 relative flex flex-col items-center justify-between min-h-[500px]">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Live Visualizer</span>
              </div>

              <div className="w-full aspect-square flex justify-center items-center bg-[#030712]/30 rounded-3xl border border-slate-800/50 overflow-hidden">
                <svg viewBox="0 0 350 300" className="w-full h-full p-4 drop-shadow-[0_0_30px_rgba(168,85,247,0.15)]">
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
                A rendszer a Pitagorasz-tétel megfordítását alkalmazza a validáláshoz.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}