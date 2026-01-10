"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateUserProfile } from "@/services/auth/updateProfile";

export default function EditProfileForm({
  initialData,
}: {
  initialData?: any;
}) {
  const [state, formAction, isPending] = useActionState(
    updateUserProfile,
    null,
  );

  useEffect(() => {
    if (state) {
      if (!state.success && state.message) {
        toast.error(state.message);
      } else if (state.success) {
        toast.success(state.message);
      }
    }
  }, [state]);

  // Helper: Convert array ["camping", "fishing"] -> "camping, fishing"
  const defaultInterests = initialData?.interests?.join(", ") || "";

  return (
    <div className="bg-background mx-auto flex max-w-2xl flex-col gap-6 rounded-lg border p-8 shadow-lg">
      <h1 className="my-5 text-center text-3xl font-bold">Edit Profile</h1>

      <form action={formAction} className="space-y-6">
        <FieldGroup>
          {/* --- Profile Image --- */}
          <Field>
            <FieldLabel htmlFor="profileImage">Profile Image</FieldLabel>
            <Input
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              className="cursor-pointer"
            />
            <FieldDescription>Max size 5MB.</FieldDescription>
          </Field>

          {/* --- Name Fields --- */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                defaultValue={initialData?.firstName}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                defaultValue={initialData?.lastName}
              />
            </Field>
          </div>

          {/* --- Bio --- */}
          <Field>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              defaultValue={initialData?.bio}
              className="h-32 resize-none"
            />
          </Field>

          {/* --- Gender & Location --- */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel>Gender</FieldLabel>
              <Select
                name="gender"
                defaultValue={initialData?.gender || "MALE"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input
                id="city"
                name="city"
                placeholder="New York"
                defaultValue={initialData?.city}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <Input
                id="country"
                name="country"
                placeholder="USA"
                defaultValue={initialData?.country}
              />
            </Field>
          </div>

          {/* --- Interests (Comma Separated Input) --- */}
          <Field>
            <FieldLabel htmlFor="interests">Interests</FieldLabel>
            <Input
              id="interests"
              name="interests"
              placeholder="Camping, Fishing, Tech, Hiking"
              defaultValue={defaultInterests}
            />
            <FieldDescription>
              Separate multiple interests with commas.
            </FieldDescription>
          </Field>
        </FieldGroup>

        <FieldGroup className="mt-8">
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Updating..." : "Save Changes"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
