import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/Auth/Action";
import { Route, Routes, Navigate } from "react-router-dom";
import Loader from "./pages/Loader/Loader";
import Navbar from "./pages/Navbar/Navbar";
import Auth from "./pages/Auth/Auth";
import { selectMemoizedAuth } from "./redux/selectors";
import GenerateProject from "./pages/Project/ProjectCreation/GenerateProject";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home/Home"));
const ProjectDetails = lazy(() => import("./pages/Project/ProjectDetails"));
const UpdateProjectForm = lazy(() =>
  import("./pages/Project/UpdateProjectForm")
);
const CreateProjectForm = lazy(() =>
  import("./pages/Project/CreateProjectForm")
);
const ImportProject = lazy(() => import("./pages/Project/ImportProject"));
const CreatedMicroserviceList = lazy(() =>
  import("./pages/Project/CreatedMicroserviceList")
);
const AppShell = lazy(() =>
  import("./pages/AdminDashboard/components/AppShell")
);
const AdminDashboard = lazy(() =>
  import("./pages/AdminDashboard/AdminDashboard")
);

// Error Boundary Component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   componentDidCatch(error, info) {
//     console.error("ErrorBoundary caught an error:", error, info);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <div>Something went wrong. Please try again later.</div>;
//     }
//     return this.props.children;
//   }
// }

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(selectMemoizedAuth);

  // Fetch user data when the app loads or when auth.jwt changes
  useEffect(() => {
    if (auth?.jwt || localStorage.getItem("jwt")) {
      dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
    }
  }, [auth?.jwt, dispatch]);

  return (
    <>
      {/* Navbar is always visible */}
      <Navbar />

      {/* Show loader while authentication is in progress */}
      {auth.loading ? (
        <Loader />
      ) : auth.user ? (
        // Protected Routes (User is authenticated)
        // <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Main AppShell Layout */}
              <Route path="/" element={<AppShell />}>
                <Route index element={<Home />} />
                <Route path="project/:id" element={<ProjectDetails />} />
                <Route
                  path="project/name/:name"
                  element={<ProjectDetails />}
                />
                <Route
                  path="project/update/:id"
                  element={<UpdateProjectForm />}
                />
                <Route
                  path="createproject"
                  element={<CreateProjectForm />}
                />
                <Route
                  path="importproject"
                  element={<ImportProject />}
                />
                <Route
                  path="dashboard"
                  element={<AdminDashboard />}
                />
                <Route
                  path="generateproject"
                  element={<GenerateProject />}
                />
              </Route>
              <Route 
                path="project/root/:rootDirectoryName" 
                element={<ProjectDetails />} 
              />
              <Route 
                path="project/created-microservices/:rootDirectoryName" 
                element={<CreatedMicroserviceList />} 
              />

              {/* Redirect to home if no match */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        // </ErrorBoundary>
      ) : (
        // Public Routes (User is not authenticated)
        <Auth />
      )}
    </>
  );
}

export default React.memo(App);