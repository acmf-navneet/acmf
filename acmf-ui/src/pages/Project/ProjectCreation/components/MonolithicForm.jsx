import React, { useState } from "react";
import { useFormikContext } from "formik";
import { generateMonolithicProject } from "@/redux/ProjectGenerator/ProjectGenerator.Action";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GitHubConfig, AzureConfig, ServerSideOptions, ClientSideOptions, NamingConfiguration, MicroserviceOptions } from "./common";
import { PROJECT_TYPES } from "@/constants/projectTypes";

// Build JDL content for entities from structured form data
const buildJdlFromEntities = (entities = []) => {
  if (!entities || entities.length === 0) return "";

  const lines = [];

  entities.forEach((entity) => {
    if (!entity || !entity.name) return;

    lines.push(`entity ${entity.name} {`);

    (entity.fields || []).forEach((field) => {
      if (!field || !field.name || !field.type) return;
      // JHipster manages id field automatically; don't emit it in JDL.
      if (String(field.name).trim().toLowerCase() === "id") return;

      const options = [];
      if (field.required) options.push("required");
      if (field.unique) options.push("unique");
      const optionsPart = options.length ? " " + options.join(" ") : "";

      lines.push(`  ${field.name} ${field.type}${optionsPart}`);
    });

    lines.push("}");
    lines.push("");
  });

  return lines.join("\n");
};

// Build JDL content for relationships from structured form data
const buildJdlFromRelationships = (relationships = []) => {
  if (!relationships || relationships.length === 0) return "";

  // Group by relationship type so we can emit one block per type
  const byType = relationships.reduce((acc, rel) => {
    if (!rel || !rel.type || !rel.fromEntity || !rel.toEntity) return acc;
    if (!acc[rel.type]) acc[rel.type] = [];
    acc[rel.type].push(rel);
    return acc;
  }, {});

  const lines = [];

  Object.keys(byType).forEach((type) => {
    const rels = byType[type];
    if (!rels.length) return;

    lines.push(`relationship ${type} {`);

    rels.forEach((rel) => {
      const leftField = rel.fromField ? `{${rel.fromField}}` : "";
      const rightField = rel.toField ? `{${rel.toField}}` : "";
      lines.push(
        `  ${rel.fromEntity}${leftField} to ${rel.toEntity}${rightField}`
      );
    });

    lines.push("}");
    lines.push("");
  });

  return lines.join("\n");
};

