"use client";

import { useState } from "react";
import Link from "next/link";

export default function Atfogo() {
  const [sides, setSides] = useState({ a: "", b: "", c: "" });

  const calculateResult = () => {
    const numA = parseFloat(sides.a);
    const numB = parseFloat(sides.b);
    const numC = parseFloat(sides.c);

    // Számítási logika
    if (!isNaN(numA) && !isNaN(numB) && isNaN(numC)) {
      const res = Math.sqrt(numA ** 2 + numB ** 2);
      return { msg: `c = ${res.toFixed(2)}`, color: "text-blue-400", type: 'calc' };
    } 
    else if (isNaN(numA) && !isNaN(numB) && !isNaN(numC)) {
      if (numC <= numB) return { msg: "c > b KELL!", color: "text-red-500", type: 'error' };
      return { msg: `a = ${Math.sqrt(numC**2 - numB**2).toFixed(2)}`, color: "text-blue-400", type: 'calc' };
    }
    else if (!isNaN(numA) && isNaN(numB) && !isNaN(numC)) {
      if (numC <= numA) return { msg: "c > a KELL!", color: "text-red-500", type: 'error' };
      return { msg: `b = ${Math.sqrt(numC**2 - numA**2).toFixed(2)}`, color: "text-blue-400", type: 'calc' };
    }
    
    const count = [numA, numB, numC].filter(n => !isNaN(n)).length;
    if (count === 3) return { msg: "TÚL SOK ADAT", color: "text-red-500", type: 'error' };
    return { msg: "2 ADATOT ADJ MEG", color: "text-slate-600", type: 'empty' };
  };

  const res = calculateResult();

  const renderTriangle = () => {
    // Alap háromszög rajzolása a vizualizációhoz
    return (
      <polygon 
        points="50,250 300,250 50,50" 
        className="fill-blue-500/10 stroke-blue-500 stroke-[4] transition-all duration-500 ease-in-out" 
      />
    );
  };

  return (
    <main className="min-h-screen bg-[#02040a] text-white flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="w-full max-w-5xl">
        {/* Vissza gomb - Kék hover effektel */}
        <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors mb-10 w-fit uppercase tracking-[0.2em] text-[10px] font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Vissza
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          
          {/* Beviteli Panel (Kék) */}
          <div className="bg-[#0b1120]/50 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-block border border-blue-500/50 px-3 py-1 rounded-md mb-8">
                 <span className="text-blue-500 font-black italic text-sm tracking-tighter uppercase">Geometriai_Motor_v1.0</span>
              </div>

              <div className="space-y-6">
                {[ {id: 'a', label: 'A BEFOGÓ'}, {id: 'b', label: 'B BEFOGÓ'}, {id: 'c', label: 'C ÁTFOGÓ'} ].map((item) => (
                  <div key={item.id}>
                    <label className="block text-[10px] text-slate-500 font-bold mb-3 tracking-widest uppercase italic">"{item.label}"</label>
                    <input 
                      type="number" 
                      value={sides[item.id as keyof typeof sides]}
                      onChange={(e) => setSides({...sides, [item.id]: e.target.value})}
                      className="w-full bg-[#030712] border border-slate-800 rounded-2xl p-5 text-2xl font-mono focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-800"
                      placeholder="?"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Kék Állapotjelző */}
            <div className="mt-10 border border-slate-800 bg-[#030712]/50 rounded-2xl p-5 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${res.type === 'empty' ? 'bg-slate-700' : 'bg-blue-500 animate-pulse'}`}></div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em]">MOTOR ÁLLAPOT:</span>
               </div>
               <span className={`text-[10px] font-mono font-bold ${res.type === 'error' ? 'text-red-500' : 'text-blue-500'}`}>
                 {res.type === 'empty' ? 'WAITING_INPUT' : 'CALCULATION_SUCCESS'}
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
                <svg viewBox="0 0 350 300" className="w-full h-full p-4 drop-shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  {renderTriangle()}
                  {/* Derékszög jelző */}
                  <path d="M 50 230 L 70 230 L 70 250" fill="none" stroke="#1e293b" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className="w-full space-y-4 mt-6">
              <div className="bg-[#030712] border border-slate-800 p-6 rounded-2xl flex justify-between items-center shadow-inner">
                 <span className="text-[11px] text-slate-500 font-bold italic uppercase tracking-widest">Eredmény:</span>
                 <span className={`font-mono text-xl font-black ${res.color} tracking-tighter`}>{res.msg}</span>
              </div>
              <div className="bg-[#030712]/50 border border-slate-800/50 p-3 rounded-xl">
                <p className="text-[10px] text-slate-600 text-center italic tracking-wider">
                  Képlet: a² + b² = c²
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}