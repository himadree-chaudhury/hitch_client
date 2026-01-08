/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch"; // Your fetch wrapper
import { zodValidator } from "@/lib/zodValidator"; // Your custom validator
import { revalidatePath } from "next/cache";
import z from "zod";

// 1. Define the Schema (Reusing yours, but excluding imageUrl for raw validation)
// We validate the file separately or let the backend handle the image URL generation.
const userProfileSchema = z.object({
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  interests: z.array(z.string()).optional(),
  bio: z.string().max(300).optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  city: z.string().max(50).optional(),
  country: z.string().max(50).optional(),
});

export const updateUserProfile = async (
  _currentState: any,
  formData: FormData,
) => {
  try {
    // 2. Extract Data from FormData
    const rawData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      bio: formData.get("bio"),
      gender: formData.get("gender"),
      city: formData.get("city"),
      country: formData.get("country"),
      // Extract all interests as an array
      interests: formData.getAll("interests"),
    };

    const profileImage = formData.get("profileImage") as File | null;

    // 3. Validate Text Fields
    const validation = zodValidator(rawData, userProfileSchema);
    if (!validation.success) {
      return validation; // Returns error format compatible with your frontend
    }

    const validatedData = validation.data;

    // 4. Construct Payload for Backend
    // Since we have a file, we usually send FormData to the backend API.
    // If your backend expects JSON 'data' + file, we construct it accordingly.
    const backendFormData = new FormData();

    // Append text fields
    Object.keys(validatedData).forEach((key) => {
      const value = validatedData[key as keyof typeof validatedData];
      if (value) {
        if (Array.isArray(value)) {
          // Append arrays (interests) based on backend expectation
          value.forEach((item) => backendFormData.append(key, item));
        } else {
          backendFormData.append(key, value as string);
        }
      }
    });

    // Append File if exists and is valid
    if (profileImage && profileImage.size > 0) {
      backendFormData.append("profileImage", profileImage);
    }

    // 5. Send to Backend
    // Note: When sending FormData with fetch, DO NOT set Content-Type manually.
    // The browser/fetch client sets it to multipart/form-data with the boundary automatically.
    const res = await serverFetch.patch("/users/profile", {
      body: backendFormData,
      // headers: {} // Let browser set Content-Type
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to update profile");
    }

    // 6. Revalidate UI
    revalidatePath("/profile");

    return {
      success: true,
      message: "Profile updated successfully!",
      data: result.data,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error.message || "An error occurred while updating profile.",
    };
  }
};
