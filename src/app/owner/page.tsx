import Link from "next/link";
export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-md surface p-8 rounded-3xl border border-gold/30 text-center">
        <h1 className="text-3xl font-black text-gold uppercase tracking-widest mb-4">OWNER DASHBOARD</h1>
        <p className="text-muted text-sm font-bold tracking-widest mb-8">Access Granted.</p>
        <Link href="/" className="inline-block bg-white text-black py-4 px-8 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
          Return to Site
        </Link>
      </div>
    </div>
  );
}
