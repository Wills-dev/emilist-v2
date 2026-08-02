const ChartLegend = ({ color, label }: { color: string; label: string }) => (
  <p className="flex items-center gap-2">
    <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
    {label}
  </p>
);

export default ChartLegend;
