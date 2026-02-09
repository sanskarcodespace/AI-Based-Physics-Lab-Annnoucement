import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
      {/* Hero Section */}
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Next-Generation Physics Lab</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-gradient leading-[1.1]">
          Visualize Physics in <br />
          <span className="text-accent underline decoration-accent/30 underline-offset-8">Stunning 3D</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
          The ultimate SaaS platform for physics experiments and announcements.
          Powered by React Three Fiber and GSAP for fluid interactions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" className="h-12 px-8 text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(94,234,212,0.3)]">
            Explore Lab <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold glass hover:bg-white/10 transition-all">
            Watch Demo
          </Button>
        </div>
      </div>

      {/* Feature Preview (using glassmorphism) */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-8 rounded-2xl group cursor-pointer transition-all hover:-translate-y-2 hover:bg-card/60">
            <div className="w-12 h-12 rounded-xl bg-violet/20 flex items-center justify-center mb-6 border border-violet/30 group-hover:scale-110 transition-transform">
              <Sparkles className="text-violet w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3">Feature {i}</h3>
            <p className="text-muted-foreground font-sans text-sm leading-relaxed">
              Beautifully crafted interactive components with built-in 3D physics support.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
