
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          SpecCon Learnership
        </h1>
        <p className="mb-10 text-xl text-gray-300 max-w-2xl mx-auto">
          Manage rollout programs, generate PDF plans, and track learnership progress with our premium dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-500 transition-all hover:scale-105 shadow-xl shadow-blue-900/20"
          >
            Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 text-left max-w-5xl">
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-xl font-bold mb-2 text-blue-300">Rollout Planning</h3>
          <p className="text-gray-400">Create detailed rollout plans with automated PDF generation.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-xl font-bold mb-2 text-purple-300">User Management</h3>
          <p className="text-gray-400">Role-based access control for Admins, Clients, and Learners.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-xl font-bold mb-2 text-pink-300">Premium UI</h3>
          <p className="text-gray-400">Experience a fluid, modern interface designed for efficiency.</p>
        </div>
      </div>
    </div>
  );
}
