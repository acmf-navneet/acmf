import * as actionTypes from "./ActionTypes";
import { PROJECT_TYPES } from "@/constants/projectTypes";

const initialState = {
  projects: [],
  monolithProjects: [],
  microserviceGroups: {},
  loading: false,
  error: null,
  projectDetails: null,
  microserviceDetails: [],
  searchProjects: [],
};

const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_REQUEST:
    case actionTypes.CREATE_PROJECT_REQUEST:
    case actionTypes.UPDATE_PROJECT_REQUEST:
    case actionTypes.DELETE_PROJECT_REQUEST:
    case actionTypes.FETCH_PROJECT_BY_Id_REQUEST:
    case actionTypes.FETCH_PROJECT_BY_NAME_REQUEST:
    case actionTypes.FETCH_MONOLITH_PROJECTS_REQUEST:
    case actionTypes.FETCH_MICROSERVICE_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.projects,
      };
    case actionTypes.SEARCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        searchProjects: action.projects,
      };
    case actionTypes.FETCH_MONOLITH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        monolithProjects: action.projects,
      };
    case actionTypes.FETCH_MICROSERVICE_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        microserviceGroups: action.microserviceGroups,
      };
    case actionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: [...state.projects, action.project],
      };
    case actionTypes.FETCH_PROJECT_BY_Id_SUCCESS:
      return {
        ...state,
        loading: false,
        projectDetails: action.projectDetails,
      };
    case actionTypes.FETCH_PROJECT_BY_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        projectDetails: action.projectDetails,
      };
    case actionTypes.FETCH_PROJECT_BY_ROOT_SUCCESS:
      return {
        ...state,
        loading: false,
        microserviceDetails: action.microserviceDetails,
      };
    case actionTypes.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.map((project) =>
          project.id === action.project.id ? action.project : project
        ),
      };
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter(
          (project) => project.id !== action.projectId
        ),
      };
    case actionTypes.FETCH_PROJECTS_FAILURE:
    case actionTypes.CREATE_PROJECT_FAILURE:
    case actionTypes.UPDATE_PROJECT_FAILURE:
    case actionTypes.DELETE_PROJECT_FAILURE:
    case actionTypes.FETCH_PROJECT_BY_NAME_FAILURE:
    case actionTypes.FETCH_PROJECT_BY_ROOT_FAILURE:
    case actionTypes.FETCH_MONOLITH_PROJECTS_FAILURE:
    case actionTypes.FETCH_MICROSERVICE_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default ProjectReducer;
