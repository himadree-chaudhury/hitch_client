"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/server-fetch"; // Your existing fetch wrapper

export async function toggleUserStatus(userId: string, currentStatus: string) {
  const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";

  try {
    const res = await serverFetch.patch(`/users/${userId}/status`, {
      body: JSON.stringify({ status: newStatus }),
      headers: { "Content-Type": "application/json" },
    });

    // Check if the request was successful
    if (!res.ok) {
      throw new Error("Failed to update status");
    }

    // Refresh the users page data
    revalidatePath("/admin/users");

    return { success: true, message: `User marked as ${newStatus}` };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update user status" };
  }
}
