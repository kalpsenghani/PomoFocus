-- Create productivity_stats table for aggregated data
CREATE TABLE IF NOT EXISTS public.productivity_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  total_focus_time INTEGER DEFAULT 0, -- in minutes
  total_sessions INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  breaks_taken INTEGER DEFAULT 0,
  productivity_score DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.productivity_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for productivity stats
CREATE POLICY "Users can view own stats" ON public.productivity_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON public.productivity_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON public.productivity_stats
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_productivity_stats_user_date ON public.productivity_stats(user_id, date);

-- Create trigger for updated_at
CREATE TRIGGER update_productivity_stats_updated_at BEFORE UPDATE ON public.productivity_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
