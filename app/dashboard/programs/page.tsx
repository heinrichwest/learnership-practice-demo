import Link from "next/link";
import { Plus, FileText, Calendar } from "lucide-react";

export default function ProgramsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rollout Programs</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage and generate learnership rollout plans.</p>
                </div>
                <Link
                    href="/dashboard/programs/create"
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow-md transition-all hover:shadow-lg"
                >
                    <Plus size={20} /> New Plan
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder Items */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-zinc-900">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="rounded-lg bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                <FileText size={24} />
                            </div>
                            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Active
                            </span>
                        </div>

                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                            Retail Supervisor L4
                        </h3>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Client: The Windfarm
                        </p>

                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar size={14} />
                            <span>Created: Feb 12, 2026</span>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <button className="flex-1 rounded-md border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-zinc-800">
                                View
                            </button>
                            <button className="flex-1 rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                Download PDF
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
