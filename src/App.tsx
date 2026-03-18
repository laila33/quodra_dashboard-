import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import DashboardPage from "@/pages/DashboardPage";
import WorkshopsPage from "@/pages/WorkshopsPage";
import AddWorkshopPage from "@/pages/AddWorkshopPage";
import RanksPage from "@/pages/RanksPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            {/* <Route path="/" element={<DashboardPage />} /> */}
            <Route path="/" element={<WorkshopsPage />} />
            <Route path="/workshops/add" element={<AddWorkshopPage />} />
            <Route path="/add-workshop" element={<AddWorkshopPage />} />{" "}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
