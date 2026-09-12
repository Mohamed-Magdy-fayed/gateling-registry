import { createMeetingsWebhookHandler } from "@/integrations/meetings/webhook"

/**
 * Inbound endpoint for Gateling Meetings lifecycle events. Point the
 * integration's "Webhook URL" (meetings.gateling.com/settings/integrations)
 * at `https://<this app>/api/meetings-webhook`.
 *
 * Replace `onDelivery` with a hand-off to your job queue — e.g.
 *   await inngest.send({ name: "meetings/webhook.received", id: delivery.id, data: delivery })
 * The `id` is stable across retries; use it to deduplicate.
 */
export const POST = createMeetingsWebhookHandler({
  secret: process.env.MEETINGS_WEBHOOK_SECRET,
  onDelivery: async delivery => {
    void delivery
  },
})
