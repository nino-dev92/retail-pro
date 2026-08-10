type SummaryCardProps = {
  title: string;
  value: string | number;
  description?: string;
};

export default function SummaryCard({
  title,
  value,
  description,
}: SummaryCardProps) {
  return (
    <div className="bg-surface dark:bg-primary border border-outline-variant rounded-lg p-5 flex-col justify-items-center cursor-pointer hover:scale-101 hover:bg-slate-400 dark:hover:bg-slate-500 hover:text-surface transition-all duration-400">
      <p className="text-md font-bold text-on-surface-variant dark:text-surface">
        {title}
      </p>

      <p className="text-2xl font-bold text-primary dark:text-surface mt-2">
        {value}
      </p>

      {description && (
        <p className="text-xs text-on-surface-variant dark:text-surface mt-1">
          {description}
        </p>
      )}
    </div>
  );
}
