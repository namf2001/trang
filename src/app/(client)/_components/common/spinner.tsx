type SpinnerProps = Readonly<{
  size?: string; // Tailwind size classes e.g., 'w-12 h-12'
  thickness?: string; // Tailwind border width e.g., 'border-4'
  colorClass?: string; // Tailwind border color e.g., 'border-orange-500'
  className?: string;
  ariaLabel?: string;
}>;

export default function Spinner(props: SpinnerProps) {
  const {
    size = 'w-12 h-12',
    thickness = 'border-4',
    colorClass = 'border-orange-500',
    className = '',
    ariaLabel = 'Loading',
  } = props;

  return (
    <output
      aria-label={ariaLabel}
      aria-live="polite"
      className={`${size} rounded-full ${thickness} ${colorClass} border-t-transparent border-b-transparent animate-spin ${className}`}
    />
  );
}
