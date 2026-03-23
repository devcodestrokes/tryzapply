const API_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quiz-analytics`;

// Generate a unique session ID per quiz attempt
export function generateSessionId(): string {
  return crypto.randomUUID();
}

export type QuizEventType = "page_visited" | "quiz_start" | "quiz_complete" | "claim";

export async function trackQuizEvent(
  sessionId: string,
  quizVariant: string,
  eventType: QuizEventType
) {
  try {
    await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        quiz_variant: quizVariant,
        event_type: eventType,
      }),
    });
  } catch (err) {
    console.error("Failed to track quiz event:", err);
  }
}

export interface QuizAnalytics {
  quiz_variant: string;
  page_visits: number;
  starts: number;
  completions: number;
  claims: number;
}

export interface DateRange {
  from?: string; // ISO string
  to?: string;   // ISO string
}

export async function fetchQuizAnalytics(range?: DateRange): Promise<QuizAnalytics[]> {
  try {
    const params = new URLSearchParams();
    if (range?.from) params.set("from", range.from);
    if (range?.to) params.set("to", range.to);
    const qs = params.toString();
    const url = qs ? `${API_BASE}?${qs}` : API_BASE;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      console.error("Failed to fetch analytics:", res.statusText);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch analytics:", err);
    return [];
  }
}
