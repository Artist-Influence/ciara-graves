import { cn } from "@/lib/utils";

interface SystemLabelProps {
  index?: string;
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export const SystemLabel = ({ index, children, className, accent = false }: SystemLabelProps) => (
  <div
    className={cn(
      "font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] flex items-center gap-3",
      accent ? "text-signal" : "text-mute",
      className
    )}
  >
    <span className="inline-block h-px w-8 bg-current opacity-50" />
    {index && <span>// {index}</span>}
    <span className="text-ink/80">— {children}</span>
  </div>
);

export default SystemLabel;
