'use client';

import { Header } from '@/components/layout';
import { StatCard, RiskBadge } from '@/components/dashboard';
import { VendorTable } from '@/components/vendors';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockVendors, getMockVendorSummary } from '@/lib/mock-data';
import {
  Building2,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Clock,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const summary = getMockVendorSummary();
  const highRiskVendors = mockVendors.filter((v) => v.riskLevel === 'High');
  const recentVendors = mockVendors.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Dashboard"
        subtitle="Monitor and manage vendor risk assessments"
      />

      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Vendors"
            value={summary.totalVendors}
            subtitle="Active vendor relationships"
            icon={Building2}
            variant="default"
          />
          <StatCard
            title="High Risk"
            value={summary.highRiskCount}
            subtitle="Require immediate attention"
            icon={ShieldAlert}
            variant="danger"
          />
          <StatCard
            title="Pending Assessments"
            value={summary.pendingAssessments}
            subtitle={`${summary.overdueAssessments} overdue`}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Avg Security Score"
            value={summary.averageSecurityScore}
            subtitle="Across all vendors"
            icon={TrendingUp}
            variant={summary.averageSecurityScore >= 70 ? 'success' : 'warning'}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Risk Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-sm text-muted-foreground">
                      High Risk
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-red-500 transition-all"
                        style={{
                          width: `${(summary.highRiskCount / summary.totalVendors) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">
                      {summary.highRiskCount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="text-sm text-muted-foreground">
                      Medium Risk
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-amber-500 transition-all"
                        style={{
                          width: `${(summary.mediumRiskCount / summary.totalVendors) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">
                      {summary.mediumRiskCount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-sm text-muted-foreground">
                      Low Risk
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all"
                        style={{
                          width: `${(summary.lowRiskCount / summary.totalVendors) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">
                      {summary.lowRiskCount}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                High Risk Vendors
              </CardTitle>
            </CardHeader>
            <CardContent>
              {highRiskVendors.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <ShieldCheck className="h-12 w-12 text-emerald-500 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No high-risk vendors detected
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {highRiskVendors.map((vendor) => (
                    <div
                      key={vendor.id}
                      className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 p-3"
                    >
                      <div>
                        <p className="font-medium text-sm">{vendor.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Score: {vendor.securityScore}/100
                        </p>
                      </div>
                      <RiskBadge level="High" size="sm" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Recent Vendors
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/vendors" className="flex items-center gap-1">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <VendorTable vendors={recentVendors} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
