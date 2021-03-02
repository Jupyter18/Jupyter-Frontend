import { getRequest, postRequest, deleteRequest} from "./utils";

export const getAllItems = () => getRequest(`/api/employee/companydata`);

export const getAllItemsReg = () => getRequest(`/api/employee/regdata`);

export const getGenAttributes = () => getRequest(`/api/admin//getEmpAttribute`);

export const getCusAttributes = () => getRequest(`/api/admin/getCstAttribute`);

export const deleteCusAttributes = (field_name) => deleteRequest(`/api/admin/removeAttribute/${field_name}`);

export const saveCusAttributes = (body) => postRequest(`/api/admin/addAttribute`,body);

export const saveContactNumbers = (body) => postRequest(`/api/admin/empContants`,body);

export const addCustomData = (id,body) => postRequest(`/api/hrm/customData/${id}`,body);