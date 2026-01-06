import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick, 
  type = 'button',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 
    font-semibold rounded-xl
    transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
  `;
  
  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-500 to-purple-600 
      text-white 
      hover:from-blue-600 hover:to-purple-700 
      hover:shadow-lg hover:shadow-purple-500/25
      focus:ring-purple-500
    `,
    secondary: `
      bg-gray-100 
      text-gray-700 
      hover:bg-gray-200 
      focus:ring-gray-400
    `,
    success: `
      bg-gradient-to-r from-green-500 to-emerald-600 
      text-white 
      hover:from-green-600 hover:to-emerald-700 
      hover:shadow-lg hover:shadow-green-500/25
      focus:ring-green-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-rose-600 
      text-white 
      hover:from-red-600 hover:to-rose-700 
      hover:shadow-lg hover:shadow-red-500/25
      focus:ring-red-500
    `,
    warning: `
      bg-gradient-to-r from-amber-500 to-orange-600 
      text-white 
      hover:from-amber-600 hover:to-orange-700 
      hover:shadow-lg hover:shadow-orange-500/25
      focus:ring-orange-500
    `,
    outline: `
      border-2 border-gray-200 
      text-gray-700 
      hover:border-gray-300 hover:bg-gray-50
      focus:ring-gray-400
    `,
    ghost: `
      text-gray-600 
      hover:bg-gray-100 hover:text-gray-900
      focus:ring-gray-400
    `,
    link: `
      text-blue-600 
      hover:text-blue-700 hover:underline
      focus:ring-blue-500
      p-0
    `
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const buttonClasses = `
    ${baseStyles} 
    ${sizes[size]} 
    ${variants[variant]} 
    ${fullWidth ? 'w-full' : ''} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const iconClass = iconSizes[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...props}
    >
      {loading && (
        <Loader2 className={`${iconClass} animate-spin`} />
      )}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={iconClass} />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={iconClass} />
      )}
    </button>
  );
};

export default Button;
