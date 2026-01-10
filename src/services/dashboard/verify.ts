"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function requestVerificationOtp() {
  try {
    const res = await serverFetch.post("/auth/request-verification", {}); // Adjust endpoint
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to send OTP");

    return { success: true, message: "OTP sent to your email!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function verifyOtp(otp: string) {
  try {
    const res = await serverFetch.post("/auth/verify-otp", {
      body: JSON.stringify({ otp }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Invalid OTP");

    revalidatePath("/profile/verification"); // Refresh page to show "Verified" status
    revalidatePath("/profile");

    return { success: true, message: "Account verified successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
