'use client';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { ComplianceCertification } from '@/types/vendor';

interface ComplianceBadgesProps {
  certifications: ComplianceCertification[];
  showAll?: boolean;
  maxDisplay?: number;
}

const certificationInfo: Record<
  ComplianceCertification,
  { label: string; description: string; color: string }
> = {
  SOC2: {
    label: 'SOC2',
    description: 'Service Organization Control 2 - Security, availability, and confidentiality',
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  ISO27001: {
    label: 'ISO27001',
    description: 'Information Security Management System standard',
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
  GDPR: {
    label: 'GDPR',
    description: 'General Data Protection Regulation compliance',
    color: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
  },
  HIPAA: {
    label: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act compliance',
    color: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  },
  'PCI-DSS': {
    label: 'PCI-DSS',
    description: 'Payment Card Industry Data Security Standard',
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  },
};

export function ComplianceBadges({
  certifications,
  showAll = false,
  maxDisplay = 2,
}: ComplianceBadgesProps) {
  if (certifications.length === 0) {
    return (
      <span className="text-sm text-muted-foreground italic">
        No certifications
      </span>
    );
  }

  const displayCerts = showAll
    ? certifications
    : certifications.slice(0, maxDisplay);
  const remainingCount = certifications.length - displayCerts.length;

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1">
        {displayCerts.map((cert) => {
          const info = certificationInfo[cert];
          return (
            <Tooltip key={cert}>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className={cn('text-xs font-medium border cursor-help', info.color)}
                >
                  {info.label}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{info.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className="text-xs font-medium cursor-help"
              >
                +{remainingCount}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                {certifications.slice(maxDisplay).map((cert) => (
                  <p key={cert} className="text-sm">
                    {certificationInfo[cert].label}
                  </p>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
