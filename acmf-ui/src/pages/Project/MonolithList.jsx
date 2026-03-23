import { useEffect, useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonolithProjects } from "@/redux/Project/Project.Action";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PROJECT_TYPES } from "@/constants/projectTypes";

const MonolithList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { project, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchMonolithProjects({ category, tag }));
  }, [category, tag, auth.jwt, dispatch]);

  const filteredProjects = useMemo(() => {
    const projectsToFilter = project.monolithProjects || [];


    const filtered = keyword
      ? projectsToFilter.filter((project) =>
          project.name.toLowerCase().includes(keyword.toLowerCase())
        )
      : projectsToFilter;

    return filtered;
  }, [keyword, project.monolithProjects]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage]);

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

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  return (
    <>
      <div className="flex gap-2 items-center pb-5 justify-between">
        <div className="relative p-0 w-full">
          <Input
            className="w-full rounded-full px-9"
            placeholder="search monolithic projects..."
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
          {paginatedProjects.length > 0 ? (
            paginatedProjects.map((item) => (
              <ProjectCard item={item} key={item.id} />
            ))
          ) : (
            <div className="flex items-center justify-center">
              <h1>No monolithic projects found</h1>
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

export default MonolithList;
