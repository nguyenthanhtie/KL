const ProgressBar = ({ 
  progress, 
  className = '', 
  color = 'primary',
  size = 'md',
  showLabel = false,
  labelPosition = 'right',
  animated = true,
  striped = false
}) => {
  const colors = {
    primary: 'from-blue-500 to-purple-600',
    success: 'from-green-500 to-emerald-600',
    warning: 'from-amber-500 to-orange-600',
    danger: 'from-red-500 to-rose-600',
    info: 'from-cyan-500 to-blue-600'
  };

  const sizes = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-5'
  };

  const labelSizes = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const progressValue = Math.min(100, Math.max(0, progress));

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && labelPosition === 'left' && (
        <span className={`${labelSizes[size]} font-medium text-gray-600 min-w-[3rem] text-right`}>
          {Math.round(progressValue)}%
        </span>
      )}
      
      <div className={`flex-1 bg-gray-100 rounded-full ${sizes[size]} overflow-hidden relative`}>
        <div 
          className={`
            h-full bg-gradient-to-r ${colors[color]} rounded-full
            ${animated ? 'transition-all duration-700 ease-out' : ''}
            ${striped ? 'progress-striped' : ''}
          `.trim()}
          style={{ width: `${progressValue}%` }}
        >
          {/* Shimmer effect */}
          {animated && progressValue > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          )}
        </div>
      </div>

      {showLabel && labelPosition === 'right' && (
        <span className={`${labelSizes[size]} font-medium text-gray-600 min-w-[3rem]`}>
          {Math.round(progressValue)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
