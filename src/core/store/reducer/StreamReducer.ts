/**
 * File: StreamReducer.ts
 * Author: Sujit
 * Description: Store for Stream
 * Created At : 19-06-2026
 */

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { addStreamAction, deleteStreamAction, editStreamAction, getStreamAction, listStreamAction, uploadVideosAction } from "../action/StreamAction";
import { Streams } from "../InitialStates/Stream";


const initialState: Streams = {
  data: [],
  isLoading: false,
  isSuccess: false,
  status: false,
  message: "",
};

const streams = createSlice({
  name: "Streams",
  initialState,

  reducers: {

    resetStreamState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.status = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getStreamAction.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getStreamAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.data = action.payload["data"];

        state.message = "Streams fetched successfully";
        state.status = true;
      })

      .addCase(getStreamAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;

        state.message =
          (action.payload as { message?: string })?.message ??
          "Failed to fetch Streams";

        toast.error(state.message);
      })
      .addCase(addStreamAction.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(addStreamAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const newData = action.payload["data"];
        state.data = [newData, ...state.data];

        state.message = "Stream Added successfully";
        state.status = true;
      })

      .addCase(addStreamAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;

        state.message =
          (action.payload as { message?: string })?.message ??
          "Failed to add Camera";

        toast.error(state.message);
      })

      .addCase(listStreamAction.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(listStreamAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.data = action.payload["data"];

        state.message = "Stream Added successfully";
        state.status = true;
      })

      .addCase(listStreamAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;

        state.message =
          (action.payload as { message?: string })?.message ??
          "Failed to fetch Camera";

        toast.error(state.message);
      })
      .addCase(editStreamAction.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(editStreamAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.data.findIndex(
          (edit) => edit.uniqCode == action.payload["data"].uniqCode
        );
        state.data[index] = action.payload["data"];

        state.message = "Camera Added successfully";
        state.status = true;
      })

      .addCase(editStreamAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;

        state.message =
          (action.payload as { message?: string })?.message ??
          "Failed to fetch Camera";

        toast.error(state.message);
      })
      .addCase(deleteStreamAction.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteStreamAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const index = state.data.findIndex(
          (d) => d.uniqCode == action.payload["data"]["uniqCode"]
        );
        state.data.splice(index, 1);

        state.message = "Stream Added successfully";
        state.status = true;
      })

      .addCase(deleteStreamAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;

        state.message =
          (action.payload as { message?: string })?.message ??
          "Failed to fetch Stream";

        toast.error(state.message);
      })
      .addCase(uploadVideosAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(uploadVideosAction.fulfilled, (state, action) => {
        console.log("Fullfilled reducer", action.payload)
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.message = "Document uploaded succesfully";
        state.status = true;
      })
      .addCase(uploadVideosAction.rejected, (state, action) => {
        state.message = (action.payload as { message?: string })?.message ?? "Error Occured";
        state.isLoading = false;
        state.isSuccess = false;
        toast.error(state.message);
      });
  },
});

export const { resetStreamState } = streams.actions;
export default streams.reducer;
