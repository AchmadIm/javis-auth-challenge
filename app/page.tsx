"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950 p-4 font-sans transition-colors duration-500">

      <div className="fixed top-6 right-6 z-50">
        <ModeToggle />
      </div>

      <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-10 border border-gray-100 dark:border-neutral-800 transition-all">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Javis Tech</h1>
          <p className="text-gray-500 dark:text-neutral-400 mt-2">Silakan login untuk mengakses dashboard</p>
        </div>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 mb-6 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400 dark:text-neutral-500" size={18} />
            <input
              type="text" 
              placeholder="Email / Username"
              required
             
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white bg-white dark:bg-neutral-800"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

  
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400 dark:text-neutral-500" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full pl-10 pr-12 py-3 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white bg-white dark:bg-neutral-800"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 dark:text-neutral-500 hover:text-blue-600 transition-colors z-10"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all disabled:bg-gray-400 dark:disabled:bg-neutral-700"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Masuk Sekarang"}
          </button>
        </form>

        <p className="text-center text-gray-400 dark:text-neutral-600 text-xs mt-8">
          Challenge PT. Javis Teknologi Albarokah
        </p>
      </div>
    </div>
  );
}