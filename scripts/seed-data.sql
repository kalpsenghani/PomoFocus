-- Insert sample user data (this would normally be handled by Supabase Auth)
-- This is just for development/testing purposes

-- Sample tasks for development
INSERT INTO public.tasks (user_id, title, description, estimated_pomodoros, status, priority) VALUES
  (auth.uid(), 'Complete project proposal', 'Write and review the Q1 project proposal document', 4, 'todo', 'high'),
  (auth.uid(), 'Review code changes', 'Review pull requests from the development team', 2, 'in_progress', 'medium'),
  (auth.uid(), 'Update documentation', 'Update API documentation with latest changes', 3, 'todo', 'medium'),
  (auth.uid(), 'Team meeting preparation', 'Prepare agenda and materials for weekly team meeting', 1, 'done', 'low'),
  (auth.uid(), 'Bug fixes', 'Fix critical bugs reported by QA team', 5, 'todo', 'urgent');

-- Sample productivity stats
INSERT INTO public.productivity_stats (user_id, date, total_focus_time, total_sessions, tasks_completed, breaks_taken, productivity_score) VALUES
  (auth.uid(), CURRENT_DATE - INTERVAL '6 days', 120, 6, 3, 5, 0.85),
  (auth.uid(), CURRENT_DATE - INTERVAL '5 days', 100, 5, 2, 4, 0.75),
  (auth.uid(), CURRENT_DATE - INTERVAL '4 days', 150, 7, 4, 6, 0.92),
  (auth.uid(), CURRENT_DATE - INTERVAL '3 days', 90, 4, 2, 3, 0.68),
  (auth.uid(), CURRENT_DATE - INTERVAL '2 days', 130, 6, 3, 5, 0.88),
  (auth.uid(), CURRENT_DATE - INTERVAL '1 day', 110, 5, 3, 4, 0.82),
  (auth.uid(), CURRENT_DATE, 75, 3, 1, 2, 0.70);

-- Sample AI insights
INSERT INTO public.ai_insights (user_id, type, title, description, confidence, data) VALUES
  (auth.uid(), 'productivity', 'Peak Performance Window', 'Your productivity peaks between 9-11 AM based on session completion rates. Schedule important tasks during this time.', 87, '{"peak_hours": ["09:00", "11:00"], "completion_rate": 0.92}'),
  (auth.uid(), 'timing', 'Break Optimization', 'Taking 5-minute walks during breaks increases your next session focus by 23%. Consider active breaks.', 78, '{"improvement": 0.23, "break_type": "active"}'),
  (auth.uid(), 'task', 'Task Breakdown Strategy', 'Tasks estimated at 4+ pomodoros have 34% lower completion rates. Consider breaking them into smaller chunks.', 91, '{"threshold": 4, "completion_impact": -0.34}'),
  (auth.uid(), 'habit', 'Consistency Pattern', 'You maintain focus best with 25-minute sessions. Your completion rate drops 15% with longer sessions.', 83, '{"optimal_duration": 25, "performance_drop": 0.15}');
