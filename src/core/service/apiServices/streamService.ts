import { urlConstants } from "@/src/Constants/Url.constants";
import { DeleteAPI, GetAPI, PostAPI, PutAPI } from "../BaseService";

export const streamService = () => {
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const addStreams = (data: any) => {
    return PostAPI(urlConstants.stream + "/add", data, config);
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
  const listStreams = (pageParams: string) => {
    return GetAPI(urlConstants.stream + "/list" + pageParams, config);
  };

  return { addStreams, getStreams, editStreams, deleteStreams, listStreams };
};
