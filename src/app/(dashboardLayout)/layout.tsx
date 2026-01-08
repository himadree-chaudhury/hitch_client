// src/app/(protected)/layout.tsx
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Fetch on Server
  const user = await getUserInfo();

  // 2. Security Check (Optional but recommended here)
  if (!user) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      {/* 3. Pass user data down */}
      <AppSidebar user={user} />
      <main className="w-full">
        <div className="flex items-center gap-4 border-b px-4 py-2">
          <SidebarTrigger /> <p>Dashboard</p>
        </div>
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
