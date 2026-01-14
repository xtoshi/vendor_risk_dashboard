'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SecurityScoreProps {
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-500';
  if (score >= 60) return 'text-amber-500';
  return 'text-red-500';
}

function getProgressColor(score: number): string {
  if (score >= 80) return '[&>div]:bg-emerald-500';
  if (score >= 60) return '[&>div]:bg-amber-500';
  return '[&>div]:bg-red-500';
}

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function SecurityScore({
  score,
  showLabel = true,
  size = 'md',
}: SecurityScoreProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 min-w-[60px]">
        <Progress
          value={score}
          className={cn('h-2 bg-muted', getProgressColor(score))}
        />
      </div>
      <span
        className={cn('font-semibold tabular-nums', sizeStyles[size], getScoreColor(score))}
      >
        {score}
        {showLabel && <span className="text-muted-foreground font-normal">/100</span>}
      </span>
    </div>
  );
}
