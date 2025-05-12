-- Create tables for Vocalift

-- Enable Row Level Security
ALTER DATABASE postgres SET "anon.role" TO 'anon';
ALTER DATABASE postgres SET "service_role.role" TO 'service_role';

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user quotas table
CREATE TABLE IF NOT EXISTS user_quotas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  max_files INTEGER NOT NULL DEFAULT 10,
  max_file_size INTEGER NOT NULL DEFAULT 10485760, -- 10MB in bytes
  daily_file_limit INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create files table
CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  original_url TEXT NOT NULL,
  transcription TEXT,
  summary TEXT,
  translation TEXT,
  language TEXT,
  status TEXT NOT NULL DEFAULT 'UPLOADED' CHECK (status IN ('UPLOADED', 'PROCESSING', 'TRANSCRIBED', 'SUMMARIZED', 'TRANSLATED', 'ERROR')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create AI logs table
CREATE TABLE IF NOT EXISTS ai_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_id UUID NOT NULL REFERENCES files(id) ON DELETE CASCADE UNIQUE,
  whisper_duration INTEGER,
  gpt_tokens INTEGER,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_modtime
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_user_quotas_modtime
BEFORE UPDATE ON user_quotas
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_files_modtime
BEFORE UPDATE ON files
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Setup Row Level Security (RLS)
-- Users table RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all user data" ON users;
CREATE POLICY "Admins can view all user data" ON users
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid() IN (
    SELECT id FROM users WHERE role = 'ADMIN'
  ));

CREATE POLICY "Service role can do anything" ON users
  USING (auth.jwt() ->> 'role' = 'service_role');

-- User quotas table RLS
ALTER TABLE user_quotas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quotas" ON user_quotas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all quotas" ON user_quotas
  FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'));

CREATE POLICY "Service role can do anything with quotas" ON user_quotas
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Files table RLS
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select their own files" ON files
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own files" ON files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own files" ON files
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own files" ON files
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can do anything with files" ON files
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'));

CREATE POLICY "Service role can do anything with files" ON files
  USING (auth.jwt() ->> 'role' = 'service_role');

-- AI logs table RLS
ALTER TABLE ai_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own AI logs" ON ai_logs
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM files WHERE files.id = ai_logs.file_id AND files.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all AI logs" ON ai_logs
  FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'));

CREATE POLICY "Service role can do anything with AI logs" ON ai_logs
  USING (auth.jwt() ->> 'role' = 'service_role'); 