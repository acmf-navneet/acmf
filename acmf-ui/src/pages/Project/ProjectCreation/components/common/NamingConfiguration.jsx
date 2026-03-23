import React from "react";
import { Field } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormikErrorMessage from "../FormikErrorMessage";

/**
 * NamingConfiguration
 * 
 * This component flexibly renders naming fields for either a root directory (microservice)
 * or for a service (baseName + packageName), or both, depending on the props.
 * 
 * If showRootDirectory is true, only the root directory field is shown.
 * If showRootDirectory is false, only baseName and packageName are shown.
 */
const NamingConfiguration = ({
  title = "Naming Configuration",
  showRootDirectory = false,
  fieldPrefix = "",
}) => {
  const getFieldName = (fieldName) => fieldPrefix ? `${fieldPrefix}.${fieldName}` : fieldName;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-600">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showRootDirectory ? (
          <div className="space-y-2">
            <Label htmlFor={getFieldName("rootDirectoryName")}>
              Root Directory Name <span className="text-red-500">*</span>
            </Label>
            <Field name={getFieldName("rootDirectoryName")}>
              {({ field, meta }) => (
                <>
                  <Input
                    {...field}
                    id={getFieldName("rootDirectoryName")}
                    placeholder="e.g., ecommerce-system, inventory-system"
                    className={meta.touched && meta.error ? "border-red-500" : ""}
                  />
                  <FormikErrorMessage name={getFieldName("rootDirectoryName")} />
                </>
              )}
            </Field>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor={getFieldName("baseName")}>
                Base Name <span className="text-red-500">*</span>
              </Label>
              <Field name={getFieldName("baseName")}>
                {({ field, meta }) => (
                  <>
                    <Input
                      {...field}
                      id={getFieldName("baseName")}
                      placeholder="Base Name"
                      className={meta.touched && meta.error ? "border-red-500" : ""}
                    />
                    <FormikErrorMessage name={getFieldName("baseName")} />
                  </>
                )}
              </Field>
            </div>
            <div className="space-y-2">
              <Label htmlFor={getFieldName("packageName")}>
                Package Name <span className="text-red-500">*</span>
              </Label>
              <Field name={getFieldName("packageName")}>
                {({ field, meta }) => (
                  <>
                    <Input
                      {...field}
                      id={getFieldName("packageName")}
                      placeholder="Package Name (e.g., com.example.service)"
                      className={meta.touched && meta.error ? "border-red-500" : ""}
                    />
                    <FormikErrorMessage name={getFieldName("packageName")} />
                  </>
                )}
              </Field>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NamingConfiguration;