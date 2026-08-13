"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function OwnerLoginPage() {
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
      router.push("/owner/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first");
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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(var(--muted) 1px, transparent 1px), linear-gradient(90deg, var(--muted) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent pointer-events-none" />

      {/* Floating Form Area */}
      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center">
        <div className="text-2xl mb-2">👑</div>
        <h1 className="font-gamer-heading text-3xl md:text-5xl tracking-wider text-center text-[var(--text)] mb-1">
          OWNER ACCESS
        </h1>
        <p className="font-gamer-mono text-[9px] tracking-[0.3em] text-[var(--muted)] mb-6 text-center">
          AUTHORIZED PERSONNEL ONLY
        </p>

        <div className="w-full h-[1px] bg-[var(--muted)]/20 mb-8" />

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="font-gamer-mono text-[9px] tracking-[0.25em] text-[var(--muted)] uppercase">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-b border-[var(--muted)]/20 focus:border-[var(--accent)] outline-none font-gamer-body text-lg py-2 transition-colors rounded-none w-full"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-gamer-mono text-[9px] tracking-[0.25em] text-[var(--muted)] uppercase">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-b border-[var(--muted)]/20 focus:border-[var(--accent)] outline-none font-gamer-body text-lg py-2 transition-colors rounded-none w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 font-gamer-mono text-[10px] tracking-[0.3em] border border-[var(--accent)]/30 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors py-3 px-8 uppercase disabled:opacity-50 disabled:cursor-not-allowed rounded-none w-full"
          >
            {isLoading ? "AUTHENTICATING..." : "ENTER OWNER MODE"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResetPassword}
          className="mt-6 font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors uppercase"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}
