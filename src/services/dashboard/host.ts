"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/server-fetch";

export async function updateHostStatus(hostId: string, newStatus: string) {
  try {
    // Adjust endpoint path if necessary, e.g., /hosts/${hostId}/status
    const res = await serverFetch.patch(`/hosts/${hostId}/status`, {
      body: JSON.stringify({ status: newStatus }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failed to update host status");
    }

    revalidatePath("/admin/hosts");
    return { success: true, message: `Host status updated to ${newStatus}` };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update status" };
  }
}
