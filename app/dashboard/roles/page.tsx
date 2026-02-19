
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function RolesPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "SYSTEM_ADMIN") {
        redirect("/dashboard");
    }

    // Mock roles
    const roles = [
        { id: "1", name: "SYSTEM_ADMIN", permissions: ["manage_all", "view_users"] },
        { id: "2", name: "ADMIN", permissions: ["manage_own_programs", "create_programs"] },
        { id: "3", name: "USER", permissions: ["view_programs"] },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Role Management</h1>
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Add Role</button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                    <div key={role.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{role.name}</h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {role.permissions.map((perm) => (
                                <span key={perm} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-zinc-800 dark:text-gray-400">
                                    {perm}
                                </span>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Edit Permissions</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
