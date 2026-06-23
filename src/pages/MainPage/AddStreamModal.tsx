import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Button,
  Grid,
  Divider,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import rtspLogo from '@/assets/logo/rtsp_logo.jpeg';
import { useAppDispatch } from '../../core/store/Hooks';
import { addStreamAction, uploadVideosAction } from '../../core/store/action/StreamAction';

interface AddStreamModalProps {
  onClose: () => void;
}

const AddStreamModal = ({ onClose }: AddStreamModalProps) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const initialValues = {
    streamName: '',
    filePath: '', // This will hold the BE string path after upload
    fps: 30,
    resolution: '1920x1080',
    snapshotPath: "",
  };

  const validationSchema = Yup.object({
    streamName: Yup.string().required('Stream Name is Required'),
    filePath: Yup.string().required('Upload the video that needs to be streamed'),
    fps: Yup.number().required('FPS is required').positive().integer(),
    resolution: Yup.string().required('Select a resolution for the video to be streamed'),
  });

  // Mock API Upload Function - Replace this with your actual Axios/Fetch call
  const uploadVideoToBackend = async (file: File) => {
    try {
      const response = await dispatch(uploadVideosAction([file])).unwrap();
      console.log("response", response);
      return response?.data?.path || response?.path || "";
    } catch (error) {
      console.error("Upload failed in thunk", error);
      throw error;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        padding: 3,
        borderRadius: '24px',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(34, 211, 238, 0.35)',
            }}
          >
            <Box
              component="img"
              src={rtspLogo}
              alt="Logo"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{ color: 'text.primary', fontWeight: 850, fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Provision New RTSP Node
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(
            addStreamAction({
              streamName: values.streamName,
              filePath: values.filePath,
              snapshotPath: values.snapshotPath,
              fps: Number(values.fps),
              resolution: values.resolution,
              loopEnabled: true,
              status: true,
            })
          );
          onClose();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched
        }) => (
          <Form>
            <Grid container spacing={2}>
              {/* Stream Identifier */}
              <Grid size={12}>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary', mb: 1, fontFamily: 'monospace' }}
                >
                  Stream Identifier
                </Typography>
                <TextField
                  fullWidth
                  name="streamName"
                  value={values.streamName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.streamName && Boolean(errors.streamName)}
                  helperText={touched.streamName && errors.streamName}
                  placeholder="e.g. Loading Dock North Entrance"
                />
              </Grid>

              {/* Video File Upload */}
              <Grid size={12}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "text.secondary",
                    mb: 1,
                    fontFamily: "monospace",
                  }}
                >
                  Video Source File
                </Typography>

                <input
                  type="file"
                  accept="video/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={async (event) => {
                    const file = event.currentTarget.files?.[0];

                    if (!file) return;

                    setIsUploading(true);
                    setFieldTouched("filePath", true);

                    try {
                      const uploadedData = await uploadVideoToBackend(file);

                      setFieldValue("filePath", uploadedData.video_path);
                      setFieldValue("snapshotPath", uploadedData.snapshot_path);

                      setUploadedFileName(file.name);
                    } catch (error) {
                      console.error(error);
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                />

                {!values.filePath && (
                  <Button
                    variant="outlined"
                    fullWidth
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {isUploading ? "Uploading..." : "Choose Video"}
                  </Button>
                )}

                {isUploading && (
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}

                {values.filePath && (
                  <Paper
                    variant="outlined"
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "success.50",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="caption">
                          {uploadedFileName}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="success.main"
                        >
                          ✓ Uploaded successfully
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ wordBreak: "break-all" }}
                        >
                          Video: {values.filePath}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Replace
                        </Button>

                        <Button
                          color="error"
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setUploadedFileName("");
                            setFieldValue("filePath", "");

                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                )}

                {touched.filePath && errors.filePath && (
                  <FormHelperText error>
                    {errors.filePath}
                  </FormHelperText>
                )}
              </Grid>

              {/* Target Frame Rate */}
              <Grid size={12}>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary', mb: 1, fontFamily: 'monospace' }}
                >
                  Target Frame Rate
                </Typography>
                <TextField
                  fullWidth
                  name="fps"
                  type="number"
                  value={values.fps}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fps && Boolean(errors.fps)}
                  helperText={touched.fps && errors.fps}
                />
              </Grid>

              {/* Resolution Select Dropdown */}
              <Grid size={12}>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary', mb: 1, fontFamily: 'monospace' }}
                >
                  Resolution
                </Typography>
                <FormControl fullWidth error={touched.resolution && Boolean(errors.resolution)}>
                  <Select
                    name="resolution"
                    value={values.resolution}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="1280x720">1280x720 (720p)</MenuItem>
                    <MenuItem value="1920x1080">1920x1080 (1080p)</MenuItem>
                    <MenuItem value="2560x1440">2560x1440 (2K)</MenuItem>
                    <MenuItem value="3840x2160">3840x2160 (4K)</MenuItem>
                  </Select>
                  {touched.resolution && errors.resolution && (
                    <FormHelperText>{errors.resolution}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
              <Button variant="outlined" onClick={onClose} disabled={isUploading} sx={{ borderRadius: '12px' }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isUploading}
                sx={{ borderRadius: '12px', fontWeight: 800 }}
              >
                Provision Node
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default AddStreamModal;