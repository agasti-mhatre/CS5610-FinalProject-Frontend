import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentSlice = createSlice({

    name: "enrollment",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: module }) => {

            },
        deleteEnrollment: (state, { payload: moduleId }) => {

            
            },
    }
});

export default enrollmentSlice.reducer;