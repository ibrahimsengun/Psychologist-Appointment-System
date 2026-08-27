-- Add allow_publish column to questions table to track user consent for public sharing
ALTER TABLE questions ADD COLUMN IF NOT EXISTS allow_publish BOOLEAN DEFAULT FALSE;
