const ChartCard = ({ title, subtitle, children, className = "" }) => {
  return (
    <div className={`glass-card p-5 animate-fade-in ${className}`}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-surface-100">{title}</h3>
        {subtitle && (
          <p className="text-xs text-surface-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ChartCard;
