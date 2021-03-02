import { getRequest, putRequest, postRequest} from "./utils";

export const getAllLeavesApplications = (Id) => getRequest(`/api/supervisor/viewLeaveDetails/${Id}`);

export const Accept_Leave = (data) => putRequest(`/api/supervisor/approveLeave`,data);

export const Reject_Leaave = (data) => putRequest(`/api/supervisor/rejectLeave`,data);

export const getLeaveSummery = (id) => getRequest(`api/employee/leavesummary/${id}`);

export const saveLeave = (data) => postRequest(`/api/employee/addleave`,data);

export const saveLeaveHRM = (data) => postRequest(`/api/employee/addleave`,data);

export const saveLeaveSup = (data) => postRequest(`/api/employee/addleave`,data);