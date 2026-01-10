"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateEvent } from "@/services/dashboard/event";
import { CalendarIcon, DollarSign, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

// Helper to format ISO date to 'datetime-local' input format
const formatDateForInput = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  // Manual formatting to ensure local time is respected or UTC depending on preference
  // This simple slice works if the browser handles timezone, or use date-fns for robustness
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
};

export default function UpdateEventForm({ event }: { event: any }) {
  // Bind the Event ID to the server action so we know which one to update
  const updateEventWithId = updateEvent.bind(null, event.id);

  const [state, formAction, isPending] = useActionState(
    updateEventWithId,
    null,
  );

  useEffect(() => {
    if (state) {
      if (!state.success && state.message) toast.error(state.message);
      if (state.success) toast.success(state.message);
    }
  }, [state]);

  // Pre-process categories: [{ eventCategory: { name: "Tech" } }] -> "Tech, ..."
  const defaultCategories = event.eventCategories
    ?.map((cat: any) => cat.eventCategory.name)
    .join(", ");

  return (
    <div className="bg-background mx-auto max-w-3xl rounded-xl border p-8 shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Edit Event</h1>
        <p className="text-muted-foreground mt-2">
          Update details for {event.title}
        </p>
      </div>

      <form action={formAction} className="space-y-8">
        {/* --- BASIC INFO --- */}
        <div className="space-y-4">
          <h2 className="border-b pb-2 text-lg font-semibold">Basic Details</h2>

          <Field>
            <FieldLabel htmlFor="title">Event Title</FieldLabel>
            <Input
              id="title"
              name="title"
              defaultValue={event.title}
              required
            />
          </Field>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel>Event Type</FieldLabel>
              <Select name="type" defaultValue={event.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONLINE">Online</SelectItem>
                  <SelectItem value="OFFLINE">Offline</SelectItem>
                  <SelectItem value="HYBRID">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="eventCategories">Categories</FieldLabel>
              <Input
                id="eventCategories"
                name="eventCategories"
                defaultValue={defaultCategories}
                placeholder="Tech, Music"
                required
              />
            </Field>
          </div>

          {/* Current Image Preview */}
          {event.imageUrl && (
            <div className="relative h-40 w-full overflow-hidden rounded-md border">
              <Image
                src={event.imageUrl}
                alt="Current Event Image"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black/60 p-1 text-center text-xs text-white">
                Current Image
              </div>
            </div>
          )}

          <Field>
            <FieldLabel htmlFor="image">
              Change Cover Image (Optional)
            </FieldLabel>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="cursor-pointer"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              defaultValue={event.description}
              className="h-32 resize-none"
            />
          </Field>
        </div>

        {/* --- DATE & TIME --- */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 border-b pb-2 text-lg font-semibold">
            <CalendarIcon className="h-5 w-5" /> Date & Time
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="startTime">Start Time</FieldLabel>
              <Input
                id="startTime"
                name="startTime"
                type="datetime-local"
                defaultValue={formatDateForInput(event.startTime)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="endTime">End Time</FieldLabel>
              <Input
                id="endTime"
                name="endTime"
                type="datetime-local"
                defaultValue={formatDateForInput(event.endTime)}
                required
              />
            </Field>
          </div>
        </div>

        {/* --- LOCATION --- */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 border-b pb-2 text-lg font-semibold">
            <MapPin className="h-5 w-5" /> Location
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input id="city" name="city" defaultValue={event.city} required />
            </Field>
            <Field>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <Input
                id="country"
                name="country"
                defaultValue={event.country}
                required
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="address">Full Address</FieldLabel>
            <Input
              id="address"
              name="address"
              defaultValue={event.address}
              required
            />
          </Field>
        </div>

        {/* --- TICKETS --- */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 border-b pb-2 text-lg font-semibold">
            <Users className="h-5 w-5" /> Capacity & Tickets
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="minParticipants">
                Min Participants
              </FieldLabel>
              <Input
                id="minParticipants"
                name="minParticipants"
                type="number"
                min="1"
                defaultValue={event.minParticipants}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="maxParticipants">
                Max Participants
              </FieldLabel>
              <Input
                id="maxParticipants"
                name="maxParticipants"
                type="number"
                min="1"
                defaultValue={event.maxParticipants}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="joiningFee">Ticket Price</FieldLabel>
              <div className="relative">
                <DollarSign className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                <Input
                  id="joiningFee"
                  name="joiningFee"
                  type="number"
                  step="0.01"
                  className="pl-9"
                  defaultValue={event.joiningFee}
                  required
                />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="currency">Currency</FieldLabel>
              <Select name="currency" defaultValue={event.currency || "USD"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
