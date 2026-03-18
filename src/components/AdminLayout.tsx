import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
