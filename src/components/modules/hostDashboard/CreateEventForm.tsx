"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"; // Assuming your custom wrappers
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createEvent } from "@/services/dashboard/event";
import { CalendarIcon, DollarSign, MapPin, Users } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function CreateEventForm() {
  const [state, formAction, isPending] = useActionState(createEvent, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="bg-background mx-auto max-w-3xl rounded-xl border p-8 shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
        <p className="text-muted-foreground mt-2">
          Host your next big meetup, workshop, or conference.
        </p>
      </div>

      <form action={formAction} className="space-y-8">
        {/* --- BASIC INFO SECTION --- */}
        <div className="space-y-4">
          <h2 className="border-b pb-2 text-lg font-semibold">Basic Details</h2>

          <Field>
            <FieldLabel htmlFor="title">Event Title</FieldLabel>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Annual Tech Conference 2026"
              required
            />
          </Field>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel>Event Type</FieldLabel>
              <Select name="type" defaultValue="ONLINE">
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
                placeholder="Technology, Design, AI"
                required
              />
              <FieldDescription>
                Comma separated (e.g. Tech, Music)
              </FieldDescription>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="image">Cover Image</FieldLabel>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="cursor-pointer"
              required
            />
            <FieldDescription>
              Recommended size: 1200x600px (Max 5MB)
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell people what your event is about..."
              className="h-32 resize-none"
            />
          </Field>
        </div>

        {/* --- DATE & TIME SECTION --- */}
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
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="endTime">End Time</FieldLabel>
              <Input
                id="endTime"
                name="endTime"
                type="datetime-local"
                required
              />
            </Field>
          </div>
        </div>

        {/* --- LOCATION SECTION --- */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 border-b pb-2 text-lg font-semibold">
            <MapPin className="h-5 w-5" /> Location
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input
                id="city"
                name="city"
                placeholder="San Francisco"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <Input
                id="country"
                name="country"
                placeholder="United States"
                required
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="address">Full Address</FieldLabel>
            <Input
              id="address"
              name="address"
              placeholder="123 Market St, Suite 400"
              required
            />
          </Field>
        </div>

        {/* --- TICKETS & CAPACITY SECTION --- */}
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
                placeholder="10"
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
                placeholder="500"
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
                  min="0"
                  placeholder="0.00"
                  className="pl-9"
                  required
                />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="currency">Currency</FieldLabel>
              <Select name="currency" defaultValue="USD">
                <SelectTrigger>
                  <SelectValue placeholder="USD" />
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
            {isPending ? "Creating Event..." : "Publish Event"}
          </Button>
          <p className="text-muted-foreground mt-4 text-center text-xs">
            By publishing, you agree to our terms of service for hosts.
          </p>
        </div>
      </form>
    </div>
  );
}
