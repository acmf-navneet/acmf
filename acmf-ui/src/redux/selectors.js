import { createSelector } from 'reselect';


const selectAuthState = (state) => state.auth;
const selectProjectState = (state) => state.project;

export const selectMemoizedAuth = createSelector(
  [selectAuthState],
  (auth) => ({
    jwt: auth.jwt,
    loading: auth.loading,
    user:auth.user,
  })
);

export const selectMemoizedProject = createSelector(
  [selectProjectState],
  (project) => ({
    loading: project.loading,
    projectDetails: project.projectDetails,
    projects: project.projects, 
  })
);
