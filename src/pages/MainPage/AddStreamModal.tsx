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
import VideoUploader from '../helpers/VideoUploader';

interface AddStreamModalProps {
  onClose: () => void;
}

const AddStreamModal = ({ onClose }: AddStreamModalProps) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const initialValues = {
    streamName: '',
    fps: 30,
    resolution: '1920x1080',
    snapshotPath: "",
  };

  const validationSchema = Yup.object({
    streamName: Yup.string().required('Stream Name is Required'),
    fps: Yup.number().required('FPS is required').positive().integer(),
    resolution: Yup.string().required('Select a resolution for the video to be streamed'),
  });

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
        onSubmit={async (values) => {
          console.log("videoFile", videoFile);  // check this is not null
          console.log("values", values);         // check form values
          const payload = new FormData();
          payload.append("streamName", values.streamName);
          payload.append("fps", String(values.fps));
          payload.append("resolution", values.resolution);
          payload.append("loopEnabled", "true");
          payload.append("status", "true");

          if (videoFile) {
            payload.append("file", videoFile);
          }

          console.log("payload", payload)
          dispatch(addStreamAction(payload));
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

              <Grid size={12}>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary', mb: 1, fontFamily: 'monospace' }}
                >
                  Upload Video
                </Typography>
                <VideoUploader onFileSelected={setVideoFile} />
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