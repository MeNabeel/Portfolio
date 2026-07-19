import Link from "next/link";
import { LayoutDashboard, Users, FileText, LogOut } from "lucide-react";
import { logout } from "../login/actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const isHardcodedAdmin = cookieStore.get("hardcoded_admin")?.value === "true";

  if (!user && !isHardcodedAdmin) {
    redirect("/login");
  }

  // Optional: Enforce ADMIN role if you rely on the Prisma User table
  // const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  // if (dbUser?.role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen bg-background flex text-white mt-16">
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight">Admin Portal</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all">
            <LayoutDashboard size={20} />
            Overview
          </Link>
          <Link href="/dashboard/contacts" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all">
            <Users size={20} />
            Contacts
          </Link>
          <Link href="/dashboard/content" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all">
            <FileText size={20} />
            CMS
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
