export interface Workshop {
  id: number;
  name: string;
  phone: string;
  expiryDate: string;
  status: "active" | "suspended";
}

export const mockWorkshops: Workshop[] = [
  { id: 1, name: "ورشة الأمان للسيارات", phone: "0551234567", expiryDate: "15-06-2025", status: "active" },
  { id: 2, name: "ورشة النجم الذهبي", phone: "0559876543", expiryDate: "20-03-2025", status: "active" },
  { id: 3, name: "ورشة الخليج للصيانة", phone: "0553456789", expiryDate: "01-01-2025", status: "suspended" },
  { id: 4, name: "ورشة المتقدمة", phone: "0557654321", expiryDate: "10-08-2025", status: "active" },
  { id: 5, name: "ورشة الإتقان", phone: "0552345678", expiryDate: "25-12-2024", status: "suspended" },
  { id: 6, name: "ورشة الريادة", phone: "0558765432", expiryDate: "30-09-2025", status: "active" },
  { id: 7, name: "ورشة السرعة", phone: "0554567890", expiryDate: "05-07-2025", status: "active" },
  { id: 8, name: "ورشة الحرفيين", phone: "0556543210", expiryDate: "18-02-2025", status: "suspended" },
  { id: 9, name: "ورشة التميز", phone: "0550987654", expiryDate: "22-11-2025", status: "active" },
  { id: 10, name: "ورشة القمة", phone: "0558901234", expiryDate: "14-04-2025", status: "active" },
];
