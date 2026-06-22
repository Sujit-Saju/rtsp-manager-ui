/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Chip,
  Badge,
  Avatar,
  Paper,
  Stack,
  Snackbar,
  Alert,
  CssBaseline
} from '@mui/material';

import { RTSPStream } from './types';
import BackgroundShader from './components/BackgroundShader';
import StreamPlayer from './components/StreamPlayer';
import ConsoleSidebar from './components/ConsoleSidebar';
import rtspLogo from '@/assets/logo/rtsp_logo.jpeg';

import { useAppDispatch, useAppSelector } from './core/store/Hooks';
// import {
//   setSearchTerm,
//   setFilterType,
//   setToastMessage,
//   setIsCreateOpen,
//   setPreviewStream,
//   updateNewStreamField,
//   addLog,
//   addStream,
//   deleteStream,
//   clearLogs
// } from './store/streamsSlice';

import {
  Video,
  CheckCircle,
  Users,
  Network,
  Plus,
  Copy,
  Trash2,
  Bell,
  Search,
  ExternalLink,
  Activity
} from 'lucide-react';
import MainPage from './pages/MainPage';
import { getMuiTheme } from './theme';


export default function App() {
  const dispatch = useAppDispatch();

  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = useMemo(() => getMuiTheme(isDarkMode), [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <BackgroundShader /> */}
      <MainPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </ThemeProvider>
  );
}
