"use client";

import { useState } from "react";
import Link from "next/link";

export default function Atfogo() {
  const [sides, setSides] = useState({ a: "", b: "", c: "" });

  const formatNumber = (num: number) => {
    return Number(num.toFixed(2)).toString();
  };

  const calculateResult = () => {
    const numA = parseFloat(sides.a);
    const numB = parseFloat(sides.b);
    const numC = parseFloat(sides.c);

    if (!isNaN(numA) && !isNaN(numB) && isNaN(numC)) {
      const res = Math.sqrt(numA ** 2 + numB ** 2);
      return { msg: `c = ${formatNumber(res)}`, color: "text-blue-400", type: 'calc', missing: 'c', a: numA, b: numB, c: res };
    } 
    else if (isNaN(numA) && !isNaN(numB) && !isNaN(numC)) {
      if (numC <= numB) return { msg: "c > b KELL!", color: "text-red-500", type: 'error', missing: null, a: null, b: null, c: null };
      const res = Math.sqrt(numC**2 - numB**2);
      return { msg: `a = ${formatNumber(res)}`, color: "text-blue-400", type: 'calc', missing: 'a', a: res, b: numB, c: numC };
    }
    else if (!isNaN(numA) && isNaN(numB) && !isNaN(numC)) {
      if (numC <= numA) return { msg: "c > a KELL!", color: "text-red-500", type: 'error', missing: null, a: null, b: null, c: null };
      const res = Math.sqrt(numC**2 - numA**2);
      return { msg: `b = ${formatNumber(res)}`, color: "text-blue-400", type: 'calc', missing: 'b', a: numA, b: res, c: numC };
    }
    
    const count = [numA, numB, numC].filter(n => !isNaN(n)).length;
    if (count === 3) return { msg: "TÚL SOK ADAT", color: "text-red-500", type: 'error', missing: null, a: null, b: null, c: null };
    return { msg: "2 ADATOT ADJ MEG", color: "text-slate-500", type: 'empty', missing: null, a: null, b: null, c: null };
  };

  const res = calculateResult();

  const labelA = res.a !== null ? `a = ${res.a}` : (sides.a ? `a = ${sides.a}` : "a");
  const labelB = res.b !== null ? `b = ${res.b}` : (sides.b ? `b = ${sides.b}` : "b");
  const labelC = res.c !== null ? `c = ${res.c}` : (sides.c ? `c = ${sides.c}` : "c");

  // Garantáltan tiszta kék (blue-400) stílusok a hiányzó oldalra, halvány szürke a többire
  const classA = res.missing === 'a' ? "fill-blue-400 font-mono text-sm font-bold" : "fill-slate-500 font-mono text-xs font-medium";
  const classB = res.missing === 'b' ? "fill-blue-400 font-mono text-sm font-bold" : "fill-slate-500 font-mono text-xs font-medium";
  const classC = res.missing === 'c' ? "fill-blue-400 font-mono text-sm font-bold" : "fill-slate-500 font-mono text-xs font-medium";

  return (
    <main className="min-h-screen bg-[#02040a] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#0a192f_0%,#02040a_100%)]"></div>
      
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full z-0"></div>

      <div className="w-full max-w-5xl relative z-10">
        <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-all mb-10 w-fit uppercase tracking-[0.2em] text-[10px] font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Vissza
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          
          {/* Beviteli Panel */}
          <div className="bg-[#0b1120]/70 border border-blue-500/20 p-8 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),0_0_15px_rgba(59,130,246,0.1)] backdrop-blur-md flex flex-col justify-between hover:border-blue-500/30 transition-colors">
            <div>
              <div className="inline-block border border-blue-500/40 bg-blue-500/10 px-3 py-1 rounded-md mb-8 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                 <span className="text-blue-400 font-black italic text-sm tracking-tighter uppercase">Geometric_Engine_v1.2</span>
              </div>

              <div className="space-y-6">
                {[ {id: 'a', label: 'A BEFOGÓ'}, {id: 'b', label: 'B BEFOGÓ'}, {id: 'c', label: 'C ÁTFOGÓ'} ].map((item) => (
                  <div key={item.id} className="group">
                    <label className="block text-[10px] text-slate-500 font-bold mb-3 tracking-widest uppercase italic group-focus-within:text-blue-400 transition-colors">"{item.label}"</label>
                    <input 
                      type="number" 
                      step="any"
                      value={sides[item.id as keyof typeof sides]}
                      onChange={(e) => setSides({...sides, [item.id]: e.target.value})}
                      className="w-full bg-[#030712]/90 border border-slate-800 rounded-2xl p-5 text-2xl font-mono focus:border-blue-500/50 focus:shadow-[0_0_25px_rgba(59,130,246,0.15)] outline-none transition-all placeholder:text-slate-900"
                      placeholder="?"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 border border-slate-800/60 bg-[#030712]/60 rounded-2xl p-5 flex items-center justify-between shadow-inner">
               <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${res.type === 'empty' ? 'bg-slate-800' : 'bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,1)]'}`}></div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em]">ENGINE STATUS:</span>
               </div>
               <span className={`text-[10px] font-mono font-bold ${res.type === 'error' ? 'text-red-500' : 'text-blue-400'}`}>
                 {res.type === 'empty' ? 'IDLE' : 'COMPUTING'}
               </span>
            </div>
          </div>

          {/* Vizualizációs Panel */}
          <div className="bg-[#0b1120]/50 border border-blue-500/10 rounded-[2.5rem] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md relative flex flex-col items-center justify-between min-h-[500px]">
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase italic">Live Visualizer</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-500/50"></div>
                  <div className="w-1 h-1 rounded-full bg-blue-500/20"></div>
                </div>
              </div>

              <div className="w-full aspect-square flex justify-center items-center bg-[#030712]/50 rounded-3xl border border-slate-800/80 overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] relative">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
                
                <svg viewBox="0 0 350 300" className="w-full h-full p-6 relative z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.2)] select-none">
                  <polygon 
                    points="75,230 285,230 75,60" 
                    className="fill-blue-500/5 stroke-blue-500/80 stroke-[4] transition-all duration-700 ease-in-out" 
                  />
                  <path d="M 75 210 L 95 210 L 95 230" fill="none" stroke="#1e293b" strokeWidth="2" />

                  {/* 'a' oldal */}
                  <text x="25" y="150" className={classA} textAnchor="start">
                    {labelA}
                  </text>
                  
                  {/* 'b' oldal */}
                  <text x="180" y="260" className={classB} textAnchor="middle">
                    {labelB}
                  </text>
                  
                  {/* 'c' oldal */}
                  <text x="195" y="135" className={classC} textAnchor="start">
                    {labelC}
                  </text>
                </svg>
              </div>
            </div>

            <div className="w-full space-y-4 mt-6">
              <div className="bg-[#030712]/80 border border-slate-800 p-6 rounded-2xl flex justify-between items-center shadow-lg border-b-blue-500/30">
                 <span className="text-[11px] text-slate-500 font-bold italic uppercase tracking-widest">Eredmény:</span>
                 <span className={`font-mono text-xl font-black ${res.color} tracking-tighter drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]`}>
                   {res.msg}
                 </span>
              </div>
              <p className="text-[9px] text-blue-400 font-bold text-center uppercase tracking-[0.4em] opacity-30">
                Pythagorean Processor Active
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}