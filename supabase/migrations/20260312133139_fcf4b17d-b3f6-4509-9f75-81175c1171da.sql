
-- Create quiz_events table to track all quiz analytics
CREATE TABLE public.quiz_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  quiz_variant TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('quiz_start', 'quiz_complete', 'claim')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public insert, no auth needed for anonymous tracking)
ALTER TABLE public.quiz_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (quiz tracking doesn't require auth)
CREATE POLICY "Anyone can insert quiz events"
  ON public.quiz_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow reading for analytics (public dashboard)
CREATE POLICY "Anyone can read quiz events"
  ON public.quiz_events FOR SELECT
  TO anon, authenticated
  USING (true);

-- Index for fast analytics queries
CREATE INDEX idx_quiz_events_variant_type ON public.quiz_events (quiz_variant, event_type);
CREATE INDEX idx_quiz_events_created_at ON public.quiz_events (created_at);
