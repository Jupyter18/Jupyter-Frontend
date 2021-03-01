import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/api/admin";
export const getAllUsers = (id) => getRequest(`${BASE_URL}/empList/${id}`);

export const getUser = (id) => getRequest(`${BASE_URL}/user/${id}`);

export const deleteUsers = (id) => deleteRequest(`${BASE_URL}/user/${id}`);

export const updateUsers = (id,data) => putRequest(`${BASE_URL}/user/${id}`,data);

export const saveuser = (data) => postRequest(`${BASE_URL}/user`,data);

export const getEmployeeDetails = (id) => getRequest(`/api/employee/profile/${id}`);

export const getAllUsersHRM = (id) => getRequest(`api/hrm/empList/${id}`);

export const deleteUsersHRM = (id) => deleteRequest(`/api/hrm/user/${id}`);

export const updateUsersHRM = (id,data) => putRequest(`/api/hrm/user/${id}`,data);
