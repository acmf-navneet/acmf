import React from "react";
import { Field, useFormikContext } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormikErrorMessage from "../FormikErrorMessage";

const ServerSideOptions = ({ 
  title = "Server Side Options",
  fieldPrefix = "",
  databaseOptions = {
    sql: {
      prod: ["mysql", "mssql", "postgresql"],
      dev: ["h2disk", "h2memory", "mysql", "mssql", "postgresql"],
    },
    mongodb: {
      prod: ["mongodb"],
      dev: ["mongodb"],
    },
    cassandra: {
      prod: ["cassandra"],
      dev: ["cassandra"],
    },
    neo4j: {
      prod: ["neo4j"],
      dev: ["neo4j"],
    },
  }
}) => {
  const { values, setFieldValue } = useFormikContext();
  const getFieldName = (fieldName) => fieldPrefix ? `${fieldPrefix}.${fieldName}` : fieldName;
  
  const getFieldValue = (fieldName) => {
    const fullFieldName = getFieldName(fieldName);
    return fullFieldName.split('.').reduce((obj, key) => obj?.[key], values) || "";
  };

  const currentDatabaseType = getFieldValue('databaseType') || 'sql';
  const prodOptions = databaseOptions[currentDatabaseType]?.prod || [];
  const devOptions = databaseOptions[currentDatabaseType]?.dev || [];

  const handleDatabaseTypeChange = (value) => {
    setFieldValue(getFieldName('databaseType'), value);
    // Reset prod/dev database types when database type changes
    const newProdOptions = databaseOptions[value]?.prod || [];
    const newDevOptions = databaseOptions[value]?.dev || [];
    if (newProdOptions.length > 0) {
      setFieldValue(getFieldName('prodDatabaseType'), newProdOptions[0]);
    }
    if (newDevOptions.length > 0) {
      setFieldValue(getFieldName('devDatabaseType'), newDevOptions[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-600">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Build Tool <span className="text-red-500">*</span>
            </Label>
            <Field name={getFieldName("buildTool")}>
              {({ field, meta }) => (
                <>
                  <Select 
                    value={field.value || "maven"} 
                    onValueChange={(value) => setFieldValue(getFieldName('buildTool'), value)}
                  >
                    <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maven">Maven</SelectItem>
                      <SelectItem value="gradle">Gradle</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormikErrorMessage name={getFieldName("buildTool")} />
                </>
              )}
            </Field>
          </div>
          <div className="space-y-2">
            <Label>
              Authentication Type <span className="text-red-500">*</span>
            </Label>
            <Field name={getFieldName("authenticationType")}>
              {({ field, meta }) => (
                <>
                  <Select 
                    value={field.value || "jwt"} 
                    onValueChange={(value) => setFieldValue(getFieldName('authenticationType'), value)}
                  >
                    <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jwt">JWT</SelectItem>
                      <SelectItem value="oauth2">OAuth2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormikErrorMessage name={getFieldName("authenticationType")} />
                </>
              )}
            </Field>
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            Database Type <span className="text-red-500">*</span>
          </Label>
          <Field name={getFieldName("databaseType")}>
            {({ field, meta }) => (
              <>
                <Select 
                  value={field.value || "sql"} 
                  onValueChange={handleDatabaseTypeChange}
                >
                  <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sql">SQL</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                    <SelectItem value="cassandra">Cassandra</SelectItem>
                    <SelectItem value="neo4j">Neo4J</SelectItem>
                  </SelectContent>
                </Select>
                <FormikErrorMessage name={getFieldName("databaseType")} />
              </>
            )}
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Production Database <span className="text-red-500">*</span>
            </Label>
            <Field name={getFieldName("prodDatabaseType")}>
              {({ field, meta }) => (
                <>
                  <Select 
                    value={field.value || (prodOptions[0] || "")} 
                    onValueChange={(value) => setFieldValue(getFieldName('prodDatabaseType'), value)}
                  >
                    <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select Production Database" />
                    </SelectTrigger>
                    <SelectContent>
                      {prodOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormikErrorMessage name={getFieldName("prodDatabaseType")} />
                </>
              )}
            </Field>
          </div>
          <div className="space-y-2">
            <Label>Development Database</Label>
            <Field name={getFieldName("devDatabaseType")}>
              {({ field, meta }) => (
                <>
                  <Select 
                    value={field.value || (devOptions[0] || "")} 
                    onValueChange={(value) => setFieldValue(getFieldName('devDatabaseType'), value)}
                  >
                    <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select Development Database" />
                    </SelectTrigger>
                    <SelectContent>
                      {devOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormikErrorMessage name={getFieldName("devDatabaseType")} />
                </>
              )}
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={getFieldName("serverPort")}>Server Port</Label>
            <Field name={getFieldName("serverPort")}>
              {({ field, meta }) => (
                <>
                  <Input
                    {...field}
                    id={getFieldName("serverPort")}
                    type="number"
                    placeholder="Server Port"
                    className={meta.touched && meta.error ? "border-red-500" : ""}
                  />
                  <FormikErrorMessage name={getFieldName("serverPort")} />
                </>
              )}
            </Field>
          </div>
          <div className="space-y-2">
            <Label>Cache Provider</Label>
            <Field name={getFieldName("cacheProvider")}>
              {({ field, meta }) => (
                <>
                  <Select 
                    value={field.value || "ehcache"} 
                    onValueChange={(value) => setFieldValue(getFieldName('cacheProvider'), value)}
                  >
                    <SelectTrigger className={meta.touched && meta.error ? "border-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ehcache">Ehcache</SelectItem>
                      <SelectItem value="hazelcast">Hazelcast</SelectItem>
                      <SelectItem value="infinispan">Infinispan</SelectItem>
                      <SelectItem value="memcached">Memcached</SelectItem>
                      <SelectItem value="redis">Redis</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormikErrorMessage name={getFieldName("cacheProvider")} />
                </>
              )}
            </Field>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerSideOptions; 