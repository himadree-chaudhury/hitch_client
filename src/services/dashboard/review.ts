"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

// Combined Validation Schema
const dualReviewSchema = z.object({
  eventRating: z.coerce.number().int().min(1).max(5),
  eventComment: z.string().min(10, "Event comment must be 10+ chars"),
  hostRating: z.coerce.number().int().min(1).max(5),
  hostComment: z.string().min(10, "Host comment must be 10+ chars").max(500),
});

export async function submitDualReview(
  eventId: string,
  hostId: string,
  _currentState: any,
  formData: FormData,
) {
  try {
    const rawData = {
      eventRating: formData.get("eventRating"),
      eventComment: formData.get("eventComment"),
      hostRating: formData.get("hostRating"),
      hostComment: formData.get("hostComment"),
    };

    // 1. Validate Form Data
    const validation = dualReviewSchema.safeParse(rawData);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.errors[0].message,
      };
    }
    const data = validation.data;

    // 2. Prepare Payloads
    const eventReviewPayload = {
      rating: data.eventRating,
      comment: data.eventComment,
      eventId,
    };

    const hostReviewPayload = {
      rating: data.hostRating,
      comment: data.hostComment,
      eventId,
      hostId,
    };

    // 3. Send to Backend (Parallel Requests)
    // Assuming your backend has separate endpoints, or a bulk endpoint.
    // Here we send them in parallel for speed.
    const [eventRes, hostRes] = await Promise.all([
      serverFetch.post("/reviews/event", {
        body: JSON.stringify(eventReviewPayload),
        headers: { "Content-Type": "application/json" },
      }),
      serverFetch.post("/reviews/host", {
        body: JSON.stringify(hostReviewPayload),
        headers: { "Content-Type": "application/json" },
      }),
    ]);

    // Check for errors in either request
    if (!eventRes.ok) {
      const err = await eventRes.json();
      throw new Error(err.message || "Failed to submit event review");
    }
    if (!hostRes.ok) {
      const err = await hostRes.json();
      throw new Error(err.message || "Failed to submit host review");
    }

    // 4. Success handling
    revalidatePath(`/events`);
  } catch (error: any) {
    console.error("Review Submission Error:", error);
    return {
      success: false,
      message: error.message || "Failed to submit reviews.",
    };
  }

  // Redirect to event page or profile on success
  redirect(`/events/${eventId}?reviewSubmitted=true`);
}
