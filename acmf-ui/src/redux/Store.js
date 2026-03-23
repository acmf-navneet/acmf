import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";
import ProjectReducer from "./Project/Project.Reducer";
import GenerateProjectReducer from "./ProjectGenerator/ProjectGenerator.Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  project: ProjectReducer,
  jhipster: GenerateProjectReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
