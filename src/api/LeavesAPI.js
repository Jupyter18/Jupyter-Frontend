import { getRequest} from "./utils";

export const getAllLeavesApplications = (Id) => getRequest(`/api/supervisor/viewLeaveDetails/${Id}`);

export const Accept_Leave = () => getRequest(`/api/employee/companydata`);

export const Reject_Leaave = () => getRequest(`/api/employee/companydata`);

export const getLeaveSummery = (id) => getRequest(`api/employee/leavesummary/${id}`);