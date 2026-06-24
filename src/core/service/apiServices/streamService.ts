import { urlConstants } from "@/src/Constants/Url.constants";
import { DeleteAPI, GetAPI, PostAPI, PutAPI } from "../BaseService";

export const streamService = () => {
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const addStreams = (data: FormData) => {
    return PostAPI(urlConstants.stream + "/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const getStreams = (id: any) => {
    return GetAPI(urlConstants.stream + "/by_uniq_code" + id, config);
  };
  const editStreams = (data: any) => {
    return PutAPI(urlConstants.stream + "/update", data, config);
  };
  const deleteStreams = (id: any) => {
    return DeleteAPI(urlConstants.stream + `/delete?uniq_code=${id}`, config);
  };
  const listStreams = () => {
    return GetAPI(urlConstants.stream + "/list", config);
  };

  const uploadVideos = (data: any) => {
    let configheader = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();

    data.forEach((file: any) => formData.append("file", file));
    formData.append("dirname", "upload/videos");
    return PostAPI(urlConstants.stream + "/upload", formData, configheader);
  };

  return { addStreams, getStreams, editStreams, deleteStreams, listStreams, uploadVideos };
};