const MonolithicForm = ({ formikProps, onNext, onBack, onPreview }) => {
  const dispatch = useDispatch();
  const { values, errors, isValid, validateForm, setTouched, setFieldValue } = useFormikContext();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusCode, setStatusCode] = useState("");

  const databaseOptions = {
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
  };

  // Validation helper function
  const validateAndMarkTouched = async () => {
    const validationErrors = await validateForm();
    if (Object.keys(validationErrors).length > 0) {
      // Mark all fields as touched to show validation errors
      const touchedFields = {};
      const markTouched = (obj, prefix = '') => {
        Object.keys(obj).forEach(key => {
          const fieldPath = prefix ? `${prefix}.${key}` : key;
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            markTouched(obj[key], fieldPath);
          } else {
            touchedFields[fieldPath] = true;
          }
        });
      };
      markTouched(validationErrors);
      setTouched(touchedFields);
      return false;
    }
    return true;
  };


  const generateJwtSecretKey = () => {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 64; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    
    // Validate form before proceeding
    const isFormValid = await validateAndMarkTouched();
    if (!isFormValid) {
      setStatusCode(400);
      setStatusMessage("Please fix the validation errors before previewing the configuration.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("");
    setStatusCode("");

    try {
      // Build JDL for entities and relationships (if any) from interactive UI
      const entityJdl = buildJdlFromEntities(values.entities);
      const relationshipJdl = buildJdlFromRelationships(values.relationships);
      const jdlContent = [entityJdl, relationshipJdl].filter(Boolean).join("\n");

      // Prepare the API payload with GitHub and Cloud credentials as parameters
      const apiPayload = {
        // GitHub credentials as parameters
        githubUsername: values.githubUsername,
        githubToken: values.githubToken,
        githubOrganization: values.githubOrganization,
        
        // Cloud credentials as parameters
        cloudProvider: values.cloudProvider,
        cloudService: values.cloudService,
        accountId: values.accountId,
        region: values.region,
        
        // Application data
        baseName: values.baseName,
        applicationType: PROJECT_TYPES.MONOLITH,
        authenticationType: values.authenticationType || "jwt",
        packageName: values.packageName,
        databaseType: values.databaseType || "sql",
        prodDatabaseType: values.prodDatabaseType || "postgresql",
        devDatabaseType: values.devDatabaseType || "h2disk",
        buildTool: values.buildTool || "maven",
        clientFramework: values.clientFramework || "no",
        cacheProvider: values.cacheProvider || "ehcache",
        testFrameworks: Array.isArray(values.testFrameworks) ? values.testFrameworks : [values.testFrameworks].filter(Boolean),
        enableHibernateCache: values.enableHibernateCache !== undefined ? values.enableHibernateCache : true,
        jwtSecretKey: generateJwtSecretKey(),
        serviceDiscoveryType: values.serviceDiscoveryType || "no",
        reactive: values.reactive !== undefined ? values.reactive : false,
        nativeLanguage: "en",
        otherLanguages: [],
        enableTranslation: values.enableTranslation !== undefined ? values.enableTranslation : false,
        microfrontend: false,
        websocket: values.websocket || "false",
        clientPackageManager: values.clientPackageManager || "npm",
        clientTheme: [],
        serverPort: parseInt(values.serverPort) || 8080,
        withAdminUi: values.withAdminUi || "false",
        // Generated JDL content for entities/relationships (optional)
        jdlContent,
        // Also keep structured model for preview/debugging
        entities: values.entities || [],
        relationships: values.relationships || []
      };

      onPreview(apiPayload);
    } catch (error) {
      console.error("Preview error:", error);
      setStatusCode(500);
      setStatusMessage("An error occurred while preparing preview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* GitHub Configuration */}
      <GitHubConfig title="GitHub Configuration" />

      {/* Cloud Configuration */}
      <AzureConfig title="Cloud Configuration" />

      {/* Naming Configuration */}
      <NamingConfiguration 
        title="Naming Configuration"
        showRootDirectory={false}
      />

      {/* Server Side Options */}
      <ServerSideOptions 
        title="Server Side Options"
        databaseOptions={databaseOptions}
      />

      {/* Client Side Options */}
      <ClientSideOptions 
        title="Client Side Options"
        isMicroservice={false}
      />

      {/* Entity Configuration (interactive, no JDL scripting) */}
      <Card className="mt-4">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-blue-600">Entities (optional)</p>
              <p className="text-xs text-gray-500">
                Add entities and fields; we will generate the JDL for you automatically.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                const current = Array.isArray(values.entities) ? values.entities : [];
                const nextId = Date.now();
                const updated = [
                  ...current,
                  {
                    id: nextId,
                    name: "",
                    fields: [
                      {
                        id: nextId + 1,
                        name: "",
                        type: "String",
                        required: true,
                        unique: false,
                      },
                    ],
                  },
                ];
                setFieldValue("entities", updated);
              }}
            >
              Add entity
            </Button>
          </div>

          {!values.entities || values.entities.length === 0 ? (
            <p className="text-xs text-gray-400 italic">
              No entities defined yet. Click &quot;Add entity&quot; to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {values.entities.map((entity, entityIndex) => (
                <div
                  key={entity.id ?? entityIndex}
                  className="border rounded-md p-3 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Entity name
                      </label>
                      <input
                        type="text"
                        className="w-full border rounded-md px-2 py-1 text-sm"
                        placeholder="e.g. Customer"
                        value={entity.name || ""}
                        onChange={(e) => {
                          const updated = [...values.entities];
                          updated[entityIndex] = {
                            ...entity,
                            name: e.target.value,
                          };
                          setFieldValue("entities", updated);
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-5"
                      onClick={() => {
                        const updated = values.entities.filter(
                          (_e, idx) => idx !== entityIndex
                        );
                        setFieldValue("entities", updated);
                      }}
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-gray-600">
                        Fields
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const updated = [...values.entities];
                          const fields = Array.isArray(entity.fields)
                            ? entity.fields
                            : [];
                          const fieldId = Date.now();
                          updated[entityIndex] = {
                            ...entity,
                            fields: [
                              ...fields,
                              {
                                id: fieldId,
                                name: "",
                                type: "String",
                                required: true,
                                unique: false,
                              },
                            ],
                          };
                          setFieldValue("entities", updated);
                        }}
                      >
                        Add field
                      </Button>
                    </div>

                    {(!entity.fields || entity.fields.length === 0) && (
                      <p className="text-xs text-gray-400 italic">
                        This entity has no fields yet.
                      </p>
                    )}

                    {entity.fields && entity.fields.length > 0 && (
                      <div className="space-y-2">
                        {entity.fields.map((field, fieldIndex) => (
                          <div
                            key={field.id ?? fieldIndex}
                            className="grid grid-cols-12 gap-2 items-center"
                          >
                            <div className="col-span-4">
                              <input
                                type="text"
                                className="w-full border rounded-md px-2 py-1 text-xs"
                                placeholder="fieldName"
                                value={field.name || ""}
                                onChange={(e) => {
                                  const updatedEntities = [...values.entities];
                                  const updatedFields = [...(entity.fields || [])];
                                  updatedFields[fieldIndex] = {
                                    ...field,
                                    name: e.target.value,
                                  };
                                  updatedEntities[entityIndex] = {
                                    ...entity,
                                    fields: updatedFields,
                                  };
                                  setFieldValue("entities", updatedEntities);
                                }}
                              />
                            </div>
                            <div className="col-span-3">
                              <select
                                className="w-full border rounded-md px-2 py-1 text-xs"
                                value={field.type || "String"}
                                onChange={(e) => {
                                  const updatedEntities = [...values.entities];
                                  const updatedFields = [...(entity.fields || [])];
                                  updatedFields[fieldIndex] = {
                                    ...field,
                                    type: e.target.value,
                                  };
                                  updatedEntities[entityIndex] = {
                                    ...entity,
                                    fields: updatedFields,
                                  };
                                  setFieldValue("entities", updatedEntities);
                                }}
                              >
                                <option value="String">String</option>
                                <option value="Integer">Integer</option>
                                <option value="Long">Long</option>
                                <option value="Float">Float</option>
                                <option value="Double">Double</option>
                                <option value="BigDecimal">BigDecimal</option>
                                <option value="LocalDate">LocalDate</option>
                                <option value="Instant">Instant</option>
                                <option value="ZonedDateTime">ZonedDateTime</option>
                                <option value="Boolean">Boolean</option>
                              </select>
                            </div>
                            <div className="col-span-2 flex items-center gap-1 text-xs">
                              <input
                                id={`required-${entityIndex}-${fieldIndex}`}
                                type="checkbox"
                                className="h-3 w-3"
                                checked={!!field.required}
                                onChange={(e) => {
                                  const updatedEntities = [...values.entities];
                                  const updatedFields = [...(entity.fields || [])];
                                  updatedFields[fieldIndex] = {
                                    ...field,
                                    required: e.target.checked,
                                  };
                                  updatedEntities[entityIndex] = {
                                    ...entity,
                                    fields: updatedFields,
                                  };
                                  setFieldValue("entities", updatedEntities);
                                }}
                              />
                              <label
                                htmlFor={`required-${entityIndex}-${fieldIndex}`}
                                className="text-gray-600"
                              >
                                Required
                              </label>
                            </div>
                            <div className="col-span-2 flex items-center gap-1 text-xs">
                              <input
                                id={`unique-${entityIndex}-${fieldIndex}`}
                                type="checkbox"
                                className="h-3 w-3"
                                checked={!!field.unique}
                                onChange={(e) => {
                                  const updatedEntities = [...values.entities];
                                  const updatedFields = [...(entity.fields || [])];
                                  updatedFields[fieldIndex] = {
                                    ...field,
                                    unique: e.target.checked,
                                  };
                                  updatedEntities[entityIndex] = {
                                    ...entity,
                                    fields: updatedFields,
                                  };
                                  setFieldValue("entities", updatedEntities);
                                }}
                              />
                              <label
                                htmlFor={`unique-${entityIndex}-${fieldIndex}`}
                                className="text-gray-600"
                              >
                                Unique
                              </label>
                            </div>
                            <div className="col-span-1 flex justify-end">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updatedEntities = [...values.entities];
                                  const updatedFields = [...(entity.fields || [])].filter(
                                    (_f, idx) => idx !== fieldIndex
                                  );
                                  updatedEntities[entityIndex] = {
                                    ...entity,
                                    fields: updatedFields,
                                  };
                                  setFieldValue("entities", updatedEntities);
                                }}
                              >
                                ✕
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Relationship Configuration (interactive) */}
      <Card className="mt-4">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-blue-600">Relationships (optional)</p>
              <p className="text-xs text-gray-500">
                Link existing entities together. We will generate the JDL relationships for you automatically.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                const current = Array.isArray(values.relationships) ? values.relationships : [];
                const nextId = Date.now();
                const firstEntity = Array.isArray(values.entities) && values.entities.length > 0
                  ? values.entities[0].name
                  : "";
                const updated = [
                  ...current,
                  {
                    id: nextId,
                    type: "OneToMany",
                    fromEntity: firstEntity,
                    fromField: "",
                    toEntity: "",
                    toField: "",
                  },
                ];
                setFieldValue("relationships", updated);
              }}
            >
              Add relationship
            </Button>
          </div>

          {(!values.relationships || values.relationships.length === 0) ? (
            <p className="text-xs text-gray-400 italic">
              No relationships defined yet. Add at least two entities first, then create relationships between them.
            </p>
          ) : (
            <div className="space-y-3">
              {values.relationships.map((rel, index) => (
                <div
                  key={rel.id ?? index}
                  className="border rounded-md p-3 grid grid-cols-12 gap-2 items-center"
                >
                  {/* Type */}
                  <div className="col-span-3">
                    <label className="block text-xs text-gray-600 mb-1">Type</label>
                    <select
                      className="w-full border rounded-md px-2 py-1 text-xs"
                      value={rel.type || "OneToMany"}
                      onChange={(e) => {
                        const updated = [...(values.relationships || [])];
                        updated[index] = { ...rel, type: e.target.value };
                        setFieldValue("relationships", updated);
                      }}
                    >
                      <option value="OneToMany">One-to-many</option>
                      <option value="ManyToOne">Many-to-one</option>
                      <option value="OneToOne">One-to-one</option>
                      <option value="ManyToMany">Many-to-many</option>
                    </select>
                  </div>

                  {/* From entity */}
                  <div className="col-span-3">
                    <label className="block text-xs text-gray-600 mb-1">From entity</label>
                    <select
                      className="w-full border rounded-md px-2 py-1 text-xs"
                      value={rel.fromEntity || ""}
                      onChange={(e) => {
                        const updated = [...(values.relationships || [])];
                        updated[index] = { ...rel, fromEntity: e.target.value };
                        setFieldValue("relationships", updated);
                      }}
                    >
                      <option value="">Select</option>
                      {(values.entities || [])
                        .filter((e) => e && e.name)
                        .map((e) => (
                          <option key={e.name} value={e.name}>
                            {e.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* To entity */}
                  <div className="col-span-3">
                    <label className="block text-xs text-gray-600 mb-1">To entity</label>
                    <select
                      className="w-full border rounded-md px-2 py-1 text-xs"
                      value={rel.toEntity || ""}
                      onChange={(e) => {
                        const updated = [...(values.relationships || [])];
                        updated[index] = { ...rel, toEntity: e.target.value };
                        setFieldValue("relationships", updated);
                      }}
                    >
                      <option value="">Select</option>
                      {(values.entities || [])
                        .filter((e) => e && e.name)
                        .map((e) => (
                          <option key={e.name} value={e.name}>
                            {e.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Field names */}
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-600 mb-1">From field (collection)</label>
                    <input
                      type="text"
                      className="w-full border rounded-md px-2 py-1 text-xs"
                      placeholder="orders"
                      value={rel.fromField || ""}
                      onChange={(e) => {
                        const updated = [...(values.relationships || [])];
                        updated[index] = { ...rel, fromField: e.target.value };
                        setFieldValue("relationships", updated);
                      }}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-xs text-gray-600 mb-1">To field</label>
                    <input
                      type="text"
                      className="w-full border rounded-md px-2 py-1 text-xs"
                      placeholder="customer"
                      value={rel.toField || ""}
                      onChange={(e) => {
                        const updated = [...(values.relationships || [])];
                        updated[index] = { ...rel, toField: e.target.value };
                        setFieldValue("relationships", updated);
                      }}
                    />
                  </div>

                  {/* Remove */}
                  <div className="col-span-12 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = (values.relationships || []).filter(
                          (_r, idx) => idx !== index
                        );
                        setFieldValue("relationships", updated);
                      }}
                    >
                      ✕ Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status Message */}
      {statusMessage && (
        <Card className={statusCode >= 400 ? "border-red-500" : "border-green-500"}>
          <CardContent className="pt-6">
            <p className={statusCode >= 400 ? "text-red-600" : "text-green-600"}>
              {statusMessage}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isLoading}>
          Back
        </Button>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handlePreview} 
            disabled={isLoading || !isValid}
            type="button"
          >
            {isLoading ? "Preparing Preview..." : "Preview Configuration"}
          </Button>
         
        </div>
      </div>
    </div>
  );
};

export default MonolithicForm; 