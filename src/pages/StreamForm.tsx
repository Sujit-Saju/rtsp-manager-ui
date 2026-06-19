import {
  editCamerasAction,
  addCamerasAction,
} from "@/src/core/store/actions/cameraActions";
import { useAppDispatch, useAppSelector } from "@/src/core/store/hooks";
import { Camera } from "@/src/core/store/initialStates/camera";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
} from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import { X } from "lucide-react";
import { cameraSchema } from "./CameraSchema";
import { useEffect } from "react";
import { listNodesAction } from "@/src/core/store/actions/nodeActions";

interface CameraFormDialogProps {
  open: boolean;
  camera?: Camera | null;
  onClose: () => void;
}

const defaultValues = {
  name: "",
  node: "",
  streamType: "RTSP",
  streamUrl: "",
  resolution: "1280x720",
  fps: 30,
};

export default function CameraFormDialog({
  open,
  camera,
  onClose,
}: CameraFormDialogProps) {
  const nodes = useAppSelector((store) => store.nodes.data);

  useEffect(() => {
    dispatch(listNodesAction(""))
  }, [])

  const dispatch = useAppDispatch();

  const isEditMode = Boolean(camera);

  const initialValues = camera
    ? {
        name: camera.name,
        node: camera.node,
        streamType: camera.streamType,
        streamUrl: camera.streamUrl,
        resolution: camera.resolution,
        fps: camera.fps,
      }
    : defaultValues;

  const handleSubmit = (values: typeof initialValues) => {
    if (isEditMode) {
      dispatch(
        editCamerasAction({
          id: camera!.id,
          uniqCode: camera!.uniqCode,
          ...values,
        }),
      );
    } else {
      dispatch(
        addCamerasAction({
          ...values,
          bitrate: "5.2 Mb/s",
          models: [],
        }),
      );
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Formik
        initialValues={initialValues}
        validationSchema={cameraSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form>
            <DialogTitle>
              <div className="flex justify-between items-center">
                <span>
                  {isEditMode ? "Edit Camera Stream" : "Register Camera Stream"}
                </span>

                <button type="button" onClick={onClose}>
                  <X />
                </button>
              </div>
            </DialogTitle>

            <DialogContent>
              <div className="flex flex-col gap-4 mt-2">
                <TextField
                  fullWidth
                  name="name"
                  label="Camera Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormControl fullWidth>
                    <InputLabel>Host Node</InputLabel>

                    <Select
                      name="node"
                      label="Host Node"
                      value={values.node}
                      onChange={handleChange}
                    >
                      {nodes.map((node) => (
                        <MenuItem key={node.id} value={node.uniqCode}>
                          {node.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Stream Type</InputLabel>

                    <Select
                      name="streamType"
                      label="Stream Type"
                      value={values.streamType}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <MenuItem value="RTSP">RTSP</MenuItem>

                      <MenuItem value="USB">USB</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <TextField
                  fullWidth
                  name="streamUrl"
                  label="Stream URL"
                  value={values.streamUrl}
                  placeholder={values.streamType === "RTSP" ? "rtsp://192.168.1.150:554/stream1" : "/dev/video0"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.streamUrl && Boolean(errors.streamUrl)}
                  helperText={touched.streamUrl && errors.streamUrl}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormControl fullWidth>
                    <InputLabel>Resolution</InputLabel>

                    <Select
                      name="resolution"
                      label="Resolution"
                      value={values.resolution}
                      onChange={handleChange}
                    >
                      <MenuItem value="1280x720">HD</MenuItem>

                      <MenuItem value="1920x1080">Full HD</MenuItem>

                      <MenuItem value="3840x2160">4K</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>FPS</InputLabel>

                    <Select
                      name="fps"
                      label="FPS"
                      value={values.fps}
                      onChange={handleChange}
                    >
                      <MenuItem value={15}>15 FPS</MenuItem>

                      <MenuItem value={30}>30 FPS</MenuItem>

                      <MenuItem value={60}>60 FPS</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit" variant="contained">
                {isEditMode ? "Update Camera" : "Register Camera"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
