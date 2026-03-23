import React from "react";
import { Field, useFormikContext } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormikErrorMessage from "../FormikErrorMessage";

const AzureConfig = ({ title = "Cloud Configuration", fieldPrefix = "" }) => {
  const { values, setFieldValue } = useFormikContext();
  const getFieldName = (fieldName) => fieldPrefix ? `${fieldPrefix}.${fieldName}` : fieldName;
  
  const getFieldValue = (fieldName) => {
    const fullFieldName = getFieldName(fieldName);
    return fullFieldName.split('.').reduce((obj, key) => obj?.[key], values) || "";
  };

  const handleCloudProviderChange = (value) => {
    setFieldValue(getFieldName('cloudProvider'), value);
    setFieldValue(getFieldName('cloudService'), ""); // Reset cloud service when provider changes
  };

  const currentCloudProvider = getFieldValue('cloudProvider');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-600">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={getFieldName("projectPath")}>
              Project Path <span className="text-red-500">*</span>
            </Label>
            <Field name={getFieldName("projectPath")}>
              {({ field, meta }) => (
                <>
                  <Input
                    {...field}
                    id={getFieldName("projectPath")}
                    placeholder="Project Path"
                    className={meta.touched && meta.error ? "border-red-500" : ""}
                  />
                  <FormikErrorMessage name={getFieldName("projectPath")} />
                </>
              )}
            </Field>
          </div>
          <div className="space-y-2">
            <Label>Cloud Provider</Label>
            <Field name={getFieldName("cloudProvider")}>
              {({ meta }) => (
                <>
                  <Select 
                    value={currentCloudProvider || "aws"} 
                    onValueChange={handleCloudProviderChange}
                  >
                    <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select Cloud Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws">AWS</SelectItem>
                      <SelectItem value="azure">Azure</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormikErrorMessage name={getFieldName("cloudProvider")} />
                </>
              )}
            </Field>
          </div>
        </div>

        {currentCloudProvider && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cloud Service</Label>
              <Field name={getFieldName("cloudService")}>
                {({ field, meta }) => (
                  <>
                    <Select 
                      value={field.value || ""} 
                      onValueChange={(value) => setFieldValue(getFieldName('cloudService'), value)}
                    >
                      <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentCloudProvider === "aws" && (
                          <>
                            <SelectItem value="ec2">EC2</SelectItem>
                            <SelectItem value="eks">EKS</SelectItem>
                          </>
                        )}
                        {currentCloudProvider === "azure" && (
                          <>
                            <SelectItem value="vm">VM</SelectItem>
                            <SelectItem value="aks">AKS</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    <FormikErrorMessage name={getFieldName("cloudService")} />
                  </>
                )}
              </Field>
            </div>
            <div className="space-y-2">
              <Label htmlFor={getFieldName("accountId")}>Account ID</Label>
              <Field name={getFieldName("accountId")}>
                {({ field, meta }) => (
                  <>
                    <Input
                      {...field}
                      id={getFieldName("accountId")}
                      placeholder={`Enter ${(currentCloudProvider || "AWS").toUpperCase()} account ID`}
                      className={meta.touched && meta.error ? "border-red-500" : ""}
                    />
                    <FormikErrorMessage name={getFieldName("accountId")} />
                  </>
                )}
              </Field>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor={getFieldName("region")}>Region</Label>
          <Field name={getFieldName("region")}>
            {({ field, meta }) => (
              <>
                <Input
                  {...field}
                  id={getFieldName("region")}
                  placeholder="Enter region"
                  className={meta.touched && meta.error ? "border-red-500" : ""}
                />
                <FormikErrorMessage name={getFieldName("region")} />
              </>
            )}
          </Field>
        </div>
      </CardContent>
    </Card>
  );
};

export default AzureConfig; 