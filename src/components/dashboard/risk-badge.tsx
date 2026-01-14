'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RiskLevel } from '@/types/vendor';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const riskStyles: Record<RiskLevel, string> = {
  High: 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20',
  Medium: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20',
  Low: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
  lg: 'text-base px-3 py-1',
};

const dotStyles: Record<RiskLevel, string> = {
  High: 'bg-red-500',
  Medium: 'bg-amber-500',
  Low: 'bg-emerald-500',
};

export function RiskBadge({ level, showIcon = true, size = 'md' }: RiskBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium border',
        riskStyles[level],
        sizeStyles[size]
      )}
    >
      {showIcon && (
        <span
          className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', dotStyles[level])}
        />
      )}
      {level} Risk
    </Badge>
  );
}
