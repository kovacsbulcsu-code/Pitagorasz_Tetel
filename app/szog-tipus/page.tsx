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

    const sideA = Number(a);
    const sideB = Number(b);
    const sideC = Number(c);

    // 1. OLDALAK SZERINTI MEGHATÁROZÁS
    let oldalTipus = "";
    if (sideA === sideB && sideB === sideC) {
      oldalTipus = "SZABÁLYOS";
    } else if (sideA === sideB || sideA === sideC || sideB === sideC) {
      oldalTipus = "EGYENLŐ SZÁRÚ";
    } else {
      oldalTipus = "ÁLTALÁNOS";
    }

    // 2. SZÖGEK SZERINTI MEGHATÁROZÁS (Pitagorasz-tétel megfordítása a legnagyobb oldallal)
    const sorted = [sideA, sideB, sideC].sort((x, y) => x - y);
    const [s1, s2, max] = sorted;
    const a2b2 = s1 * s1 + s2 * s2;
    const c2 = max * max;

    let szogTipus = "";
    if (Math.abs(a2b2 - c2) < 0.1) {
      szogTipus = "DERÉKSZÖGŰ";
    } else if (a2b2 > c2) {
      szogTipus = "HEGYESSZÖGŰ";
    } else {
      szogTipus = "TOMPASZÖGŰ";
    }

    // Összevont végeredmény (Pl: "SZABÁLYOS HEGYESSZÖGŰ" vagy "EGYENLŐ SZÁRÚ DERÉKSZÖGŰ")
    const vegsoUzenet = `${oldalTipus} ÉS ${szogTipus}`;

    return { msg: vegsoUzenet, color: "text-emerald-400", type: 'success' };
  };

  const res = getResult();

  const renderTriangleWithLabels = () => {
    if (res.type === 'empty' || res.type === 'error') return null;
    
    const sideA = Number(a);
    const sideB = Number(b);
    const sideC = Number(c);

    // Koszinusztétel a pontos SVG csúcspontok kirajzolásához
    const cosC = (sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB);
    const sinC = Math.sqrt(Math.max(0, 1 - cosC * cosC));

    const scale = 200 / Math.max(sideA, sideB, sideC);
    
    const p1 = { x: 50, y: 230 }; 
    const p2 = { x: 50 + sideB * scale, y: 230 }; 
    const p3 = { x: 50 + sideA * cosC * scale, y: 230 - sideA * sinC * scale }; 

    const midA = { x: (p1.x + p3.x) / 2, y: (p1.y + p3.y) / 2 }; 
    const midB = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }; 
    const midC = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 }; 

    return (
      <g>
        <polygon 
          points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`} 
          className="fill-emerald-500/10 stroke-emerald-500 stroke-[4] transition-all duration-500 ease-in-out drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
        />
        
        {/* Közvetlenül a beírt nyers értékek jelennek meg feliratként */}
        <text x={midA.x - 15} y={midA.y - 10} className="fill-slate-400 font-mono text-xs font-bold" textAnchor="end">
          a = {a}
        </text>
        
        <text x={midB.x} y={midB.y + 25} className="fill-slate-400 font-mono text-xs font-bold" textAnchor="middle">
          b = {b}
        </text>
        
        <text x={midC.x + 15} y={midC.y - 10} className="fill-emerald-400 font-mono text-xs font-black" textAnchor="start">
          c = {c}
        </text>
      </g>
    );
  };

  return (
    <main className="min-h-screen bg-[#02040a] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#0a2f1f_0%,#02040a_100%)] opacity-40"></div>
      <div className="absolute inset-0 z-0 bg-[#02040a]"></div>
      
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/5 blur-[150px] rounded-full z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full z-0"></div>

      <div className="w-full max-w-5xl relative z-10">
        <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-all mb-10 w-fit uppercase tracking-[0.2em] text-[10px] font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Vissza
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          
          {/* Beviteli Panel */}
          <div className="bg-[#0b1120]/70 border border-emerald-500/20 p-8 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/30 transition-colors">
            <div>
              <div className="inline-block border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 rounded-md mb-8">
                 <span className="text-emerald-400 font-black italic text-sm tracking-tighter uppercase">Geometria_Osztályozó_v1.5</span>
              </div>

              <div className="space-y-6">
                {[ {label: 'A OLDAL HOSSZA', val: a, set: setA},
                   {label: 'B OLDAL HOSSZA', val: b, set: setB},
                   {label: 'C OLDAL HOSSZA', val: c, set: setC} ].map((item, idx) => (
                  <div key={idx} className="group">
                    <label className="block text-[10px] text-slate-500 font-bold mb-3 tracking-widest uppercase italic group-focus-within:text-emerald-400 transition-colors">"{item.label}"</label>
                    <input 
                      type="number" 
                      step="any"
                      value={item.val}
                      onChange={(e) => item.set(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full bg-[#030712]/90 border border-slate-800 rounded-2xl p-5 text-2xl font-mono focus:border-emerald-500/50 focus:shadow-[0_0_25px_rgba(16,185,129,0.15)] outline-none transition-all placeholder:text-slate-900"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 border border-slate-800/60 bg-[#030712]/60 rounded-2xl p-5 flex items-center justify-between shadow-inner">
               <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${res.type === 'empty' ? 'bg-slate-800' : 'bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,1)]'}`}></div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em]">ANALÍZIS:</span>
               </div>
               <span className={`text-[10px] font-mono font-bold ${res.type === 'error' ? 'text-red-500' : 'text-emerald-400'}`}>
                 {res.type === 'empty' ? 'IDLE' : 'COMPUTING_COMPLETE'}
               </span>
            </div>
          </div>

          {/* Vizualizációs Panel */}
          <div className="bg-[#0b1120]/50 border border-emerald-500/10 rounded-[2.5rem] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md relative flex flex-col items-center justify-between min-h-[500px]">
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase italic">Geometric Preview</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-emerald-500/50"></div>
                  <div className="w-1 h-1 rounded-full bg-emerald-500/20"></div>
                </div>
              </div>

              <div className="w-full aspect-square flex justify-center items-center bg-[#030712]/50 rounded-3xl border border-slate-800/80 overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] relative">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
                
                <svg viewBox="0 0 350 300" className="w-full h-full p-6 relative z-10 select-none">
                  {renderTriangleWithLabels()}
                </svg>
              </div>
            </div>

            <div className="w-full space-y-4 mt-6">
              <div className="bg-[#030712]/80 border border-slate-800 p-6 rounded-2xl flex justify-between items-center shadow-lg border-b-emerald-500/30">
                 <span className="text-[11px] text-slate-500 font-bold italic uppercase tracking-widest">Típus:</span>
                 <span className={`font-mono text-sm md:text-base font-black ${res.color} tracking-tighter drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]`}>
                   {res.msg}
                 </span>
              </div>
              <p className="text-[9px] text-emerald-400 font-bold text-center uppercase tracking-[0.4em] opacity-30">
                Full Classification Engine active
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}