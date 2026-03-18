import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  variant?: "default" | "success" | "destructive";
}

export function StatCard({ title, value, icon, variant = "default" }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            variant === "success" && "bg-success/10 text-success",
            variant === "destructive" && "bg-destructive/10 text-destructive",
            variant === "default" && "bg-primary/10 text-primary"
          )}
        >
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </div>
  );
}
