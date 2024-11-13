import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const fetchAssignmentsForCourse = async (cid: string) => {

    const response = await axios.get(`${ASSIGNMENTS_API}/${cid}`);
    console.log("Response: ", response);
    return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {

    const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};