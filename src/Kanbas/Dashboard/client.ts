import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const addEnrollment = async (newEnrollment: any) => {

    const response = await axios.post(`${ENROLLMENTS_API}`, newEnrollment);
    return response.data;
}

export const deleteEnrollment = async (removeEnrollment: any) => {

    const response = await axios.delete(`${ENROLLMENTS_API}/${removeEnrollment.course}/${removeEnrollment.user}`);
    return response.data;
}

export const fetchEnrollments = async (userID: any) => {

    const response = await axios.get(`${ENROLLMENTS_API}/${userID}`);
    return response.data;
}