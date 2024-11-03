import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentSlice = createSlice({

    name: "enrollment",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: enrollment }) => {

            const newEnrollment = {

                "_id": enrollment._id,
                "user": enrollment.user,
                "course": enrollment.course
            }
            state.enrollments = [...state.enrollments, newEnrollment];
        },
        deleteEnrollment: (state, { payload: enrollment }) => {

            const courseID = enrollment.course;
            const userID = enrollment.user;

            state.enrollments = state.enrollments.filter(
                (enr: any) => !((enr.user === userID) && (enr.course === courseID))
            );
        },
    }
});

export const { addEnrollment, deleteEnrollment } =
  enrollmentSlice.actions;

export default enrollmentSlice.reducer;