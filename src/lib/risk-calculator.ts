import type {
  ComplianceCertification,
  RiskCalculationInput,
  RiskCalculationResult,
  RiskLevel,
} from '@/types/vendor';

const REQUIRED_CERTIFICATIONS: ComplianceCertification[] = ['SOC2', 'ISO27001'];

const CERTIFICATION_WEIGHTS: Record<ComplianceCertification, number> = {
  'SOC2': 25,
  'ISO27001': 25,
  'GDPR': 15,
  'HIPAA': 20,
  'PCI-DSS': 15,
};

const RISK_THRESHOLDS = {
  HIGH: 60,
  MEDIUM: 30,
} as const;

const ASSESSMENT_STALE_DAYS = 365;
const ASSESSMENT_WARNING_DAYS = 180;

export function calculateRiskLevel(input: RiskCalculationInput): RiskCalculationResult {
  const riskFactors: string[] = [];
  let riskScore = 0;

  // Factor 1: Security Score (inverted - lower score = higher risk)
  const securityRiskContribution = Math.max(0, 100 - input.securityScore);
  riskScore += securityRiskContribution * 0.4; // 40% weight

  if (input.securityScore < 50) {
    riskFactors.push('Critical: Security score below 50');
  } else if (input.securityScore < 70) {
    riskFactors.push('Warning: Security score below 70');
  }

  // Factor 2: Missing Required Certifications
  const missingRequired = REQUIRED_CERTIFICATIONS.filter(
    (cert) => !input.complianceCertifications.includes(cert)
  );

  if (missingRequired.length > 0) {
    const missingWeight = missingRequired.reduce(
      (sum, cert) => sum + CERTIFICATION_WEIGHTS[cert],
      0
    );
    riskScore += missingWeight * 0.8; // Missing required certs heavily weighted
    riskFactors.push(`Missing required certifications: ${missingRequired.join(', ')}`);
  }

  // Factor 3: Total Compliance Coverage
  const totalPossibleWeight = Object.values(CERTIFICATION_WEIGHTS).reduce((a, b) => a + b, 0);
  const achievedWeight = input.complianceCertifications.reduce(
    (sum, cert) => sum + (CERTIFICATION_WEIGHTS[cert] || 0),
    0
  );
  const complianceCoverage = (achievedWeight / totalPossibleWeight) * 100;

  if (complianceCoverage < 50) {
    riskScore += 15;
    riskFactors.push('Low compliance coverage (< 50%)');
  }

  // Factor 4: Assessment Recency
  if (input.daysSinceLastAssessment !== null) {
    if (input.daysSinceLastAssessment > ASSESSMENT_STALE_DAYS) {
      riskScore += 20;
      riskFactors.push('Assessment overdue (> 1 year since last assessment)');
    } else if (input.daysSinceLastAssessment > ASSESSMENT_WARNING_DAYS) {
      riskScore += 10;
      riskFactors.push('Assessment aging (> 6 months since last assessment)');
    }
  } else {
    riskScore += 25;
    riskFactors.push('No previous assessment on record');
  }

  // Normalize risk score to 0-100
  riskScore = Math.min(100, Math.max(0, riskScore));

  // Determine risk level based on score
  let riskLevel: RiskLevel;
  if (riskScore >= RISK_THRESHOLDS.HIGH) {
    riskLevel = 'High';
  } else if (riskScore >= RISK_THRESHOLDS.MEDIUM) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'Low';
  }

  return {
    riskLevel,
    riskScore: Math.round(riskScore),
    riskFactors,
  };
}

export function getComplianceStatus(
  certifications: ComplianceCertification[]
): {
  hasSOC2: boolean;
  hasISO27001: boolean;
  isFullyCompliant: boolean;
  compliancePercentage: number;
} {
  const hasSOC2 = certifications.includes('SOC2');
  const hasISO27001 = certifications.includes('ISO27001');

  const totalPossibleWeight = Object.values(CERTIFICATION_WEIGHTS).reduce((a, b) => a + b, 0);
  const achievedWeight = certifications.reduce(
    (sum, cert) => sum + (CERTIFICATION_WEIGHTS[cert] || 0),
    0
  );

  return {
    hasSOC2,
    hasISO27001,
    isFullyCompliant: hasSOC2 && hasISO27001,
    compliancePercentage: Math.round((achievedWeight / totalPossibleWeight) * 100),
  };
}

export function getDaysSinceDate(dateString: string | null): number | null {
  if (!dateString) return null;

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
