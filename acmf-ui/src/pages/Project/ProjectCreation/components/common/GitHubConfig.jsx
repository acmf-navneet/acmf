import React from "react";
import { Field } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormikErrorMessage from "../FormikErrorMessage";

const GitHubConfig = ({ title = "GitHub Configuration", fieldPrefix = "" }) => {
  const getFieldName = (fieldName) => fieldPrefix ? `${fieldPrefix}.${fieldName}` : fieldName;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-600">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={getFieldName("githubUsername")}>
              GitHub Username <span className="text-red-500">*</span>
            </Label>
            <Field name={getFieldName("githubUsername")}>
              {({ field, meta }) => (
                <>
                  <Input
                    {...field}
                    id={getFieldName("githubUsername")}
                    placeholder="GitHub Username"
                    className={meta.touched && meta.error ? "border-red-500" : ""}
                  />
                  <FormikErrorMessage name={getFieldName("githubUsername")} />
                </>
              )}
            </Field>
          </div>
          <div className="space-y-2">
            <Label htmlFor={getFieldName("githubOrganization")}>GitHub Organization</Label>
            <Field name={getFieldName("githubOrganization")}>
              {({ field, meta }) => (
                <>
                  <Input
                    {...field}
                    id={getFieldName("githubOrganization")}
                    placeholder="GitHub Organization"
                    className={meta.touched && meta.error ? "border-red-500" : ""}
                  />
                  <FormikErrorMessage name={getFieldName("githubOrganization")} />
                </>
              )}
            </Field>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={getFieldName("githubToken")}>
            GitHub Token <span className="text-red-500">*</span>
          </Label>
          <Field name={getFieldName("githubToken")}>
            {({ field, meta }) => (
              <>
                <Input
                  {...field}
                  id={getFieldName("githubToken")}
                  type="password"
                  placeholder="GitHub Token"
                  className={meta.touched && meta.error ? "border-red-500" : ""}
                />
                <FormikErrorMessage name={getFieldName("githubToken")} />
              </>
            )}
          </Field>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubConfig; 