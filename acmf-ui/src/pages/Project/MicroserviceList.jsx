import { useEffect, useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMicroserviceProjects } from "@/redux/Project/Project.Action";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PROJECT_TYPES } from "@/constants/projectTypes";

const MicroserviceList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedGroups, setExpandedGroups] = useState({});
  const itemsPerPage = 5;

  const { project, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchMicroserviceProjects({ category, tag }));
  }, [category, tag, auth.jwt, dispatch]);

const filteredMicroserviceGroups = useMemo(() => {
  if (!project.microserviceGroups || typeof project.microserviceGroups !== 'object') {
    return {};
  }

  if (!keyword) {
    return project.microserviceGroups;
  }

  const filtered = {};
  Object.keys(project.microserviceGroups).forEach(rootDir => {
    const rootMatch = rootDir.toLowerCase().includes(keyword.toLowerCase());

    const filteredServices = project.microserviceGroups[rootDir].filter(service =>
      service.name.toLowerCase().includes(keyword.toLowerCase()) ||
      service.category.toLowerCase().includes(keyword.toLowerCase()) ||
      service.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
    );

    // ✅ If rootDir matches OR any service matches, include it
    if (rootMatch || filteredServices.length > 0) {
      filtered[rootDir] = rootMatch ? project.microserviceGroups[rootDir] : filteredServices;
    }
  });

  return filtered;
}, [keyword, project.microserviceGroups]);


  const allServices = useMemo(() => {
    const services = [];
    Object.values(filteredMicroserviceGroups).forEach(groupServices => {
      services.push(...groupServices);
    });
    return services;
  }, [filteredMicroserviceGroups]);

  const paginatedGroups = useMemo(() => {
    const groupKeys = Object.keys(filteredMicroserviceGroups);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedKeys = groupKeys.slice(startIndex, endIndex);
    
    const result = {};
    paginatedKeys.forEach(key => {
      result[key] = filteredMicroserviceGroups[key];
    });
    return result;
  }, [filteredMicroserviceGroups, currentPage]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (section, value) => {
    if (value === "all") {
      searchParams.delete(section);
    } else {
      searchParams.set(section, value);
    }
    const query = searchParams.toString();
    navigate({ search: query ? `?${query}` : "" });
  };

  const toggleGroupExpansion = (rootDir) => {
    setExpandedGroups(prev => ({
      ...prev,
      [rootDir]: !prev[rootDir]
    }));
  };

  const totalGroups = Object.keys(filteredMicroserviceGroups).length;
  const totalPages = Math.ceil(totalGroups / itemsPerPage);

  return (
    <>
      <div className="flex gap-2 items-center pb-5 justify-between">
            <div className="relative p-0 w-full">
              <Input
                className="w-full rounded-full px-9"
                placeholder="search microservices..."
                onChange={handleSearchChange}
                value={keyword}
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4 text-gray-500" />
            </div>

            <Sheet className="lg:hidden">
              <SheetTrigger>
                <Button className="" variant="ghost" size="icon">
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>

          <div>
            <div className="space-y-5 min-h-[74vh]">
              {Object.keys(paginatedGroups).length > 0 ? (
                Object.entries(paginatedGroups).map(([rootDir, services]) => (
                  <div key={rootDir} className="border rounded-lg p-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                      onClick={() => toggleGroupExpansion(rootDir)}
                    >
                      <div className="flex items-center gap-2">
                        {expandedGroups[rootDir] ? 
                          <ChevronDownIcon className="w-5 h-5" /> : 
                          <ChevronRightIcon className="w-5 h-5" />
                        }
                        <h3 className="text-lg font-semibold">{rootDir}</h3>
                        <span className="text-sm text-gray-500">
                          ({services.length} service{services.length !== 1 ? 's' : ''})
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {services.map(service => (
                          <span 
                            key={service.id}
                            className={`px-2 py-1 text-xs rounded-full ${
                              service.applicationType === PROJECT_TYPES.GATEWAY 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {service.applicationType}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {expandedGroups[rootDir] && (
                      <div className="mt-4 space-y-3">
                        {services.map((service) => (
                          <div key={service.id} className="ml-6">
                            <ProjectCard item={service} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <h1>No microservices found</h1>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(currentPage - 1, 1))
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        isActive={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(
                            Math.min(currentPage + 1, totalPages)
                          )
                        }
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </div>
    </>
  );
};

export default MicroserviceList;
