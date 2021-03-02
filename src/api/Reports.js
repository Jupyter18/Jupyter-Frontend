import { getRequest} from "./utils";

export const getTitleEmployees = (Id) => getRequest(`/api/hrm/report/EmpListTitle/${Id}`);