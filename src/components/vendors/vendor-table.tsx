'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RiskBadge } from '@/components/dashboard/risk-badge';
import { ComplianceBadges } from '@/components/dashboard/compliance-badges';
import { SecurityScore } from '@/components/dashboard/security-score';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Vendor, AssessmentStatus } from '@/types/vendor';
import { ExternalLink, MoreHorizontal } from 'lucide-react';

interface VendorTableProps {
  vendors: Vendor[];
  onVendorClick?: (vendor: Vendor) => void;
}

const statusStyles: Record<AssessmentStatus, string> = {
  Completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'In Progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Overdue: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export function VendorTable({ vendors, onVendorClick }: VendorTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[200px]">Vendor Name</TableHead>
            <TableHead>Service Type</TableHead>
            <TableHead className="w-[160px]">Security Score</TableHead>
            <TableHead>Compliance</TableHead>
            <TableHead className="w-[120px]">Risk Level</TableHead>
            <TableHead>Assessment</TableHead>
            <TableHead className="w-[80px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow
              key={vendor.id}
              className={cn(
                'cursor-pointer transition-colors',
                vendor.riskLevel === 'High' && 'bg-red-500/5'
              )}
              onClick={() => onVendorClick?.(vendor)}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span>{vendor.name}</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {vendor.serviceType}
              </TableCell>
              <TableCell>
                <SecurityScore score={vendor.securityScore} size="sm" />
              </TableCell>
              <TableCell>
                <ComplianceBadges
                  certifications={vendor.complianceCertifications}
                  maxDisplay={2}
                />
              </TableCell>
              <TableCell>
                <RiskBadge level={vendor.riskLevel} size="sm" />
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    'text-xs font-medium border',
                    statusStyles[vendor.assessmentStatus]
                  )}
                >
                  {vendor.assessmentStatus}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
