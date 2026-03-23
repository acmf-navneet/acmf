import * as actionTypes from "./ActionTypes";
import api, { API_BASE_URL } from "@/api/api";

export const fetchProjects = ({ category, tag }) => {
  const params = {};
  if (category) {
    params.category = category;
  }
  if (tag) {
    params.tag = tag;
  }
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECTS_REQUEST });
    try {
      const response = await api.get("/api/projects", { params });
      const sortedProjects = response.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      dispatch({
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        projects: sortedProjects,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PROJECTS_FAILURE,
        error: error.message,
      });
    }
  };
};

export const searchProjects = (keyword) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEARCH_PROJECT_REQUEST });
    try {
      const response = await api.get(`/api/projects/search?keyword=${keyword}`);
      dispatch({
        type: actionTypes.SEARCH_PROJECT_SUCCESS,
        projects: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.SEARCH_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

export const createProject = (projectData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });
    try {
      const response = await api.post(
        `${API_BASE_URL}/api/projects`,
        projectData
      );
      dispatch({
        type: actionTypes.CREATE_PROJECT_SUCCESS,
        project: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

export const updateProject = ({ projectId, updatedData }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_PROJECT_REQUEST });
    try {
      const response = await api.put(
        `${API_BASE_URL}/api/projects/${projectId}`,
        updatedData
      );
      dispatch({
        type: actionTypes.UPDATE_PROJECT_SUCCESS,
        project: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchProjectById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECT_BY_Id_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const response = await api.get(`/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_Id_SUCCESS,
        projectDetails: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_Id_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchProjectByName = (name) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECT_BY_NAME_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const response = await api.get(`/api/projects/name/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_NAME_SUCCESS,
        projectDetails: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_NAME_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchProjectByRootDir = (rootDirectoryName) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECT_BY_ROOT_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const response = await api.get(`/api/projects/root/${rootDirectoryName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_ROOT_SUCCESS,
        microserviceDetails: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_ROOT_FAILURE,
        error: error.message,
      });
    }
  };
};

export const deleteProject = ({ projectId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST });
    try {
      await api.delete(`/api/projects/${projectId}`);
      dispatch({ type: actionTypes.DELETE_PROJECT_SUCCESS, projectId });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

export const inviteToProject = ({ email, projectId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.INVITE_TO_PROJECT_REQUEST });
    try {
      const { data } = await api.post("/api/projects/invite", {
        email,
        projectId,
      });
      dispatch({ type: actionTypes.INVITE_TO_PROJECT_SUCCESS });
    } catch (error) {
      dispatch({
        type: actionTypes.INVITE_TO_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

export const acceptInvitation = ({ invitationToken, navigate }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ACCEPT_INVITATION_REQUEST });
    try {
      const { data } = await api.get("/api/projects/accept_invitation", {
        params: { token: invitationToken },
      });
      navigate(`/project/${data.projectId}`);
      dispatch({ type: actionTypes.ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.ACCEPT_INVITATION_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchMonolithProjects = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_MONOLITH_PROJECTS_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const response = await api.get("/api/projects/monoliths", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sortedProjects = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      dispatch({
        type: actionTypes.FETCH_MONOLITH_PROJECTS_SUCCESS,
        projects: sortedProjects,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_MONOLITH_PROJECTS_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchMicroserviceProjects = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_MICROSERVICE_PROJECTS_REQUEST });
    try {
      const token = localStorage.getItem("jwt");
      const response = await api.get("/api/projects/microservices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // response.data = Map<String, List<ProjectDTO>>
      const sortedGroups = {};
      Object.keys(response.data).forEach((groupName) => {
        sortedGroups[groupName] = response.data[groupName].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      });

      dispatch({
        type: actionTypes.FETCH_MICROSERVICE_PROJECTS_SUCCESS,
        microserviceGroups: sortedGroups,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_MICROSERVICE_PROJECTS_FAILURE,
        error: error.message,
      });
    }
  };
};
