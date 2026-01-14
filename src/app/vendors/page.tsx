'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout';
import { VendorTable } from '@/components/vendors';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockVendors, getMockVendorSummary } from '@/lib/mock-data';
import type { Vendor, RiskLevel } from '@/types/vendor';
import {
  Plus,
  Filter,
  Download,
  Search,
  X,
} from 'lucide-react';

type RiskFilter = RiskLevel | 'All';

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('All');
  const summary = getMockVendorSummary();

  const filteredVendors = useMemo(() => {
    return mockVendors.filter((vendor) => {
      const matchesSearch =
        searchQuery === '' ||
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.serviceType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk =
        riskFilter === 'All' || vendor.riskLevel === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [searchQuery, riskFilter]);

  const handleVendorClick = (vendor: Vendor) => {
    console.log('Vendor clicked:', vendor);
  };

  const riskFilters: { label: string; value: RiskFilter; count: number }[] = [
    { label: 'All', value: 'All', count: summary.totalVendors },
    { label: 'High Risk', value: 'High', count: summary.highRiskCount },
    { label: 'Medium Risk', value: 'Medium', count: summary.mediumRiskCount },
    { label: 'Low Risk', value: 'Low', count: summary.lowRiskCount },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Vendors"
        subtitle={`${summary.totalVendors} vendors in your organization`}
      />

      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {riskFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={riskFilter === filter.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRiskFilter(filter.value)}
                  className="gap-1.5"
                >
                  {filter.label}
                  <Badge
                    variant="secondary"
                    className="ml-1 h-5 min-w-[20px] px-1.5 text-xs"
                  >
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Vendor
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                All Vendors
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                Showing {filteredVendors.length} of {summary.totalVendors} vendors
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredVendors.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium">No vendors found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setRiskFilter('All');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <VendorTable
                vendors={filteredVendors}
                onVendorClick={handleVendorClick}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
