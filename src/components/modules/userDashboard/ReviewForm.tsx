"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, MessageSquare, User } from "lucide-react";
import { submitDualReview } from "@/services/dashboard/review";
import { StarRating } from "../shared/star-rating";

interface DualReviewFormProps {
  eventId: string;
  hostId: string;
  eventTitle: string;
  hostName: string;
}

export default function DualReviewForm({
  eventId,
  hostId,
  eventTitle,
  hostName,
}: DualReviewFormProps) {
  // Bind IDs to server action
  const submitWithIds = submitDualReview.bind(null, eventId, hostId);
  const [state, formAction, isPending] = useActionState(submitWithIds, null);

  // Local state for stars visual feedback
  const [eventRating, setEventRating] = useState(0);
  const [hostRating, setHostRating] = useState(0);

  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Share Your Experience</h1>
        <p className="text-muted-foreground mt-2">
          Your feedback helps us improve future events.
        </p>
      </div>

      <form action={formAction} className="space-y-8">
        {/* --- SECTION 1: EVENT REVIEW --- */}
        <Card className="border-l-primary border-l-4">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <MessageSquare className="text-primary h-5 w-5" />
              <h2 className="text-primary text-xs font-semibold tracking-wide uppercase">
                Event Feedback
              </h2>
            </div>
            <CardTitle>{eventTitle}</CardTitle>
            <CardDescription>
              How was the content, organization, and overall vibe?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Rate the Event</Label>
              <StarRating
                name="eventRating"
                value={eventRating}
                onChange={setEventRating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventComment">Your Comments</Label>
              <Textarea
                id="eventComment"
                name="eventComment"
                placeholder="The speakers were amazing because..."
                className="h-28 resize-none"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* --- SECTION 2: HOST REVIEW --- */}
        <Card className="border-l-secondary border-l-4">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <User className="text-secondary-foreground h-5 w-5" />
              <h2 className="text-secondary-foreground text-xs font-semibold tracking-wide uppercase">
                Host Feedback
              </h2>
            </div>
            <CardTitle>Host: {hostName}</CardTitle>
            <CardDescription>
              How was the host professionalism and communication?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Rate the Host</Label>
              <StarRating
                name="hostRating"
                value={hostRating}
                onChange={setHostRating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hostComment">Your Comments</Label>
              <Textarea
                id="hostComment"
                name="hostComment"
                placeholder="The host was very welcoming..."
                className="h-28 resize-none"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* --- SUBMIT --- */}
        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full text-lg"
            disabled={isPending || eventRating === 0 || hostRating === 0}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Reviews"
            )}
          </Button>
          <p className="text-muted-foreground mt-4 text-center text-xs">
            Reviews cannot be edited after submission.
          </p>
        </div>
      </form>
    </div>
  );
}
