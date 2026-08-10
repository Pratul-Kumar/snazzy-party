"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function OwnerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back, Boss.");
      router.push("/owner");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }
    
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-md surface p-8 rounded-3xl border border-gold/30 shadow-[0_0_50px_rgba(255,215,0,0.05)]">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">👑</div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-gold mb-2">Owner Login</h1>
          <p className="text-muted text-sm font-bold tracking-widest uppercase">Restricted Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-gold/50 transition-colors"
              placeholder="boss@snazzybois.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-gold/50 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold text-black py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResetPassword}
            type="button"
            className="text-xs font-bold text-muted uppercase tracking-widest hover:text-white transition-colors"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
