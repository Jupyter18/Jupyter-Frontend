import { getRequest, putRequest, postRequest} from "./utils";

export const getAllLeavesApplications = (Id) => getRequest(`/api/supervisor/viewLeaveDetails/${Id}`);

export const Accept_Leave = (leave_date) => putRequest(`/api/supervisor/approveLeave`,leave_date);

export const Reject_Leaave = () => putRequest(`/api/employee/companydata`);

export const getLeaveSummery = (id) => getRequest(`api/employee/leavesummary/${id}`);

export const saveLeave = (data) => postRequest(`/api/employee/addleave`,data);