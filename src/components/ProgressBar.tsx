interface ProgressBarProps {
  value: number;
  label?: string;
  muted?: boolean;
}

export function ProgressBar({ value, label = "Progress", muted = false }: ProgressBarProps) {
  return (
    <div aria-label={`${label}: ${value}%`} className="space-y-2">
      <div className={`h-2 overflow-hidden rounded-full ${muted ? "bg-[#e8ebe5]" : "bg-[#e7ece7]"}`}>
        <div
          className="h-full rounded-full bg-[#2b6b4f] transition-[width] duration-500"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
