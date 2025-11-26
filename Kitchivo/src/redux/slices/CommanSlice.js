
//@ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "../../services/AuthServices";
import CommanServices from "../../services/CommanService";

export const getDashboard = createAsyncThunk(
    "auth/getDashboard",
    async () => {
        try {
            const res = await CommanServices.getDashboard();
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);


export const createContact = createAsyncThunk(
    "auth/createContact",
    async (data) => {
        try {
            const res = await CommanServices.createContact(data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);


const initialState = {
    loading: false,
    error: false,
    dashboard: null,
};


const CommanSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        //   Get Logged In User

        builder
            .addCase(getDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDashboard.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.dashboard = payload?.data;
            })
            .addCase(getDashboard.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(createContact.pending, (state) => {
                state.loading = true;
            })
            .addCase(createContact.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createContact.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default CommanSlice.reducer;