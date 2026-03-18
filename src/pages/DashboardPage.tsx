import { TopHeader } from "@/components/TopHeader";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <TopHeader title="تحكم" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">مرحباً بك في Quodra</h2>
          <p className="text-muted-foreground">اختر قسماً من القائمة الجانبية للبدء</p>
        </div>
      </div>
    </>
  );
}
