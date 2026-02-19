import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Welcome Back</h3>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{session.user?.name}</p>
                </div>
                {/* Stats placeholders */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Programs</h3>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">12</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Learners</h3>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">450</p>
                </div>
            </div>
        </div>
    );
}
