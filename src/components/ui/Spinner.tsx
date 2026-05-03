type SpinnerVariant = "primary" | "secondary" | "success";
type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
}

export function Spinner({
  variant = "secondary",
  size = "md",
}: SpinnerProps) {
  const sizeClass =
    size === "sm" ? "spinner-border-sm" : size === "md" ? "spinner-border" : "spinner-border-lg";

  return (
    <div
      className={`spinner-border text-${variant} ${sizeClass}`}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}