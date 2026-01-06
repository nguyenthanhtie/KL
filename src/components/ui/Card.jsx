const Card = ({ 
  children, 
  className = '', 
  onClick, 
  hover = false,
  variant = 'default',
  padding = 'md',
  gradient,
  glow = false
}) => {
  const baseStyles = 'bg-white rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'shadow-sm border border-gray-100 hover:shadow-md',
    elevated: 'shadow-lg hover:shadow-xl',
    outlined: 'border-2 border-gray-200 hover:border-gray-300',
    flat: 'bg-gray-50',
    glass: 'bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverStyles = hover 
    ? 'cursor-pointer hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]' 
    : '';

  const glowStyles = glow && gradient
    ? `relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r ${gradient} before:opacity-0 hover:before:opacity-10 before:transition-opacity before:duration-300`
    : '';

  return (
    <div 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${paddings[padding]}
        ${hoverStyles}
        ${glowStyles}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      onClick={onClick}
    >
      {gradient && (
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradient} rounded-t-2xl`} />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Card Header sub-component
Card.Header = ({ children, className = '', gradient }) => (
  <div className={`
    -mx-6 -mt-6 px-6 py-4 mb-6 border-b border-gray-100 rounded-t-2xl
    ${gradient ? `bg-gradient-to-r ${gradient} text-white` : 'bg-gray-50'}
    ${className}
  `.trim()}>
    {children}
  </div>
);

// Card Body sub-component  
Card.Body = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

// Card Footer sub-component
Card.Footer = ({ children, className = '' }) => (
  <div className={`-mx-6 -mb-6 px-6 py-4 mt-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl ${className}`}>
    {children}
  </div>
);

export default Card;
