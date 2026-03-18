


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopHeader } from "@/components/TopHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

interface WorkshopData {
  name: string;
  phone: string;
  address: string;
  whats: string;
  workingHours: string;
}

export default function AddWorkshopPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<WorkshopData>({
    name: "",
    phone: "",
    address: "",
    whats: "",
    workingHours: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.whats || !formData.workingHours) {
      toast.error("يرجى ملء جميع الحقول المطلوبة بما فيها ساعات العمل");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.qudra.online/api/User/RegesterWorkshop?lang=ar",
        formData
      );
      
      if (response.status === 200 || response.status === 201) {
        toast.success("تم إضافة الورشة بنجاح!");
        navigate("/");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "حدث خطأ في الإضافة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopHeader title="إضافة ورشة جديدة" />
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-full bg-card rounded-xl border p-5 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-right">إضافة ورشة عمل جديدة</h3>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-1.5 block text-right">اسم الورشة</label>
              <Input name="name" value={formData.name} onChange={handleChange} className="text-right" />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block text-right">رقم الهاتف</label>
              <Input name="phone" value={formData.phone} onChange={handleChange} dir="ltr" className="text-right" />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block text-right">رقم الواتساب</label>
              <Input name="whats" value={formData.whats} onChange={handleChange} dir="ltr" className="text-right" />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block text-right">العنوان</label>
              <Input name="address" value={formData.address} onChange={handleChange} className="text-right" />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block text-right">ساعات العمل</label>
              <Input 
                name="workingHours" 
                value={formData.workingHours} 
                onChange={handleChange} 
                placeholder="مثال: 9ص - 10م"
                className="text-right" 
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row-reverse gap-3 mt-8">
            <Button onClick={handleSubmit} disabled={loading} className="w-full sm:flex-1">
              {loading ? "جاري الحفظ..." : "حفظ الورشة"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/")} className="w-full sm:flex-1">
              إلغاء
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}