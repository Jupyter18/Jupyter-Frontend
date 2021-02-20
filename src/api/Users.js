import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/api/admin";
export const getAllUsers = () => getRequest(`${BASE_URL}/empList/1`);

export const getUser = (id) => getRequest(`${BASE_URL}/user/${id}`);

export const deleteUsers = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateUsers = (id,data) => putRequest(`${BASE_URL}/user/${id}`,data);

export const saveuser = (data) => postRequest(`${BASE_URL}/user`,data);