import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectByRootDir } from "@/redux/Project/Project.Action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github } from "lucide-react";
import Loader from "../Loader/Loader";
import { PROJECT_TYPES } from "@/constants/projectTypes";

const CreatedMicroserviceList = () => {
  const { rootDirectoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { microserviceDetails, isLoading, error } = useSelector((state) => state.project);

  useEffect(() => {
    if (rootDirectoryName) {
      dispatch(fetchProjectByRootDir(rootDirectoryName));
    }
  }, [rootDirectoryName, dispatch]);

  const handleServiceClick = (service) => {
    navigate(`/project/${service.id}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleGithubClick = (githubUrl) => {
    if (githubUrl) {
      window.open(githubUrl, '_blank');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Services</h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={handleBackClick} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!microserviceDetails || microserviceDetails.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">No Services Found</h2>
          <p className="text-gray-500 mb-4">No microservices found for this root directory.</p>
          <Button onClick={handleBackClick}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <Button
          onClick={handleBackClick}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{rootDirectoryName}</h1>
          <p className="text-blue-100">
            Microservice System • {microserviceDetails.length} service{microserviceDetails.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {microserviceDetails.map((service, index) => (
          <Card 
            key={service.id || index} 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleServiceClick(service)}
          >
            <div className="space-y-4">
              {/* Service Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {service.baseName || service.name || `Service ${index + 1}`}
                  </h3>
                  <p className="text-sm text-gray-500">{service.category}</p>
                </div>
                <Badge 
                  variant={service.applicationType === PROJECT_TYPES.GATEWAY ? "default" : "secondary"}
                  className="ml-2"
                >
                  {service.applicationType}
                </Badge>
              </div>

              {/* Service Description */}
              {service.description && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {service.description}
                </p>
              )}

              {/* Tags */}
              {service.tags && service.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {service.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {service.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{service.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-gray-400">
                  Click to view details
                </span>
                {service.githubUrl && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGithubClick(service.githubUrl);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default CreatedMicroserviceList;
