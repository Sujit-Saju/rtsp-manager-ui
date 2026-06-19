import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const toastMiddleware = createListenerMiddleware();

toastMiddleware.startListening({
  predicate: (action) => action.type.endsWith("/fulfilled"),
  effect: async (action: any) => {
    const message =
      action.payload?.message ||
      action.payload?.data?.message;

    if (!message) return;

    // Don't show success for fetch/list actions
    const actionType = action.type.toLowerCase();

    if (
      actionType.includes("/get") ||
      actionType.includes("/list") ||
      actionType.includes("/fetch")
    ) {
      return;
    }

    toast.success(message);
  },
});

toastMiddleware.startListening({
  predicate: (action) => action.type.endsWith("/rejected"),
  effect: async (action: any) => {
    const message =
      action.payload?.message ||
      action.error?.message ||
      "Something went wrong";

    toast.error(message);
  },
});