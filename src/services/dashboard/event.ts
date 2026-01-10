"use server";

import { serverFetch } from "@/lib/server-fetch"; // Your fetch wrapper
import { zodValidator } from "@/lib/zodValidator"; // Your custom validator
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

// 1. Validation Schema (Based on your provided Zod schema)
const createEventSchema = z.object({
  title: z.string().min(5).max(100),
  type: z.enum(["ONLINE", "OFFLINE", "HYBRID"]),
  // Backend expects array of strings for category names or IDs
  eventCategories: z
    .array(z.string())
    .min(1, "At least one category is required"),
  description: z.string().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  minParticipants: z.coerce.number().min(1),
  maxParticipants: z.coerce.number().optional(),
  joiningFee: z.coerce.number().min(0),
  currency: z.string().default("USD"),
});

export async function createEvent(_currentState: any, formData: FormData) {
  try {
    // 2. Extract Categories properly (Comma separated string -> Array)
    const categoriesString = formData.get("eventCategories") as string;
    const categoriesArray = categoriesString
      ? categoriesString
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    // 3. Construct Raw Data Object
    const rawData = {
      title: formData.get("title"),
      type: formData.get("type"),
      eventCategories: categoriesArray,
      description: formData.get("description"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      city: formData.get("city"),
      country: formData.get("country"),
      address: formData.get("address"),
      minParticipants: formData.get("minParticipants"),
      maxParticipants: formData.get("maxParticipants") || undefined, // Handle optional
      joiningFee: formData.get("joiningFee"),
      currency: formData.get("currency") || "USD",
    };

    const imageFile = formData.get("image") as File | null;

    // 4. Validate Fields
    const validation = zodValidator(rawData, createEventSchema);
    if (!validation.success) {
      return validation;
    }

    const validatedData = validation.data;

    // 5. Build FormData for Backend
    const backendFormData = new FormData();

    // Append standard fields
    Object.entries(validatedData).forEach(([key, value]) => {
      if (key === "eventCategories" && Array.isArray(value)) {
        // Append array items individually if backend expects 'eventCategories[]'
        // OR as a JSON string if backend expects that. Assuming array items:
        value.forEach((cat) => backendFormData.append("eventCategories", cat));
      } else if (value instanceof Date) {
        backendFormData.append(key, value.toISOString());
      } else if (value !== undefined && value !== null) {
        backendFormData.append(key, String(value));
      }
    });

    // Append Image
    if (imageFile && imageFile.size > 0) {
      backendFormData.append("image", imageFile);
    }

    // 6. Send to Backend
    const res = await serverFetch.post("/events", {
      body: backendFormData,
      // headers: {} // Browser sets boundary automatically
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to create event");
    }

    revalidatePath("/events");
    revalidatePath("/host/dashboard");
  } catch (error: any) {
    console.error("Create Event Error:", error);
    return {
      success: false,
      message: error.message || "An error occurred while creating the event.",
    };
  }

  // Redirect on success (outside try-catch to avoid NEXT_REDIRECT error)
  redirect("/host/dashboard");
}

// ... existing createEvent code ...

export async function updateEvent(
  eventId: string, 
  _currentState: any, 
  formData: FormData
) {
  try {
    // 1. Process Categories (String -> Array)
    const categoriesString = formData.get("eventCategories") as string;
    const categoriesArray = categoriesString
      ? categoriesString.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    // 2. Construct Data
    const rawData = {
      title: formData.get("title"),
      type: formData.get("type"),
      eventCategories: categoriesArray,
      description: formData.get("description"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      city: formData.get("city"),
      country: formData.get("country"),
      address: formData.get("address"),
      minParticipants: formData.get("minParticipants"),
      maxParticipants: formData.get("maxParticipants") || undefined,
      joiningFee: formData.get("joiningFee"),
      currency: formData.get("currency"),
    };

    // 3. Validation (Reusing createEventSchema)
    // We make imageUrl optional here because the user might not upload a new one
    const validation = zodValidator(rawData, createEventSchema.omit({ imageUrl: true }));
    
    if (!validation.success) {
      return validation;
    }

    // 4. Build FormData
    const backendFormData = new FormData();
    const validatedData = validation.data;

    Object.entries(validatedData).forEach(([key, value]) => {
      if (key === "eventCategories" && Array.isArray(value)) {
        value.forEach((cat) => backendFormData.append("eventCategories", cat));
      } else if (value instanceof Date) {
        backendFormData.append(key, value.toISOString());
      } else if (value !== undefined && value !== null) {
        backendFormData.append(key, String(value));
      }
    });

    // 5. Handle Image (Only append if a NEW file is selected)
    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      backendFormData.append("image", imageFile);
    }

    // 6. Send PATCH Request
    const res = await serverFetch.patch(`/events/${eventId}`, {
      body: backendFormData,
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to update event");
    }

    revalidatePath("/events");
    revalidatePath(`/events/${result.data.slug}`); // Revalidate specific event page
    revalidatePath("/host/dashboard");
    
    return { success: true, message: "Event updated successfully!" };

  } catch (error: any) {
    console.error("Update Event Error:", error);
    return {
      success: false,
      message: error.message || "An error occurred while updating.",
    };
  }
}