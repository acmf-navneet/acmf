import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle } from "lucide-react";

const ValidatedSelect = ({
  id,
  name,
  label,
  value,
  onValueChange,
  onOpenChange,
  placeholder,
  required = false,
  error,
  isValid = false,
  className,
  children,
  ...props
}) => {
  const handleValueChange = (newValue) => {
    onValueChange(name, newValue);
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className="relative">
        <Select
          value={value || ""}
          onValueChange={handleValueChange}
          onOpenChange={onOpenChange}
          {...props}
        >
          <SelectTrigger
            className={cn(
              "transition-all duration-200",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              isValid && !error && "border-green-500 focus:border-green-500 focus:ring-green-500",
              className
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {children}
          </SelectContent>
        </Select>
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
        {isValid && !error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
};

export default ValidatedSelect; 