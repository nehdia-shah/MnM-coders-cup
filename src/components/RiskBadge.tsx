import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  risk: "low" | "medium" | "high";
  className?: string;
}

export function RiskBadge({ risk, className }: RiskBadgeProps) {
  const variants = {
    low: "bg-success/10 text-success hover:bg-success/20",
    medium: "bg-warning/10 text-warning hover:bg-warning/20",
    high: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  };

  return (
    <Badge variant="secondary" className={cn(variants[risk], className)}>
      {risk.toUpperCase()}
    </Badge>
  );
}
