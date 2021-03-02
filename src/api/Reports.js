import { getRequest} from "./utils";

export const getTitleEmployees = (Id) => getRequest(`/api/hrm/report/EmpListTitle/${Id}`);

export const getGradeEmployees = (Id) => getRequest(`/api/hrm/report/EmpListGrade/${Id}`);

export const getDepEmployees = (Id) => getRequest(`/api/hrm/report/EmpListDept/${Id}`);

export const getNationEmployees = (Id) => getRequest(`/api/hrm/report/EmpListNation/${Id}`);

export const getQualificationEmployees = (Id) => getRequest(`/api/hrm/report/EmpListQualification/${Id}`);

export const getReligionEmployees = (Id) => getRequest(`/api/hrm/report/EmpListReligion/${Id}`);

export const getServiceEmployees = (Id) => getRequest(`/api/hrm/report/ServiceTime/${Id}`);

export const getLeavesEmployees = (Id) => getRequest(`/api/hrm/report/EmpListLeaves/${Id}`);