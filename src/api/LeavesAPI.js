import { getRequest} from "./utils";

export const getAllLeavesApplications = () => getRequest(`/api/employee/companydata`);

export const Accept_Leave = () => getRequest(`/api/employee/companydata`);

export const Reject_Leaave = () => getRequest(`/api/employee/companydata`);