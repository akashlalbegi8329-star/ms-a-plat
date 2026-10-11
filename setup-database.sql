-- MSME AI Platform Database Schema
-- Run this directly in Supabase SQL Editor
-- (Types already exist, so we skip CREATE TYPE)

-- Users Table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "email" TEXT UNIQUE NOT NULL,
  "name" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'CONTRIBUTOR',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Business Table
CREATE TABLE IF NOT EXISTS "Business" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "industry" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "employees" INTEGER,
  "registrationNo" TEXT,
  "gstNumber" TEXT,
  "panNumber" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  "ownerId" TEXT REFERENCES "User"("id")
);

-- Assessment Table
CREATE TABLE IF NOT EXISTS "Assessment" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "businessId" TEXT NOT NULL REFERENCES "Business"("id"),
  "consultantId" TEXT REFERENCES "User"("id"),
  "status" "AssessmentStatus" NOT NULL DEFAULT 'DRAFT',
  "notes" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Process Table
CREATE TABLE IF NOT EXISTS "Process" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "assessmentId" TEXT NOT NULL REFERENCES "Assessment"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "stepNumber" INTEGER,
  "photos" TEXT[] DEFAULT '{}',
  "voiceNotes" TEXT[] DEFAULT '{}',
  "duration" INTEGER,
  "costPerUnit" FLOAT8,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- AI Analysis Table
CREATE TABLE IF NOT EXISTS "AIAnalysis" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "assessmentId" TEXT UNIQUE NOT NULL REFERENCES "Assessment"("id") ON DELETE CASCADE,
  "processCount" INTEGER,
  "automationScore" FLOAT8,
  "roiEstimate" FLOAT8,
  "riskFactors" TEXT[] DEFAULT '{}',
  "opportunities" JSONB,
  "generatedAt" TIMESTAMP DEFAULT NOW()
);

-- Recommendation Table
CREATE TABLE IF NOT EXISTS "Recommendation" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "assessmentId" TEXT NOT NULL REFERENCES "Assessment"("id") ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "category" "RecommendationCategory",
  "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
  "costEstimate" FLOAT8,
  "timelineMonths" INTEGER,
  "roiPercentage" FLOAT8,
  "status" "RecommendationStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Scheme Table
CREATE TABLE IF NOT EXISTS "Scheme" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "code" TEXT UNIQUE NOT NULL,
  "ministry" TEXT,
  "description" TEXT,
  "maxAmount" FLOAT8,
  "eligibility" JSONB,
  "benefits" TEXT[] DEFAULT '{}',
  "documents" TEXT[] DEFAULT '{}',
  "applicationUrl" TEXT,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- SchemeEligibility Table
CREATE TABLE IF NOT EXISTS "SchemeEligibility" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "businessId" TEXT NOT NULL REFERENCES "Business"("id") ON DELETE CASCADE,
  "schemeId" TEXT NOT NULL REFERENCES "Scheme"("id") ON DELETE CASCADE,
  "isEligible" BOOLEAN,
  "matchScore" FLOAT8,
  "reasons" TEXT[] DEFAULT '{}',
  "checkedAt" TIMESTAMP DEFAULT NOW(),
  UNIQUE("businessId", "schemeId")
);

-- ComplianceTask Table
CREATE TABLE IF NOT EXISTS "ComplianceTask" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "businessId" TEXT NOT NULL REFERENCES "Business"("id") ON DELETE CASCADE,
  "type" "ComplianceType",
  "title" TEXT NOT NULL,
  "description" TEXT,
  "dueDate" TIMESTAMP NOT NULL,
  "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
  "documents" TEXT[] DEFAULT '{}',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- FinancialRecord Table
CREATE TABLE IF NOT EXISTS "FinancialRecord" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "businessId" TEXT NOT NULL REFERENCES "Business"("id") ON DELETE CASCADE,
  "type" "FinancialType",
  "amount" FLOAT8,
  "description" TEXT,
  "date" TIMESTAMP,
  "category" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Create Indexes (IF NOT EXISTS not supported for indexes, so we use DO block)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'Business' AND indexname = 'Business_ownerId_idx') THEN
    CREATE INDEX "Business_ownerId_idx" ON "Business"("ownerId");
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'Assessment' AND indexname = 'Assessment_businessId_idx') THEN
    CREATE INDEX "Assessment_businessId_idx" ON "Assessment"("businessId");
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'Assessment' AND indexname = 'Assessment_consultantId_idx') THEN
    CREATE INDEX "Assessment_consultantId_idx" ON "Assessment"("consultantId");
  END IF;
END $$;

-- Insert Sample Government Schemes (if not already present)
INSERT INTO "Scheme" ("name", "code", "ministry", "description", "maxAmount", "eligibility", "benefits", "documents", "isActive")
VALUES
('Prime Minister''s Employment Generation Programme', 'PMEGP', 'Ministry of Micro, Small and Medium Enterprises', 'Subsidy for new micro and small enterprises', 5000000, '{"minEmployees": 1, "maxEmployees": 50, "industries": ["Manufacturing", "Services"]}'::jsonb, ARRAY['Subsidy up to 35% in general areas', 'Bank finance up to 35 lakhs'], ARRAY['Project report', 'ID proof', 'Address proof'], true),
('Pradhan Mantri Mudra Yojana', 'PMMY', 'Ministry of Finance', 'Collateral-free loans for micro-enterprises', 1000000, '{"minEmployees": 1}'::jsonb, ARRAY['Loan up to 10 lakh', 'No collateral required'], ARRAY['KYC documents', 'Business plan'], true),
('Credit Guarantee Fund Trust for MSME', 'CGTMSE', 'Ministry of MSME', 'Credit guarantee for collateral-free loans', 2000000, '{"minEmployees": 1, "maxEmployees": 100}'::jsonb, ARRAY['Collateral-free credit up to 2 crore', 'Guarantee cover up to 85%'], ARRAY['Udyam registration', 'Financial statements'], true)
ON CONFLICT("code") DO NOTHING;
