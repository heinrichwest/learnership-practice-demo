"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    Users,
    FileText,
    Settings,
    LogOut,
    LayoutDashboard,
    Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const isAdmin = session?.user?.role === "SYSTEM_ADMIN";

    const links = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        ...(isAdmin
            ? [
                { href: "/dashboard/users", label: "Users", icon: Users },
                { href: "/dashboard/roles", label: "Roles", icon: Shield },
            ]
            : []),
        { href: "/dashboard/programs", label: "Rollout Programs", icon: FileText },
    ];

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white/50 backdrop-blur-xl dark:border-gray-800 dark:bg-zinc-900/50"
        >
            <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-800">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                    SpecCon Portal
                </span>
            </div>

            <nav className="mt-6 flex-1 space-y-1 px-4">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-zinc-800/50 dark:hover:text-gray-100"
                            )}
                        >
                            <Icon size={20} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-4 left-0 w-full px-4">
                <div className="mb-4 flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-zinc-800/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        {session?.user?.name?.[0] || "U"}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {session?.user?.name}
                        </p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                            {session?.user?.role}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => signOut()}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
