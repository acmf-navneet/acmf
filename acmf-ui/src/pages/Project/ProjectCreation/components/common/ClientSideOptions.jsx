import React from "react";
import { Field, useFormikContext } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormikErrorMessage from "../FormikErrorMessage";

const ClientSideOptions = ({ 
  title = "Client Side Options",
  fieldPrefix = "",
  isMicroservice = false
}) => {
  const { setFieldValue } = useFormikContext();
  const getFieldName = (fieldName) => fieldPrefix ? `${fieldPrefix}.${fieldName}` : fieldName;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-600">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Client Framework</Label>
            <Field name={getFieldName("clientFramework")}>
              {({ field, meta }) => (
                <>
                  <Select 
                    value={field.value || (isMicroservice ? "no" : "react")} 
                    onValueChange={(value) => setFieldValue(getFieldName('clientFramework'), value)}
                  >
                    <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {isMicroservice && <SelectItem value="no">No</SelectItem>}
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormikErrorMessage name={getFieldName("clientFramework")} />
                </>
              )}
            </Field>
          </div>
          <div className="space-y-2">
            <Label>Package Manager</Label>
            <Field name={getFieldName("clientPackageManager")}>
              {({ field, meta }) => (
                <>
                  <Select 
                    value={field.value || "npm"} 
                    onValueChange={(value) => setFieldValue(getFieldName('clientPackageManager'), value)}
                  >
                    <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="npm">npm</SelectItem>
                      <SelectItem value="yarn">Yarn</SelectItem>
                      <SelectItem value="pnpm">pnpm</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormikErrorMessage name={getFieldName("clientPackageManager")} />
                </>
              )}
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Test Framework</Label>
            <Field name={getFieldName("testFrameworks")}>
              {({ field, meta }) => (
                <>
                  <Select 
                    value={Array.isArray(field.value) ? field.value[0] : field.value || (isMicroservice ? "cucumber" : "cypress")} 
                    onValueChange={(value) => setFieldValue(getFieldName('testFrameworks'), [value])}
                  >
                    <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {!isMicroservice && <SelectItem value="cypress">Cypress</SelectItem>}
                      <SelectItem value="gatling">Gatling</SelectItem>
                      <SelectItem value="cucumber">Cucumber</SelectItem>
                      <SelectItem value="protractor">Protractor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormikErrorMessage name={getFieldName("testFrameworks")} />
                </>
              )}
            </Field>
          </div>
          <div className="space-y-2">
            <Label>Admin UI</Label>
            <Field name={getFieldName("withAdminUi")}>
              {({ field, meta }) => (
                <>
                  <Select 
                    value={field.value || "false"} 
                    onValueChange={(value) => setFieldValue(getFieldName('withAdminUi'), value)}
                  >
                    <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormikErrorMessage name={getFieldName("withAdminUi")} />
                </>
              )}
            </Field>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientSideOptions; 