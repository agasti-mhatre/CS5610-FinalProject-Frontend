import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentSlice = createSlice({

    name: "enrollment",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: enrollment }) => {
            state.enrollments = [...state.enrollments, enrollment] as any;
        },
        deleteEnrollment: (state, { payload: enrollment }) => {

            const courseID = enrollment.course;
            const userID = enrollment.user;

            state.enrollments = state.enrollments.filter(
                (enr: any) => !((enr.user === userID) && (enr.course === courseID))
            );
        },
        setEnrollments: (state, action) => {

            state.enrollments = action.payload;
        }
    }
});

export const { addEnrollment, deleteEnrollment, setEnrollments } =
  enrollmentSlice.actions;

export default enrollmentSlice.reducer;