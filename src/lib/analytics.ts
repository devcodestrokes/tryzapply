import { supabase } from "@/integrations/supabase/client";

// Generate a unique session ID per quiz attempt
export function generateSessionId(): string {
  return crypto.randomUUID();
}

export type QuizEventType = "quiz_start" | "quiz_complete" | "claim";

export async function trackQuizEvent(
  sessionId: string,
  quizVariant: string,
  eventType: QuizEventType
) {
  try {
    await supabase.from("quiz_events").insert({
      session_id: sessionId,
      quiz_variant: quizVariant,
      event_type: eventType,
    });
  } catch (err) {
    console.error("Failed to track quiz event:", err);
  }
}

export interface QuizAnalytics {
  quiz_variant: string;
  starts: number;
  completions: number;
  claims: number;
}

export async function fetchQuizAnalytics(): Promise<QuizAnalytics[]> {
  const { data, error } = await supabase
    .from("quiz_events")
    .select("quiz_variant, event_type");

  if (error || !data) {
    console.error("Failed to fetch analytics:", error);
    return [];
  }

  const map = new Map<string, QuizAnalytics>();

  for (const row of data) {
    const variant = row.quiz_variant;
    if (!map.has(variant)) {
      map.set(variant, { quiz_variant: variant, starts: 0, completions: 0, claims: 0 });
    }
    const entry = map.get(variant)!;
    if (row.event_type === "quiz_start") entry.starts++;
    else if (row.event_type === "quiz_complete") entry.completions++;
    else if (row.event_type === "claim") entry.claims++;
  }

  return Array.from(map.values());
}
