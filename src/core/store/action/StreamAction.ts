/**
 * File: Stream.ts
 * Author: Sujit
 * Description: Api trigger function for Streams
 * Created At : 19-06-2026
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { streamService } from "../../service/apiServices/streamService";

export const getStreamAction = createAsyncThunk(
  "get/stream",
  async (id: number, { rejectWithValue }) => {
    const { getStreams } = streamService();

    try {
      const { data } = await getStreams(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data ?? {
          message: error?.message ?? "Something went wrong",
        }
      );
    }
  }
);

export const addStreamAction = createAsyncThunk(
  "add/stream",
  async (data1: any, { rejectWithValue }) => {
    const { addStreams } = streamService();

    try {
      const { data } = await addStreams(data1);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data ?? {
          message: error?.message ?? "Something went wrong",
        }
      );
    }
  }
);

export const editStreamAction = createAsyncThunk(
  "edit/stream",
  async (data1: any, { rejectWithValue }) => {
    const { editStreams } = streamService();

    try {
      const { data } = await editStreams(data1);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data ?? {
          message: error?.message ?? "Something went wrong",
        }
      );
    }
  }
);

export const deleteStreamAction = createAsyncThunk(
  "delete/stream",
  async (data1: any, { rejectWithValue }) => {
    const { deleteStreams } = streamService();

    try {
      const { data } = await deleteStreams(data1);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data ?? {
          message: error?.message ?? "Something went wrong",
        }
      );
    }
  }
);

export const listStreamAction = createAsyncThunk(
  "list/stream",
  async (pageParams: string, { rejectWithValue }) => {
    const { listStreams } = streamService();

    try {
      const { data } = await listStreams(pageParams);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data ?? {
          message: error?.message ?? "Something went wrong",
        }
      );
    }
  }
);

export const uploadVideosAction = createAsyncThunk(
  "uploadVideos",
  async (data1: any, { rejectWithValue }) => {
    const { uploadVideos } = streamService();
    try {
      const { data } = await uploadVideos(data1);
      console.log("Data From BE", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data ?? {
          message: error?.message ?? "Something went wrong",
        }
      );
    }
  }
);