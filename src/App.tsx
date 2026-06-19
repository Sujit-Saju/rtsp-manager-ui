/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useEffect } from 'react';
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
  Alert
} from '@mui/material';

import { RTSPStream } from './types';
import BackgroundShader from './components/BackgroundShader';
import StreamPlayer from './components/StreamPlayer';
import ConsoleSidebar from './components/ConsoleSidebar';
import rtspLogo from '@/assets/logo/rtsp_logo.jpeg';

import { useAppDispatch, useAppSelector } from './store';
import {
  setSearchTerm,
  setFilterType,
  setToastMessage,
  setIsCreateOpen,
  setPreviewStream,
  updateNewStreamField,
  addLog,
  addStream,
  deleteStream,
  clearLogs
} from './store/streamsSlice';

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

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Neon Indigo
      light: '#818cf8',
      dark: '#4338ca',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#22d3ee', // Cyan glow
      light: '#67e8f9',
      dark: '#0891b2',
      contrastText: '#0f172a'
    },
    background: {
      default: '#070a13', // Soft obsidian-dark
      paper: '#11131f'    // Dark card surface
    },
    text: {
      primary: '#f4f4f7',  // Crisp off-white text
      secondary: '#94a3b8' // Cool dark slate gray text
    },
    success: {
      main: '#10b981'
    },
    warning: {
      main: '#fbbf24'
    },
    error: {
      main: '#ef4444'
    }
  },
  typography: {
    fontFamily: '"Inter", "Space Grotesk", sans-serif',
    h5: {
      fontWeight: 800,
      fontFamily: '"Space Grotesk", sans-serif'
    },
    h6: {
      fontWeight: 800,
      fontFamily: '"Space Grotesk", sans-serif'
    },
    subtitle1: {
      fontWeight: 700
    },
    button: {
      fontWeight: 700,
      letterSpacing: '0.02em'
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
        containedPrimary: {
          boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)'
          }
        }
      } as any
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#11131f',
          color: '#f4f4f7',
          borderRadius: '24px',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }
      }
    }
  }
});

