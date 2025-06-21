'use client';
import { Play, CirclePlus } from "lucide-react";
import { useState , useEffect, use } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

type Dot = {
  id: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
};

const OnlinePlay = () => {
    const [dots, setDots] = useState<Dot[]>([]);

    useEffect(() => {
    const generatedDots: Dot[] = [...Array(20)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
    }));
    setDots(generatedDots);
    }, []); 
    

    const startgame = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await axios.get('http://localhost:3000/api');
        redirect(`/online/play/${response.data.code}`);
    }

    return (
        <div className="relative min-h-screen bg-slate-900 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-20 left-10 text-6xl text-yellow-400/10 animate-pulse">♜</div>
            <div className="absolute top-40 right-20 text-8xl text-yellow-400/5 animate-bounce">♞</div>
            <div className="absolute bottom-40 left-20 text-7xl text-yellow-400/10 animate-pulse" style={{ animationDelay: '1s' }}>♝</div>
            <div className="absolute bottom-20 right-10 text-9xl text-yellow-400/5 animate-bounce" style={{ animationDelay: '2s' }}>♛</div>

            {dots.map(dot => (
            <div
                key={dot.id}
                className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse"
                style={{
                left: dot.left,
                top: dot.top,
                animationDelay: dot.animationDelay,
                animationDuration: dot.animationDuration
                }}
            />
            ))}
        </div>

            {/* Foreground Content */}
            <form className="relative z-10 text-center min-h-screen flex flex-col items-center justify-center space-y-10" onSubmit={startgame}>
                {/* <select
                    name="time"
                    id="time"
                    className="mb-10 text-lg rounded-lg bg-slate-800 px-10 py-4 cursor-pointer"
                    onChange={(e) => setMode(e.target.value)}
                >
                    <option value="10">10 Minutes (Rapid)</option>
                    <option value="3">3 Minutes (Blitz)</option>
                    <option value="1">1 Minute (Bullet)</option>
                    <option value="custom">Custom</option>
                </select>

                {mode === "custom" && (
                        <input className="bg-slate-800 py-4 px-2 w-[20vw] text-center text-[1.2em]" type="Number" placeholder="Enter Time in Minutes" />
                    )
                } */}


                <div className="flex items-center justify-center space-x-10">
                    <button
                        type="submit"
                        className="group bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all transform hover:scale-105 hover:shadow-yellow-500/25 flex items-center space-x-2"
                    >
                        <Play className="h-6 w-6 group-hover:animate-pulse" />
                        <span>Start Game</span>
                    </button>

                    <button
                        type="button"
                        className="group bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all transform hover:scale-105 hover:shadow-yellow-500/25 flex items-center space-x-2"
                        onClick={() => redirect('/online/join')}
                    >
                        <CirclePlus className="h-6 w-6 group-hover:animate-pulse" />
                        <span>Join Game</span>
                    </button>
                </div>

            </form>
        </div>
    );
};

export default OnlinePlay;
