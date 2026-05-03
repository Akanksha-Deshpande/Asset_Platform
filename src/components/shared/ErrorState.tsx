import React from 'react';

interface ErrorStateProps {
  message: string;  // The error message to be displayed
  onRetry?: () => void;  // Optional retry action (e.g., retry a failed API request)
  buttonText?: string;  // Optional text for retry button, defaults to "Retry"
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  buttonText = 'Retry',
}) => {
  return (
    <div className="error-state text-center py-5">
      <div className="alert alert-danger">
        <strong>Error: </strong>{message}
      </div>

      {/* Only show retry button if onRetry is passed */}
      {onRetry && (
        <button
          className="btn btn-warning"
          onClick={onRetry}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default ErrorState;