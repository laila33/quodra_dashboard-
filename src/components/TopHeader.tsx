import { Globe, UserCircle } from "lucide-react";

export function TopHeader({ title }: { title: string }) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>

      <div className="flex items-center gap-3">
        {/* <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted">
          <Globe className="h-4 w-4" />
          <span>العربية</span>
        </button>
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <UserCircle className="h-5 w-5 text-primary" />
        </div> */}
      </div>
    </header>
  );
}