export default function App() {
  const dispatch = useAppDispatch();

  // Redux state selectors
  const streams = useAppSelector((state) => state.streams.streams);
  const logs = useAppSelector((state) => state.streams.logs);
  const searchTerm = useAppSelector((state) => state.streams.searchTerm);
  const filterType = useAppSelector((state) => state.streams.filterType);
  const toastMessage = useAppSelector((state) => state.streams.toastMessage);
  const isCreateOpen = useAppSelector((state) => state.streams.isCreateOpen);
  const previewStream = useAppSelector((state) => state.streams.previewStream);
  const newStream = useAppSelector((state) => state.streams.newStream);

  const {
    name: newStreamName,
    sourceUrl: newStreamSource,
    resolution: newStreamResolution,
    codec: newStreamCodec,
    fps: newStreamFps,
    networkType: newStreamNetwork,
    loop: newStreamLoop,
  } = newStream;

  const imagePool = [
    'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCZAtGVN3gcp7aShKmjzVKuq-wyYqN8f9b5JVhcuJCQe6bW3DkUf-ogL4D8-mnkJD42g1fXvlEBmQydnyGNEePznkKfP_dpYP1NG9C3_PwC7FsYnDAnXmG2bXIZwFZQXDQWfuYyB7rJAPiMyrb9SwQQv4MdpxTvQ7dokzojdqnHyJ3XJ4XszBiNANdNpmKnxNimlJoon78Jngu4EmJcVZfCe6rQY7FMpacVtOkwE45TlU6GL2uWJcbHPdLGip9Y6EDcNIqeuKuDw49P'
  ];

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => {
        dispatch(setToastMessage(null));
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [toastMessage, dispatch]);

  // Copy helper
  const handleCopyUrl = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    dispatch(setToastMessage(`Copied endpoint for ${name}!`));
    dispatch(addLog({ level: 'info', message: `Stream link endpoint for [${name}] copied to clipboard` }));
  };

  // Filter computations
  const filteredStreams = useMemo(() => {
    return streams.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.sourceUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.resolution.includes(searchTerm) ||
        s.codec.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType =
        filterType === 'ALL' ||
        (filterType === 'READY' && s.isReady) ||
        (filterType === 'OFFLINE' && !s.isReady);

      return matchSearch && matchType;
    });
  }, [streams, searchTerm, filterType]);

  // Statistics summaries
  const stats = useMemo(() => {
    const totalCount = streams.length;
    const readyCount = streams.filter((s) => s.isReady).length;
    let connectedClientsSimulated = 142; 
    if (previewStream) {
      connectedClientsSimulated += 1;
    }
    return {
      total: totalCount,
      ready: readyCount,
      clients: connectedClientsSimulated,
      ping: '99.8%'
    };
  }, [streams, previewStream]);

  // Submitted handler for new stream creation
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreamName.trim()) return;

    const pathKey = newStreamName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const liveEndpoint = `rtsp://192.168.0.10:8554/${pathKey || 'custom-stream'}`;

    const randomImg = imagePool[Math.floor(Math.random() * imagePool.length)];

    const created: RTSPStream = {
      id: `rtsp-${Date.now()}`,
      name: newStreamName,
      sourceUrl: newStreamSource,
      resolution: newStreamResolution,
      codec: newStreamCodec,
      fps: Number(newStreamFps),
      networkType: newStreamNetwork,
      liveEndpoint,
      isReady: true,
      loop: newStreamLoop,
      imageUrl: randomImg,
      createdAt: new Date().toISOString()
    };

    dispatch(addStream(created));
    dispatch(setIsCreateOpen(false));

    dispatch(addLog({ level: 'success', message: `Provisioned stream [${newStreamName}] balancing to GPU master` }));
    dispatch(addLog({ level: 'info', message: `Stream properties: ${newStreamResolution} | ${newStreamCodec} | ${newStreamFps} FPS` }));
    dispatch(setToastMessage(`Stream "${newStreamName}" initialized!`));
  };

  // Deletion stream helper
  const handleDeleteStream = (id: string, name: string) => {
    dispatch(deleteStream(id));
    dispatch(addLog({ level: 'warn', message: `Released hardware node mapping for stream: '${name}'` }));
    dispatch(setToastMessage(`Deleted stream "${name}"`));
  };

  // Clear system logs safety wrapper
  const handleClearLogs = () => {
    dispatch(clearLogs());
  };

  return (
    <ThemeProvider theme={customTheme}>
      <BackgroundShader />

      {/* Styled toast notification using MUI Snackbar and Alert */}
      <Snackbar
        open={toastMessage !== null}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 8 }}
      >
        <Alert
          severity="success"
          icon={<CheckCircle size={16} />}
          sx={{
            borderRadius: '16px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: '#11131f',
            color: '#22d3ee',
            fontWeight: 700,
            fontFamily: 'sans-serif'
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>

      {/* Modern elevated App Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(17, 19, 31, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          color: 'text.primary',
          height: '76px',
          zIndex: 1100
        }}
      >
        <Container maxWidth="xl" sx={{ height: '100%' }}>
          <Toolbar sx={{ height: '100%', justifyContent: 'space-between', px: { xs: 0, sm: 2 } }}>
            {/* Left side: Logo & Brand details */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid rgba(99, 102, 241, 0.35)',
                    boxShadow: '0 0 12px rgba(99, 102, 241, 0.2)'
                  }}
                >
                  <Box
                    component="img"
                    src={rtspLogo}
                    alt="RTSP Manager Logo"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '-1px',
                    fontFamily: '"Space Grotesk", sans-serif',
                    background: 'linear-gradient(45deg, #818cf8, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  RTSP Manager
                </Typography>
                <Chip
                  label="PRO-v1"
                  size="small"
                  color="primary"
                  sx={{
                    height: '18px',
                    fontSize: '9px',
                    fontWeight: 950,
                    borderRadius: '6px',
                    px: 0.5,
                    fontFamily: 'monospace'
                  }}
                />
              </Box>
            </Box>

            {/* Right side diagnostics and operator avatar */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3.5 }}>
              <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1.5 }}>
                <Chip
                  label="RTSP INGEST ENABLED"
                  size="small"
                  sx={{
                    height: '22px',
                    fontSize: '9px',
                    fontWeight: 800,
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    color: '#818cf8',
                    border: '1px solid rgba(99, 102, 241, 0.15)',
                    fontFamily: 'monospace'
                  }}
                />
                <Chip
                  label="LAN CLUSTER REPLICANT"
                  size="small"
                  sx={{
                    height: '22px',
                    fontSize: '9px',
                    fontWeight: 800,
                    backgroundColor: 'rgba(34, 211, 238, 0.1)',
                    color: '#22d3ee',
                    border: '1px solid rgba(34, 211, 238, 0.15)',
                    fontFamily: 'monospace'
                  }}
                />
              </Box>

              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <IconButton
                  size="small"
                  onClick={() => {
                    dispatch(setToastMessage('System diagnostics: All core pipelines normal'));
                    dispatch(addLog({ level: 'info', message: 'Triggered background pipeline integrity checkout' }));
                  }}
                  sx={{ color: '#94a3b8', '&:hover': { color: '#818cf8', backgroundColor: 'rgba(255, 255, 255, 0.04)' } }}
                  title="System Alerts"
                >
                  <Badge color="error" variant="dot">
                    <Bell size={18} />
                  </Badge>
                </IconButton>

                <Avatar
                  alt="Tactical Operator"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOz7SNC1_9cLVJ6hXUXZOeO7sT7N9Bnjjh0XTp9tiX7paw5JSx6pjTD3OA1yQq1RTbgsq1D1d_4PvHr12p9lqv2-6X5Y0rTPedzpGaMCIKPbhiDGKliOqa2WtzeSmI5_jjHNU5px_dbDQE6SAyy-ZXu0ZlhIIxZJIdLqzUlNcIGbsK5r98PjX14GoiIi6h_7pu7jApMRXU6mKbMTJ9XU2qkk6PlvHyPcwP9k-bnRQ41AC2YcbhE_lCxW7GxV9rMF0CKcpnr424GeUZ"
                  sx={{
                    width: 36,
                    height: 36,
                    border: '2px solid rgba(99, 102, 241, 0.3)',
                    boxShadow: '0 2px 10px rgba(99, 102, 241, 0.2)'
                  }}
                />
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Top spacer */}
      <Toolbar sx={{ height: '76px' }} />

      {/* Main responsive container layout */}
      <Container maxWidth="xl" sx={{ pt: 4, pb: 14, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }} className="animate-fade-in">
          {/* Header section with telemetry summaries */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#f4f4f7', letterSpacing: '-0.02em', fontFamily: '"Space Grotesk", sans-serif' }}>
                  Intelligent Stream Orchestrator
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5 }}>
                  Orchestrating high-performance real-time visual feeds and secure proxy gateways.
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => {
                  dispatch(setIsCreateOpen(true));
                  dispatch(addLog({ level: 'info', message: 'Operator initialized new stream workflow form dialog' }));
                }}
                startIcon={<Plus size={16} />}
                sx={{
                  borderRadius: '12px',
                  fontWeight: 800,
                  backgroundColor: 'primary.main',
                  px: 3,
                  py: 1.2,
                  fontFamily: '"Space Grotesk", sans-serif'
                }}
              >
                Provision Stream Node
              </Button>
            </Box>

            {/* Grid of four stats counters */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 3 }}>
              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: '24px', border: '1px solid rgba(99, 102, 241, 0.15)', background: '#11131f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-2px)', borderColor: 'primary.light', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.1)' } }}
              >
                <Box>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', tracking: '0.1em', fontWeight: 800, color: '#94a3b8', display: 'block', fontSize: '10px', mb: 0.5, fontFamily: 'monospace' }}>
                    Active Encoders
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, fontFamily: 'monospace', color: '#f4f4f7' }}>
                    {stats.total}
                  </Typography>
                </Box>
                <Box sx={{ width: 48, height: 48, borderRadius: '16px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
                  <Video size={18} />
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.15)', background: '#11131f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-2px)', borderColor: 'rgb(52, 211, 153)', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.1)' } }}
              >
                <Box>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', tracking: '0.1em', fontWeight: 800, color: '#94a3b8', display: 'block', fontSize: '10px', mb: 0.5, fontFamily: 'monospace' }}>
                    Sinks Connected
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, fontFamily: 'monospace', color: '#10b981' }}>
                    {stats.ready}
                  </Typography>
                </Box>
                <Box sx={{ width: 48, height: 48, borderRadius: '16px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                  <CheckCircle size={18} />
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: '24px', border: '1px solid rgba(34, 211, 238, 0.15)', background: '#11131f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-2px)', borderColor: 'secondary.light', boxShadow: '0 10px 30px rgba(6, 182, 212, 0.1)' } }}
              >
                <Box>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', tracking: '0.1em', fontWeight: 800, color: '#94a3b8', display: 'block', fontSize: '10px', mb: 0.5, fontFamily: 'monospace' }}>
                    Client Listeners
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, fontFamily: 'monospace', color: '#f4f4f7' }}>
                    {stats.clients}
                  </Typography>
                </Box>
                <Box sx={{ width: 48, height: 48, borderRadius: '16px', backgroundColor: 'rgba(34, 211, 238, 0.1)', color: 'secondary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(34, 211, 238, 0.15)' }}>
                  <Users size={18} />
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: '24px', border: '1px solid rgba(99, 102, 241, 0.15)', background: '#11131f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-2px)', borderColor: 'primary.light', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.1)' } }}
              >
                <Box>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', tracking: '0.1em', fontWeight: 800, color: '#94a3b8', display: 'block', fontSize: '10px', mb: 0.5, fontFamily: 'monospace' }}>
                    Core Precision
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, fontFamily: 'monospace', color: '#f4f4f7' }}>
                    {stats.ping}
                  </Typography>
                </Box>
                <Box sx={{ width: 48, height: 48, borderRadius: '16px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
                  <Network size={18} />
                </Box>
              </Paper>
            </Box>
          </Box>

          {/* Ingestion Split Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '3fr 1.15fr' }, gap: 4 }}>
            {/* Left Side: Managed Streams View */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, minWidth: 0 }}>
              
              {/* Filters Row */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2.5,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ width: { xs: '100%', sm: '320px' } }}>
                  <TextField
                    placeholder="Search streams by tag, resolution, format..."
                    size="small"
                    value={searchTerm}
                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: <Search size={14} style={{ marginRight: '8px', color: '#94a3b8' }} />
                      }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#161825',
                        borderRadius: '12px',
                        fontFamily: 'monospace',
                        color: '#f4f4f7',
                        fontSize: '11.5px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
                        '&:hover fieldset': { borderColor: 'primary.light' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.light' }
                      }
                    }}
                  />
                </Box>

                <Stack direction="row" spacing={0.5} sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' }, width: { xs: '100%', sm: 'auto' } }}>
                  {(['ALL', 'READY', 'OFFLINE'] as const).map((opt) => (
                    <Button
                      key={opt}
                      onClick={() => dispatch(setFilterType(opt))}
                      size="small"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '9.5px',
                        fontWeight: 800,
                        borderRadius: '10px',
                        flex: { xs: 1, sm: 'none' },
                        px: 2.5,
                        py: 0.8,
                        backgroundColor: filterType === opt ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                        color: filterType === opt ? '#818cf8' : '#94a3b8',
                        border: filterType === opt ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.04)'
                        }
                      }}
                    >
                      {opt}
                    </Button>
                  ))}
                </Stack>
              </Paper>

              {/* Grid list of RTSP card feeds */}
              {filteredStreams.length === 0 ? (
                <Paper
                  elevation={0}
                  sx={{ p: 10, textAlign: 'center', borderRadius: '24px', border: '1px dashed rgba(255, 255, 255, 0.12)', color: '#94a3b8', fontStyle: 'italic', backgroundColor: 'transparent' }}
                >
                  No active cameras or codecs match the current filter.
                </Paper>
              ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                  {filteredStreams.map((stream) => (
                    <Box key={stream.id}>
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: '24px',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          backgroundColor: '#11131f',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            borderColor: 'primary.light',
                            boxShadow: '0 12px 30px rgba(99, 102, 241, 0.15)'
                          }
                        }}
                      >
                        <Box sx={{ position: 'relative', height: '176px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                          {stream.imageUrl ? (
                            <CardMedia
                              component="img"
                              image={stream.imageUrl}
                              alt={stream.name}
                              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '10px', color: '#818cf8' }}>
                              NO HARDWARE SIGNAL
                            </Box>
                          )}

                          {/* Gradient to match panel backing */}
                          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #11131f 0%, rgba(17, 19, 31, 0) 80%)' }} />

                          {/* Corner status badges */}
                          <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexWrap: 'wrap', gap: 1, maxW: 'calc(100% - 32px)' }}>
                            <Chip
                              label={stream.isReady ? 'PORT ALIVE' : 'PORT SUSPENDED'}
                              size="small"
                              sx={{
                                height: '20px',
                                fontSize: '8.5px',
                                fontWeight: 900,
                                fontFamily: 'monospace',
                                borderRadius: '6px',
                                backgroundColor: stream.isReady ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)',
                                color: '#ffffff'
                              }}
                            />
                            <Chip
                              label={stream.networkType}
                              size="small"
                              sx={{
                                height: '20px',
                                fontSize: '8.5px',
                                fontWeight: 800,
                                fontFamily: 'monospace',
                                borderRadius: '6px',
                                backgroundColor: '#161825',
                                color: '#94a3b8',
                                border: '1px solid rgba(255, 255, 255, 0.08)'
                              }}
                            />
                          </Box>

                          {stream.loop && (
                            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                              <Chip
                                label="AUTOLOOP"
                                size="small"
                                sx={{
                                  height: '20px',
                                  fontSize: '8.5px',
                                  fontWeight: 900,
                                  fontFamily: 'monospace',
                                  borderRadius: '6px',
                                  backgroundColor: 'rgba(34, 211, 238, 0.2)',
                                  color: '#22d3ee',
                                  border: '1px solid rgba(34, 211, 238, 0.3)'
                                }}
                              />
                            </Box>
                          )}
                        </Box>

                        {/* Card Details Panel */}
                        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2.5 }}>
                          <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                              <Box sx={{ minWidth: 0 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f4f4f7', tracking: '-0.01em', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontFamily: '"Space Grotesk", sans-serif' }}>
                                  {stream.name}
                                </Typography>
                                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#94a3b8', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', mt: 0.5 }}>
                                  {stream.sourceUrl}
                                </Typography>
                              </Box>

                              <IconButton
                                size="small"
                                onClick={() => handleCopyUrl(stream.sourceUrl, stream.name)}
                                sx={{ border: '1px solid rgba(255,255,255,0.08)', color: 'secondary.light', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.04)' } }}
                                title="Copy Source Address"
                              >
                                <Copy size={12} />
                              </IconButton>
                            </Box>

                            {/* Specs tags */}
                            <Stack direction="row" spacing={0.8} sx={{ flexWrap: 'wrap', gap: 0.8, pt: 1.5 }}>
                              <Chip label={`📐 ${stream.resolution}`} size="small" sx={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, px: 0.2, height: '22px', backgroundColor: 'rgba(255, 255, 255, 0.04)', color: '#a5b4fc', border: '1px solid rgba(255, 255, 255, 0.04)' }} />
                              <Chip label={`💿 ${stream.codec}`} size="small" sx={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, px: 0.2, height: '22px', backgroundColor: 'rgba(255, 255, 255, 0.04)', color: '#22d3ee', border: '1px solid rgba(255, 255, 255, 0.04)' }} />
                              <Chip label={`💨 ${stream.fps} FPS`} size="small" sx={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, px: 0.2, height: '22px', backgroundColor: 'rgba(255, 255, 255, 0.04)', color: '#34d399', border: '1px solid rgba(255, 255, 255, 0.04)' }} />
                            </Stack>

                            {/* Live Output feed address box */}
                            <Box sx={{ p: 2, mt: 2.5, backgroundColor: 'rgba(0, 0, 0, 0.15)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '8.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>
                                  RTSP ENCRYPTED OUTPUT RELAY
                                </Typography>
                                <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '8px', fontWeight: 900, color: 'secondary.light' }}>
                                  PORT : 8554
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', userSelect: 'all' }}>
                                {stream.liveEndpoint}
                              </Typography>
                            </Box>
                          </Box>

                          {/* Card Bottom actions bar */}
                          <Box sx={{ display: 'flex', gap: 1.5, borderTop: '1px solid rgba(255, 255, 255, 0.06)', pt: 2 }}>
                            <Button
                              variant="contained"
                              onClick={() => {
                                dispatch(setPreviewStream(stream));
                                dispatch(addLog({ level: 'info', message: `Launch live visual decoder on camera stream: '${stream.name}'` }));
                              }}
                              fullWidth
                              startIcon={<ExternalLink size={12} />}
                              sx={{
                                py: 1,
                                fontSize: '11px',
                                backgroundColor: 'primary.main',
                                '&:hover': { backgroundColor: 'primary.dark' }
                              }}
                            >
                              Live Telemetry
                            </Button>
                            
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDeleteStream(stream.id, stream.name)}
                              sx={{
                                minWidth: '40px',
                                width: '40px',
                                borderRadius: '12px',
                                borderColor: 'rgba(239, 68, 68, 0.25)',
                                color: 'error.main',
                                p: 0,
                                '&:hover': {
                                  backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                  borderColor: 'error.main'
                                }
                              }}
                            >
                              <Trash2 size={13} />
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {/* Right Side: Realtime Console and heartbeats */}
            <Box>
              <ConsoleSidebar logs={logs} onClearLogs={handleClearLogs} />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Global Footer telemetry ribbon */}
      <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: 'rgba(17, 19, 31, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          py: 2,
          px: { xs: 3, sm: 10 },
          zIndex: 1000,
          color: '#f4f4f7'
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: 3, maxWidth: '1920px', mx: 'auto' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ p: 1, backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', color: 'primary.light', display: 'flex', border: '1px solid rgba(255,255,255,0.04)' }}>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>📊</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', display: 'block', tracking: '0.05em' }}>DATABASE POOLS</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 850, color: '#f4f4f7', fontFamily: 'monospace', fontSize: '11px' }}>
                  1,204 <span style={{ color: '#10b981', fontSize: '9px', fontWeight: 600 }}>↑ 12%</span>
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ p: 1, backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', color: 'primary.light', display: 'flex', border: '1px solid rgba(255,255,255,0.04)' }}>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>⚡</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', display: 'block', tracking: '0.05em' }}>ACCUMULATED TRAFFIC</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 850, color: '#f4f4f7', fontFamily: 'monospace', fontSize: '11px' }}>12.4 PB RELAY</Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ p: 1, backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', color: 'primary.light', display: 'flex', border: '1px solid rgba(255,255,255,0.04)' }}>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>⏱️</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', display: 'block', tracking: '0.05em' }}>NETWORK RESPONSE</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 850, color: '#f4f4f7', fontFamily: 'monospace', fontSize: '11px' }}>180ms End-to-End</Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ p: 1, backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', color: 'primary.light', display: 'flex', border: '1px solid rgba(255,255,255,0.04)' }}>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>👥</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', display: 'block', tracking: '0.05em' }}>CLUSTER RECEIVERS</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 850, color: '#f4f4f7', fontFamily: 'monospace', fontSize: '11px' }}>1.8k ACTIVE</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* --- CREATE NEW STREAM MODAL (MUI DIALOG) --- */}
      <Dialog
        open={isCreateOpen}
        onClose={() => dispatch(setIsCreateOpen(false))}
        maxWidth="sm"
        fullWidth
        disableRestoreFocus
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', backgroundColor: 'rgba(255, 255, 255, 0.01)', py: 2, px: 3 }}>
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
                border: '1px solid rgba(34, 211, 238, 0.35)'
              }}
            >
              <Box
                component="img"
                src={rtspLogo}
                alt="Logo"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Typography variant="h6" sx={{ color: 'secondary.light', fontWeight: 850, fontFamily: '"Space Grotesk", sans-serif' }}>
              Provision New RTSP Node
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => dispatch(setIsCreateOpen(false))}
            sx={{ color: '#94a3b8', '&:hover': { color: '#f4f4f7' } }}
          >
            ✕
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleCreateSubmit}>
          <DialogContent sx={{ p: 3.5, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Stream Name */}
            <Box>
              <Typography variant="caption" sx={{ display: 'block', fontWeight: 800, textTransform: 'uppercase', tracking: '0.05em', color: '#94a3b8', mb: 1, fontFamily: 'monospace' }}>
                Stream Identifier / Camera Location
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g. Loading Dock North Entrance"
                value={newStreamName}
                onChange={(e) => dispatch(updateNewStreamField({ field: 'name', value: e.target.value }))}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#161825',
                    color: '#f4f4f7',
                    borderRadius: '12px',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
                    '&:hover fieldset': { borderColor: 'primary.light' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.light' }
                  }
                }}
              />
            </Box>

            {/* Source URL Ingestion */}
            <Box>
              <Typography variant="caption" sx={{ display: 'block', fontWeight: 800, textTransform: 'uppercase', tracking: '0.05em', color: '#94a3b8', mb: 1, fontFamily: 'monospace' }}>
                RTSP Source URL (Local Camera Network IP)
              </Typography>
              <TextField
                fullWidth
                placeholder="rtsp://admin:pass@camera-ip:554/live"
                value={newStreamSource}
                onChange={(e) => dispatch(updateNewStreamField({ field: 'sourceUrl', value: e.target.value }))}
                required
                slotProps={{
                  input: {
                    sx: { fontFamily: 'monospace', fontSize: '12px' }
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#161825',
                    color: '#f4f4f7',
                    borderRadius: '12px',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
                    '&:hover fieldset': { borderColor: 'primary.light' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.light' }
                  }
                }}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {/* Resolution settings */}
              <FormControl fullWidth size="small">
                <InputLabel id="res-select-label" sx={{ fontWeight: 650, color: '#94a3b8', fontSize: '13px' }}>Resolution Ceiling</InputLabel>
                <Select
                  labelId="res-select-label"
                  value={newStreamResolution}
                  label="Resolution Ceiling"
                  onChange={(e) => dispatch(updateNewStreamField({ field: 'resolution', value: e.target.value as string }))}
                  sx={{ borderRadius: '12px', backgroundColor: '#161825', color: '#f4f4f7' }}
                >
                  <MenuItem value="1920x1080">1920x1080 (FHD)</MenuItem>
                  <MenuItem value="1280x720">1280x720 (HD)</MenuItem>
                  <MenuItem value="3840x2160">3840x2160 (4K)</MenuItem>
                </Select>
              </FormControl>

              {/* Codec */}
              <FormControl fullWidth size="small">
                <InputLabel id="codec-select-label" sx={{ fontWeight: 650, color: '#94a3b8', fontSize: '13px' }}>Compression Codec</InputLabel>
                <Select
                  labelId="codec-select-label"
                  value={newStreamCodec}
                  label="Compression Codec"
                  onChange={(e) => dispatch(updateNewStreamField({ field: 'codec', value: e.target.value as string }))}
                  sx={{ borderRadius: '12px', backgroundColor: '#161825', color: '#f4f4f7' }}
                >
                  <MenuItem value="H.264">H.264 (Classic Speed)</MenuItem>
                  <MenuItem value="H.265">H.265 (HEVC Efficiency)</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {/* Target Frames per second */}
              <FormControl fullWidth size="small">
                <InputLabel id="fps-label" sx={{ fontWeight: 650, color: '#94a3b8', fontSize: '13px' }}>Target Frame Rate</InputLabel>
                <Select
                  labelId="fps-label"
                  value={newStreamFps}
                  label="Target Frame Rate"
                  onChange={(e) => dispatch(updateNewStreamField({ field: 'fps', value: Number(e.target.value) }))}
                  sx={{ borderRadius: '12px', backgroundColor: '#161825', color: '#f4f4f7' }}
                >
                  <MenuItem value={15}>15 FPS (Conserve Network)</MenuItem>
                  <MenuItem value={30}>30 FPS (Standard Fluidity)</MenuItem>
                  <MenuItem value={60}>60 FPS (Tactical Flow)</MenuItem>
                </Select>
              </FormControl>

              {/* Optimization pipeline */}
              <FormControl fullWidth size="small">
                <InputLabel id="optimize-label" sx={{ fontWeight: 650, color: '#94a3b8', fontSize: '13px' }}>Optimization Path</InputLabel>
                <Select
                  labelId="optimize-label"
                  value={newStreamNetwork}
                  label="Optimization Path"
                  onChange={(e) => dispatch(updateNewStreamField({ field: 'networkType', value: e.target.value as any }))}
                  sx={{ borderRadius: '12px', backgroundColor: '#161825', color: '#f4f4f7' }}
                >
                  <MenuItem value="LOCAL NETWORK">Local Intranet P2P</MenuItem>
                  <MenuItem value="WAN OPTIMIZED">WAN Optimized Relay</MenuItem>
                  <MenuItem value="PERIMETER SECURED">Perimeter Secured Air-Gap</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Loop Checkbox Container */}
            <Paper elevation={0} sx={{ p: 2, border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', backgroundColor: 'rgba(0,0,0,0.1)' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox-loop-stream"
                    checked={newStreamLoop}
                    onChange={(e) => dispatch(updateNewStreamField({ field: 'loop', value: e.target.checked }))}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ pl: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#f4f4f7' }}>
                      Arm Automatic Stream Loop-buffer
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mt: 0.2 }}>
                      Infinite loop feedback simulation when active, avoiding blackouts. Keep on for surveillance demos.
                    </Typography>
                  </Box>
                }
              />
            </Paper>

            <Typography variant="caption" sx={{ display: 'block', p: 1.8, backgroundColor: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.1)', color: '#94a3b8' }}>
              ℹ️ Provisioned stream pipelines are automatically calibrated and scheduled across the available GPU server core pool in the system clusters.
            </Typography>
          </DialogContent>

          <DialogActions sx={{ px: 3.5, py: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.06)', gap: 1.5 }}>
            <Button
              onClick={() => dispatch(setIsCreateOpen(false))}
              sx={{ color: '#94a3b8', fontWeight: 800 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: '12px', px: 3.5, py: 1 }}
            >
              INITIALIZE NODE
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* --- LIVE STREAM PLAYBACK MODEL PREVIEW --- */}
      <Dialog
        open={previewStream !== null}
        onClose={() => dispatch(setPreviewStream(null))}
        maxWidth="md"
        fullWidth
        disableRestoreFocus
        sx={{ '& .MuiDialog-paper': { borderRadius: '24px', overflow: 'hidden' } }}
      >
        {previewStream && (
          <>
            <DialogContent sx={{ p: 2, backgroundColor: '#070a13' }}>
              <StreamPlayer stream={previewStream} />
            </DialogContent>
            
            <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.06)', backgroundColor: '#070a13', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.5)' }}>
                DECODED RAW FEED · ESTABLISHED {new Date(previewStream.createdAt).toLocaleTimeString()}
              </Typography>
              <Button
                onClick={() => dispatch(setPreviewStream(null))}
                variant="contained"
                sx={{
                  borderRadius: '12px',
                  backgroundColor: 'primary.main',
                  fontWeight: 800,
                  fontSize: '11.5px',
                  px: 3,
                  py: 0.8
                }}
              >
                Close Decoder
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </ThemeProvider>
  );
}
