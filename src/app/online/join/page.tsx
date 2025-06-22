'use client';
import { useState , useEffect ,useRef} from "react";
import { CirclePlus } from "lucide-react";
import { redirect } from "next/navigation";

type Dot = {
  id: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
};

const JoinPage = () => {

    const [dots, setDots] = useState<Dot[]>([]);
    const [code , setCode] = useState<number>(0);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
    const generatedDots: Dot[] = [...Array(20)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
    }));
    setDots(generatedDots);
    ref.current?.select();
    }, []); 

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        redirect(`/online/join/${code}`);
    }

    const checkValue = () => {
        if(code == 0) return "";
        else return code;
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
        <form onSubmit={handleSubmit} className="block m-auto w-fit mt-[30vh]">
            
            <input type="number" className="bg-slate-800 px-2 py-2 m-10 w-[20vw] text-center text-[2em] outline-none focus:border-amber-400 focus:border-[1px tracking-widest"  value={checkValue()} onChange={(e) => {
                if(e.target.value.length > 5) return;
                setCode(Number(e.target.value));
            }} ref={ref}
            />

            <button
                type="submit"
                className="grou block m-auto bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all transform hover:scale-105 hover:shadow-yellow-500/25 flex items-center space-x-2"
                onClick={() => redirect(`/online/join`)}
            >
                <CirclePlus className="h-6 w-6 group-hover:animate-pulse" />
                <span>Join Game</span>
            </button>
        </form>

        </div>
  )
}

export default JoinPage
