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
        className={`${res.type === 'success' ? 'fill-purple-500/10 stroke-purple-500' : 'fill-red-500/10 stroke-red-500'} stroke-[4] transition-all duration-500 ease-in-out drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]`} 
      />
    );
  };

  return (
    <main className="min-h-screen bg-[#02040a] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Dinamikus Lila-Fekete Háttér */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#0f0a1a_0%,#02040a_100%)]"></div>
      
      {/* Lila fényfoltok */}
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full z-0"></div>

      <div className="w-full max-w-5xl relative z-10">
        <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-purple-400 transition-all mb-10 w-fit uppercase tracking-[0.2em] text-[10px] font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Vissza
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          
          {/* Beviteli Panel - Lila glow kerettel */}
          <div className="bg-[#0b1120]/70 border border-purple-500/20 p-8 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),0_0_15px_rgba(168,85,247,0.05)] backdrop-blur-md flex flex-col justify-between hover:border-purple-500/30 transition-colors">
            <div>
              <div className="inline-block border border-purple-500/40 bg-purple-500/10 px-3 py-1 rounded-md mb-8 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                 <span className="text-purple-400 font-black italic text-sm tracking-tighter uppercase">Validátor_v1.0</span>
              </div>

              <div className="space-y-6">
                {['a', 'b', 'c'].map((label) => (
                  <div key={label} className="group">
                    <label className="block text-[10px] text-slate-500 font-bold mb-3 tracking-widest uppercase italic group-focus-within:text-purple-400 transition-colors">"{label.toUpperCase()}" OLDAL HOSSZA</label>
                    <input 
                      type="number" 
                      value={sides[label as keyof typeof sides]}
                      onChange={(e) => setSides({...sides, [label]: e.target.value})}
                      className="w-full bg-[#030712]/90 border border-slate-800 rounded-2xl p-5 text-2xl font-mono focus:border-purple-500/50 focus:shadow-[0_0_25px_rgba(168,85,247,0.15)] outline-none transition-all placeholder:text-slate-900"
                      placeholder="0.00"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 border border-slate-800/60 bg-[#030712]/60 rounded-2xl p-5 flex items-center justify-between shadow-inner">
               <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${res.type === 'empty' ? 'bg-slate-800' : 'bg-purple-500 animate-pulse shadow-[0_0_12px_rgba(168,85,247,1)]'}`}></div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em]">RENDSZER ÁLLAPOT:</span>
               </div>
               <span className={`text-[10px] font-mono font-bold ${res.type === 'error' ? 'text-red-500' : 'text-purple-400'}`}>
                 {res.type === 'empty' ? 'IDLE' : 'VALIDATION_ACTIVE'}
               </span>
            </div>
          </div>

          {/* Vizualizációs Panel */}
          <div className="bg-[#0b1120]/50 border border-purple-500/10 rounded-[2.5rem] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md relative flex flex-col items-center justify-between min-h-[500px]">
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase italic">Live Visualizer</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-purple-500/50"></div>
                  <div className="w-1 h-1 rounded-full bg-purple-500/20"></div>
                </div>
              </div>

              <div className="w-full aspect-square flex justify-center items-center bg-[#030712]/50 rounded-3xl border border-slate-800/80 overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] relative">
                {/* Rácsháló dekoráció */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{backgroundImage: 'linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
                
                <svg viewBox="0 0 350 300" className="w-full h-full p-6 relative z-10">
                  {renderTriangle()}
                </svg>
              </div>
            </div>

            <div className="w-full space-y-4 mt-6">
              <div className="bg-[#030712]/80 border border-slate-800 p-6 rounded-2xl flex justify-between items-center shadow-lg border-b-purple-500/30">
                 <span className="text-[11px] text-slate-500 font-bold italic uppercase tracking-widest">Eredmény:</span>
                 <span className={`font-mono text-xl font-black ${res.color} tracking-tighter drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]`}>
                   {res.msg}
                 </span>
              </div>
              <p className="text-[9px] text-purple-400 font-bold text-center uppercase tracking-[0.4em] opacity-30">
                Validation Processor Active
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}