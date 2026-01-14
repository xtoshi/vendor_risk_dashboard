export type ComplianceCertification = 'SOC2' | 'ISO27001' | 'GDPR' | 'HIPAA' | 'PCI-DSS';

export type RiskLevel = 'High' | 'Medium' | 'Low';

export type AssessmentStatus = 'Pending' | 'In Progress' | 'Completed' | 'Overdue';

export interface Vendor {
  id: string;
  name: string;
  serviceType: string;
  securityScore: number;
  complianceCertifications: ComplianceCertification[];
  riskLevel: RiskLevel;
  lastAssessmentDate: string | null;
  nextAssessmentDate: string | null;
  assessmentStatus: AssessmentStatus;
  contactEmail: string;
  contractEndDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorSummary {
  totalVendors: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  pendingAssessments: number;
  overdueAssessments: number;
  averageSecurityScore: number;
}

export interface RiskCalculationInput {
  securityScore: number;
  complianceCertifications: ComplianceCertification[];
  daysSinceLastAssessment: number | null;
}

export interface RiskCalculationResult {
  riskLevel: RiskLevel;
  riskScore: number;
  riskFactors: string[];
}
