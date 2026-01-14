-- Vendor Risk Assessment Dashboard Database Schema
-- Run this script to initialize the PostgreSQL database

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE risk_level AS ENUM ('High', 'Medium', 'Low');
CREATE TYPE assessment_status AS ENUM ('Pending', 'In Progress', 'Completed', 'Overdue');

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    security_score INTEGER NOT NULL CHECK (security_score >= 0 AND security_score <= 100),
    compliance_certifications TEXT[] DEFAULT '{}',
    risk_level risk_level NOT NULL DEFAULT 'Medium',
    last_assessment_date DATE,
    next_assessment_date DATE,
    assessment_status assessment_status NOT NULL DEFAULT 'Pending',
    contact_email VARCHAR(255) NOT NULL,
    contract_end_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_vendors_risk_level ON vendors(risk_level);
CREATE INDEX IF NOT EXISTS idx_vendors_assessment_status ON vendors(assessment_status);
CREATE INDEX IF NOT EXISTS idx_vendors_security_score ON vendors(security_score);
CREATE INDEX IF NOT EXISTS idx_vendors_next_assessment ON vendors(next_assessment_date);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_vendors_updated_at ON vendors;
CREATE TRIGGER update_vendors_updated_at
    BEFORE UPDATE ON vendors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create audit log table for tracking changes
CREATE TABLE IF NOT EXISTS vendor_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    changed_by VARCHAR(255),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_vendor_id ON vendor_audit_log(vendor_id);
CREATE INDEX IF NOT EXISTS idx_audit_changed_at ON vendor_audit_log(changed_at);
