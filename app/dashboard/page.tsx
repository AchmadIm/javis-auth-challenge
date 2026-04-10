import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { LogOut, ShieldCheck, User, Mail, LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle"; // Import tombol saklar

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  let userData = { username: "user", email: "" };

  try {
    const decoded: any = jwtDecode(token);
    userData = {
      username: decoded.username || "user",
      email: decoded.email || ""
    };
  } catch (err) {
    console.error("Gagal decode token di server");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <nav className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 p-4 px-8 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="font-bold text-xl tracking-tight">Javis Panel</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <ModeToggle />

          <form action="/api/auth/logout" method="POST">
             <button type="submit" className="flex items-center gap-2 text-red-500 hover:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-xl transition-all">
              <LogOut size={18} /> 
              <span>Keluar</span>
            </button>
          </form>
        </div>
      </nav>

      <main className="flex-1 p-8 flex flex-col items-center justify-center text-center">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 max-w-lg w-full transition-all">
          <div className="bg-green-100 dark:bg-green-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <ShieldCheck size={40} />
          </div>
          
          <h2 className="text-3xl font-bold">Selamat Datang, {userData.username}!</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Anda berhasil login menggunakan sistem identifikasi Javis.
          </p>

          <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl text-left space-y-4 border border-transparent dark:border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm text-blue-500 dark:text-blue-400">
                <User size={18} />
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-200">{userData.username}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm text-blue-500 dark:text-blue-400">
                <Mail size={18} />
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-200">{userData.email}</span>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-slate-400 dark:text-slate-600 text-sm">
          Challenge PT. Javis Teknologi Albarokah
        </p>
      </main>
    </div>
  );
}