import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>
            Built with{" "}
            <Heart className="inline h-3.5 w-3.5 text-red-500 fill-red-500" />{" "}
            for the Traefik community
          </p>
          <div className="flex items-center gap-4">
            <a href="https://doc.traefik.io/traefik/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Official Docs
            </a>
            <a href="https://github.com/traefik/traefik" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="https://community.traefik.io/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Community
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
