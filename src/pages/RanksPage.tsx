import { TopHeader } from "@/components/TopHeader";
import { Award } from "lucide-react";

export default function RanksPage() {
  return (
    <>
      <TopHeader title="الرتب" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">إدارة الرتب</h2>
          <p className="text-muted-foreground">هذه الصفحة قيد التطوير</p>
        </div>
      </div>
    </>
  );
}
