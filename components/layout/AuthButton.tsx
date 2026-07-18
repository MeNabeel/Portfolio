import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";
import { LogOut, User as UserIcon } from "lucide-react";

export async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link href="/login" className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/dashboard" className="hidden sm:flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
        <UserIcon size={16} />
        Dashboard
      </Link>
      <form action={logout}>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </form>
    </div>
  );
}
