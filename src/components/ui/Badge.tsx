import React from "react";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "light"
  | "dark";

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "primary",
  className = ""
}) => {
  return (
    <span className={`badge bg-${variant} ${className}`}>
      {label}
    </span>
  );
};

export default Badge;