import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const fetchAssignmentsForCourse = async (cid: string) => {

    const response = await axios.get(`${ASSIGNMENTS_API}/${cid}`);
    return response.data;
};

export const addAssignment = async (newAssignment: any) => {

    const response = await axios.post(`${ASSIGNMENTS_API}`, newAssignment);
    return response.data;
}

export const updateAssignment = async (newAssignment: any) => {

    const response = await axios.put(`${ASSIGNMENTS_API}`, newAssignment);
    return response.data;
}

export const deleteAssignment = async (assignmentId: string) => {

    const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};