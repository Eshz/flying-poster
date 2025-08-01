
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ContentVisibilityWarningProps {
  isVisible: boolean;
  warnings: string[];
}

const ContentVisibilityWarning: React.FC<ContentVisibilityWarningProps> = ({
  isVisible,
  warnings
}) => {
  if (isVisible) return null;

  return (
    <div className="mb-4 w-full max-w-2xl flex-shrink-0">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Content Visibility Warning:</strong>
          <ul className="mt-2 space-y-1">
            {warnings.map((warning, index) => (
              <li key={index} className="text-sm">• {warning}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm">
            Consider reducing content length, hiding some images, or switching to a different layout.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ContentVisibilityWarning;
