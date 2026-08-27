-- Soru-Cevap (Q&A) tablosu
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_code TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  question_text TEXT NOT NULL,
  answer_text TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'answered', 'rejected')),
  is_public BOOLEAN DEFAULT FALSE,
  answered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_tracking_code ON questions(tracking_code);
CREATE INDEX IF NOT EXISTS idx_questions_status ON questions(status);
CREATE INDEX IF NOT EXISTS idx_questions_public ON questions(is_public) WHERE is_public = TRUE;
