import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  Clock,
  Power,
  Wrench,
  Users,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { TopHeader } from "@/components/TopHeader";
import { StatCard } from "@/components/StatCard";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Workshop {
  id: string;
  name: string;
  code: string;
  phone: string;
  state: number;
  substitutionDate: string;
  endDate: string;
  totalCustomers: number;
}

export default function WorkshopsPage() {
  const navigate = useNavigate();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [overview, setOverview] = useState({
    totalWorkshops: 0,
    totalActiveWorkshops: 0,
    totalInactiveWorkshops: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [corsError, setCorsError] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "suspended"
  >("all");
  const [extendModal, setExtendModal] = useState<Workshop | null>(null);
  const [newDate, setNewDate] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const baseUrl = "https://api.qudra.online/api/Admin";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const statsRes = await fetch(`${baseUrl}/OverviewCardsData`, {
        headers,
      });
      const statsJson = await statsRes.json();

      if (statsJson.success) {
        setOverview(statsJson.data);
      }

      const listRes = await fetch(`${baseUrl}/WorkshopsManagement`, {
        headers,
      });
      const listJson = await listRes.json();
      setWorkshops(listJson.data || []);

      setCorsError(false);
    } catch (error) {
      setCorsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = workshops.filter((w) => {
    const matchSearch =
      w.name?.toLowerCase().includes(search.toLowerCase()) ||
      w.phone?.includes(search);

    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" ? w.state === 0 : w.state !== 0);

    return matchSearch && matchStatus;
  });

  const handleExtendSubscription = async () => {
    if (!extendModal || !newDate || parseInt(newDate) <= 0) {
      alert("يرجى إدخال عدد شهور صحيح");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const url = `https://api.qudra.online/api/Admin/AddTime?workshopId=${extendModal.id}&newEndDate=${newDate}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });

      if (response.ok) {
        await fetchData();

        setExtendModal(null);
        setNewDate("");
 
        // alert(`تم تمديد الاشتراك لورشة ${extendModal.name} بنجاح`);
      } else {
        const errorData = await response.json();
        alert("فشل التمديد: تأكد من الصلاحيات أو صحة البيانات");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("حدث خطأ في الاتصال بالسيرفر");
    }
  };

  const handleToggleStatus = async (workshop: Workshop) => {
    try {
      const token = localStorage.getItem("token");

      const newState = workshop.state === 1 ? 2 : 1;

      const response = await fetch(
        `https://api.qudra.online/api/Admin/ChangeState?workshopId=${workshop.id}&newState=${newState}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        },
      );

      if (response.ok) {
        setWorkshops((prev) =>
          prev.map((w) =>
            w.id === workshop.id ? { ...w, state: newState } : w,
          ),
        );

        setOverview((prev) => {
          const isActivating = newState === 1;

          return {
            ...prev,
            totalActiveWorkshops: isActivating
              ? prev.totalActiveWorkshops + 1
              : prev.totalActiveWorkshops - 1,
            totalInactiveWorkshops: isActivating
              ? prev.totalInactiveWorkshops - 1
              : prev.totalInactiveWorkshops + 1,
          };
        });
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <TopHeader title="إدارة الورش" />

      <div className="p-6 space-y-6">
        {corsError && (
          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg flex items-center gap-3 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-4  gap-4">
          <StatCard
            title="إجمالي المستخدمينن"
            value={loading ? "..." : overview.totalUsers}
            icon={<Users className="h-5 w-5" />}
            variant="default"
          />
          <StatCard
            title="إجمالي الورش"
            value={loading ? "..." : overview.totalWorkshops}
            icon={<Wrench className="h-5 w-5" />}
          />
          <StatCard
            title="الورش النشطة"
            value={loading ? "..." : overview.totalActiveWorkshops}
            icon={<CheckCircle className="h-5 w-5" />}
            variant="success"
          />
          <StatCard
            title="الورش المعلّقة"
            value={loading ? "..." : overview.totalInactiveWorkshops}
            icon={<XCircle className="h-5 w-5" />}
            variant="destructive"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 w-full md:max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث بالاسم أو الهاتف..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 bg-card w-full"
            />
          </div>

          {/* <Button
            onClick={() => navigate("/workshops/add")}
            className="gap-2 w-full md:w-auto justify-center"
          >
            <Plus className="h-4 w-4" /> إضافة ورشة جديدة
          </Button> */}
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {loading ? (
            <div className="p-20 flex justify-center">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="block lg:hidden divide-y divide-border">
                {filtered.length > 0 ? (
                  filtered.map((w) => (
                    <div key={w.id} className="p-4 space-y-4 hover:bg-muted/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-base text-foreground">
                            {w.name}
                          </h4>
                          <p className="text-[10px] text-muted-foreground">
                            كود: {w.code}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold",
                            w.state === 1
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive",
                          )}
                        >
                          {w.state === 1 ? "نشط" : "معلّق"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-[11px]">
                            رقم الهاتف
                          </p>
                          <p className="font-mono" dir="ltr">
                            {w.phone}
                          </p>
                        </div>
                        <div className="text-left">
                          <p className="text-muted-foreground text-[11px]">
                            العملاء
                          </p>
                          <p className="font-bold">{w.totalCustomers ?? 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-[11px]">
                            تاريخ الانتهاء
                          </p>
                          <p>
                            {new Date(w.endDate).toLocaleDateString("ar-EG")}
                          </p>
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setExtendModal(w)}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "h-8 w-8 p-0",
                              w.state === 1
                                ? "text-destructive"
                                : "text-success",
                            )}
                            onClick={() => handleToggleStatus(w)}
                          >
                            <Power className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center text-muted-foreground">
                    لا توجد بيانات
                  </div>
                )}
              </div>

              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm text-right">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4">اسم الورشة</th>
                      <th className="py-3 px-4">رقم الهاتف</th>
                      
                      <th className="py-3 px-4 text-center">عدد العملاء</th>
                      <th className="py-3 px-4">تاريخ البداية</th>
                      <th className="py-3 px-4">تاريخ الانتهاء</th>
                      <th className="py-3 px-4">الحالة</th>
                      <th className="py-3 px-4 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length > 0 ? (
                      filtered.map((w) => (
                        <tr
                          key={w.id}
                          className="border-b last:border-0 hover:bg-muted/30"
                        >
                          <td className="py-3 px-4 font-semibold">
                            <div>
                              {w.name}
                              <div className="text-[10px] text-muted-foreground font-normal">
                                كود: {w.code}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono" dir="ltr">
                            {w.phone}
                          </td>
                          <td className="text-center font-medium">
                            {w.totalCustomers ?? 0}
                          </td>
                          <td className="py-3 px-4">
                            {w.substitutionDate &&
                            w.substitutionDate !== "0001-01-01T00:00:00"
                              ? new Date(w.substitutionDate).toLocaleDateString(
                                  "ar-EG",
                                )
                              : "غير محدد"}
                          </td>
                          <td className="py-3 px-4">
                            {new Date(w.endDate).toLocaleDateString("ar-EG")}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={cn(
                                "px-2.5 py-0.5 rounded-full text-xs font-medium",
                                w.state === 1
                                  ? "bg-success/10 text-success"
                                  : "bg-destructive/10 text-destructive",
                              )}
                            >
                              {w.state === 1 ? "نشط" : "معلّق"}
                            </span>
                          </td>
                          <td className="py-3 px-4 flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setExtendModal(w)}
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleStatus(w)}
                              className={
                                w.state === 1
                                  ? "text-destructive"
                                  : "text-success"
                              }
                            >
                              <Power className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-10 text-center text-muted-foreground"
                        >
                          لا توجد بيانات متاحة حالياً
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      <Dialog open={!!extendModal} onOpenChange={() => setExtendModal(null)}>
        <DialogContent
          dir="rtl"
          className="text-right [&>button]:right-auto [&>button]:left-4"
        >
          <DialogHeader>
            <DialogTitle className="text-right">
              تمديد اشتراك {extendModal?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <label className="text-sm mb-2 block text-right font-medium">
              عدد أشهر التمديد
            </label>
            <Input
              type="number"
              min="1"
              placeholder="أدخل عدد الشهور"
              value={newDate}
              className="text-right"
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>

          <DialogFooter className="flex flex-row-reverse sm:justify-start gap-2">
            <Button onClick={handleExtendSubscription}>حفظ</Button>
            <Button variant="outline" onClick={() => setExtendModal(null)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
