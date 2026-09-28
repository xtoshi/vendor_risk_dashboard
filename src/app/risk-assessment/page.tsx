'use client';

import { useMemo } from 'react';
import { Header } from '@/components/layout';
import { StatCard } from '@/components/dashboard/stat-card';
import { RiskBadge } from '@/components/dashboard/risk-badge';
import { SecurityScore } from '@/components/dashboard/security-score';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockVendors } from '@/lib/mock-data';
import {
  calculateRiskLevel,
  getDaysSinceDate,
} from '@/lib/risk-calculator';
import { AlertTriangle, ShieldAlert, ShieldCheck, Activity } from 'lucide-react';

export default function RiskAssessmentPage() {
  const assessments = useMemo(
    () =>
      mockVendors.map((vendor) => {
        const result = calculateRiskLevel({
          securityScore: vendor.securityScore,
          complianceCertifications: vendor.complianceCertifications,
          daysSinceLastAssessment: getDaysSinceDate(vendor.lastAssessmentDate),
        });
        return { vendor, ...result };
      }),
    []
  );

  const highCount = assessments.filter((a) => a.riskLevel === 'High').length;
  const mediumCount = assessments.filter((a) => a.riskLevel === 'Medium').length;
  const lowCount = assessments.filter((a) => a.riskLevel === 'Low').length;
  const avgScore =
    Math.round(
      (assessments.reduce((sum, a) => sum + a.riskScore, 0) /
        assessments.length) *
        10
    ) / 10;

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Risk Assessment"
        subtitle="Calculated vendor risk based on security score, compliance, and assessment recency"
      />

      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="High Risk"
            value={highCount}
            subtitle="Require immediate action"
            icon={ShieldAlert}
            variant="danger"
          />
          <StatCard
            title="Medium Risk"
            value={mediumCount}
            subtitle="Monitor closely"
            icon={AlertTriangle}
            variant="warning"
          />
          <StatCard
            title="Low Risk"
            value={lowCount}
            subtitle="Within acceptable limits"
            icon={ShieldCheck}
            variant="success"
          />
          <StatCard
            title="Avg Risk Score"
            value={avgScore}
            subtitle="Across all vendors"
            icon={Activity}
            variant={avgScore >= 60 ? 'danger' : 'warning'}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Vendor Risk Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {assessments.map(({ vendor, riskLevel, riskScore, riskFactors }) => (
                <div key={vendor.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{vendor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {vendor.serviceType}
                      </p>
                    </div>
                    <div className="w-40 shrink-0">
                      <SecurityScore score={vendor.securityScore} size="sm" />
                    </div>
                    <div className="flex w-28 shrink-0 items-center justify-between">
                      <span className="text-sm text-muted-foreground">Risk</span>
                      <span className="text-sm font-semibold tabular-nums">
                        {riskScore}
                      </span>
                    </div>
                    <RiskBadge level={riskLevel} size="sm" />
                  </div>
                  {riskFactors.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {riskFactors.map((factor) => (
                        <Badge
                          key={factor}
                          variant="outline"
                          className="text-xs font-normal border-red-500/20 bg-red-500/5 text-red-500"
                        >
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
