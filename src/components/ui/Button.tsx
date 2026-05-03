type ButtonVariant = "primary" | "secondary" | "success";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: ButtonVariant;
}

export function Button({
  label,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {label || children}
    </button>
  );
}