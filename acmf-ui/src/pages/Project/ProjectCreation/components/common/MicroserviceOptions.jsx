import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MicroserviceOptions = ({ 
  config, 
  onConfigChange, 
  title = "Microservice Options"
}) => {
  const handleChange = (field, value) => {
    onConfigChange(field, value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Service Discovery</Label>
            <Select 
              value={config.serviceDiscoveryType || "eureka"} 
              onValueChange={(value) => handleChange('serviceDiscoveryType', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eureka">Eureka</SelectItem>
                <SelectItem value="consul">Consul</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Reactive Framework</Label>
            <Select 
              value={config.reactive?.toString() || "false"} 
              onValueChange={(value) => handleChange('reactive', value === 'true')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Hibernate Cache</Label>
            <Select 
              value={config.enableHibernateCache?.toString() || "true"} 
              onValueChange={(value) => handleChange('enableHibernateCache', value === 'true')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Translation</Label>
            <Select 
              value={config.enableTranslation?.toString() || "false"} 
              onValueChange={(value) => handleChange('enableTranslation', value === 'true')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>WebSocket</Label>
            <Select 
              value={config.websocket || "false"} 
              onValueChange={(value) => handleChange('websocket', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MicroserviceOptions; 