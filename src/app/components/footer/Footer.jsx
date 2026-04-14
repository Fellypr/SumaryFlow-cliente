
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-zinc-400 py-12 px-6 md:px-12 mt-auto border-t border-zinc-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-xl font-bold tracking-tighter text-white hover:text-zinc-300 transition-colors">
            SumaryYT
          </Link>
          <p className="text-sm font-medium">
            Simplificando vídeos para você.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/Fellypr" target='_blank' className="hover:text-white transition-all hover:scale-110 duration-300">
            <Github size={20} strokeWidth={1.5} />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/fellype-kenned-05bb94319" target='_blank' className="hover:text-[#0A66C2] transition-all hover:scale-110 duration-300">
            <Linkedin size={20} strokeWidth={1.5} />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between text-[12px] border-t border-zinc-800/50 pt-6">
        <p>© {new Date().getFullYear()} SumaryYT.</p>
      </div>
    </footer>
  );
}
