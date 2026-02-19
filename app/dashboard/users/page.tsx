
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UserManagement from "./user-management";

// Define the shape of user data for the component
interface UserWithRole {
    id: string;
    name: string | null;
    email: string;
    role: { name: string };
}

export default async function UsersPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "SYSTEM_ADMIN") {
        redirect("/dashboard");
    }

    // Fetch users (mock if DB fails)
    let users: UserWithRole[] = [];
    try {
        const dbUsers: any = await prisma.user.findMany({
            include: { role: true },
            orderBy: { createdAt: 'desc' }
        });

        users = dbUsers.map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: { name: u.role?.name || "Unknown" }
        }));
    } catch (e) {
        console.warn("DB Connection failed, using mock data");
        users = [
            { id: "1", name: "System Admin", email: "admin@system.com", role: { name: "SYSTEM_ADMIN" } },
            { id: "2", name: "Client User", email: "user@client.com", role: { name: "ADMIN" } },
        ];
    }

    return <UserManagement initialUsers={users} />;
}
