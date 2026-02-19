"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createUser(data: FormData) {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const roleName = data.get("role") as string;

    try {
        // Check if role exists
        let role = await prisma.role.findUnique({
            where: { name: roleName },
        });

        if (!role) {
            // Create role if it doesn't exist (simplification for MVP)
            role = await prisma.role.create({
                data: { name: roleName, permissions: [] },
            });
        }

        await prisma.user.create({
            data: {
                name,
                email,
                password, // Ideally hash this
                roleId: role.id,
            },
        });

        revalidatePath("/dashboard/users");
        return { success: true };
    } catch (error) {
        console.error("Failed to create user:", error);
        return { success: false, error: "Failed to create user." };
    }
}
