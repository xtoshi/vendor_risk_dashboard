'use client';

import { useMemo } from 'react';
import { Header } from '@/components/layout';
import { StatCard } from '@/components/dashboard/stat-card';
import { ComplianceBadges } from '@/components/dashboard/compliance-badges';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockVendors } from '@/lib/mock-data';
import { getComplianceStatus } from '@/lib/risk-calculator';
import { FileCheck, ShieldCheck, ShieldX, Gauge } from 'lucide-react';

export default function CompliancePage() {
  const rows = useMemo(
    () =>
      mockVendors.map((vendor) => ({
        vendor,
        status: getComplianceStatus(vendor.complianceCertifications),
      })),
    []
  );

  const fullyCompliant = rows.filter((r) => r.status.isFullyCompliant).length;
  const missingSoc2 = rows.filter((r) => !r.status.hasSOC2).length;
  const missingIso = rows.filter((r) => !r.status.hasISO27001).length;
  const avgCoverage =
    Math.round(
      (rows.reduce((sum, r) => sum + r.status.compliancePercentage, 0) /
        rows.length) *
        10
    ) / 10;

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Compliance"
        subtitle="Certification coverage across your vendor portfolio"
      />

      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Fully Compliant"
            value={fullyCompliant}
            subtitle="SOC2 + ISO27001"
            icon={ShieldCheck}
            variant="success"
          />
          <StatCard
            title="Missing SOC2"
            value={missingSoc2}
            subtitle="Required certification"
            icon={ShieldX}
            variant="danger"
          />
          <StatCard
            title="Missing ISO27001"
            value={missingIso}
            subtitle="Required certification"
            icon={ShieldX}
            variant="danger"
          />
          <StatCard
            title="Avg Coverage"
            value={`${avgCoverage}%`}
            subtitle="Weighted compliance"
            icon={Gauge}
            variant={avgCoverage >= 70 ? 'success' : 'warning'}
          />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Vendor Compliance Matrix
            </CardTitle>
            <Button variant="outline" size="sm">
              <FileCheck className="h-4 w-4" />
              Export Report
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b text-left text-muted-foreground">
                  <tr>
                    <th className="h-10 px-4 font-medium">Vendor</th>
                    <th className="h-10 px-4 font-medium">Certifications</th>
                    <th className="h-10 px-4 font-medium">SOC2</th>
                    <th className="h-10 px-4 font-medium">ISO27001</th>
                    <th className="h-10 px-4 text-right font-medium">Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ vendor, status }) => (
                    <tr key={vendor.id} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium">{vendor.name}</td>
                      <td className="px-4 py-3">
                        <ComplianceBadges
                          certifications={vendor.complianceCertifications}
                          maxDisplay={3}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <CertPill present={status.hasSOC2} />
                      </td>
                      <td className="px-4 py-3">
                        <CertPill present={status.hasISO27001} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${status.compliancePercentage}%` }}
                            />
                          </div>
                          <span className="font-medium tabular-nums w-10 text-right">
                            {status.compliancePercentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CertPill({ present }: { present: boolean }) {
  return present ? (
    <Badge
      variant="outline"
      className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
    >
      Verified
    </Badge>
  ) : (
    <Badge
      variant="outline"
      className="border-red-500/20 bg-red-500/10 text-red-500"
    >
      Missing
    </Badge>
  );
}
