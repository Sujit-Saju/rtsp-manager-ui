import ConsoleSidebar from '@/src/components/ConsoleSidebar';
import { AppBar, Toolbar, Typography, Chip, Stack, IconButton, Avatar, Button, Paper, TextField, Card, CardMedia, CardContent, Container, Box, Badge, Dialog, Tooltip } from '@mui/material';
import { Bell, CheckCircle, Copy, ExternalLink, Plus, Search, Trash2, Users, Video, Network } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import rtspLogo from '@/assets/logo/rtsp_logo.jpeg';
import { useAppDispatch, useAppSelector } from '@/src/core/store/Hooks';
import AddStreamModal from './AddStreamModal';
import { deleteStreamAction, listStreamAction } from '@/src/core/store/action/StreamAction';
import { Stream } from '@/src/core/store/InitialStates/Stream';

const MainPage = () => {

    const dispatch = useAppDispatch()
    const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

    const streams = useAppSelector((store) => store.stream.data);

    // Fix 1: searchTerm as local state, not pointing to stream.data
    const [searchTerm, setSearchTerm] = useState('');
    const [addStream, setAddStream] = useState(false);
    const [playVideo, setPlayVideo] = useState(false);

    const [selectedStream, setSelectedStream] = useState<Stream | null>(null);

    // Play the video
    const handlePlayVideo = (uniqCode: string) => {
        const stream = streams?.find(item => item.uniqCode === uniqCode);

        if (stream) {
            setSelectedStream(stream);
            setPlayVideo(true);
        }
    };

    // Delete the stream
    const handleDeleteStream = (uniqCode: string) => {
        // Implement the delete logic here
        dispatch(deleteStreamAction(uniqCode));
    };

    const logs: any[] = [];
    const previewStream = null;

    const handleClearLogs = () => {
        console.log("INSIDE HANDLE CLEAR LOGS")
    }

    const handleCloseAddStreamForm = () => {
        setAddStream(false);
    }

    useEffect(() => {
        dispatch(listStreamAction());
    }, [dispatch]);

    // Fix 2: filter streams based on searchTerm
    const filteredStreams = useMemo(() => {
        if (!searchTerm.trim()) return streams;
        return streams.filter((s: any) =>
            s.streamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.resolution?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [streams, searchTerm]);

    const stats = useMemo(() => ({
        total: streams.length,
        clients: 142,
        ping: '99.8%'
    }), [streams]);

    return (
        <>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid rgba(99, 102, 241, 0.35)', boxShadow: '0 0 12px rgba(99, 102, 241, 0.2)' }}>
                                    <Box component="img" src={rtspLogo} alt="RTSP Manager Logo" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-1px', fontFamily: '"Space Grotesk", sans-serif', background: 'linear-gradient(45deg, #818cf8, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    RTSP Manager
                                </Typography>
                                <Chip label="PRO-v1" size="small" color="primary" sx={{ height: '18px', fontSize: '9px', fontWeight: 950, borderRadius: '6px', px: 0.5, fontFamily: 'monospace' }} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3.5 }}>
                            <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1.5 }}>
                                <Chip label="RTSP INGEST ENABLED" size="small" sx={{ height: '22px', fontSize: '9px', fontWeight: 800, backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.15)', fontFamily: 'monospace' }} />
                                <Chip label="LAN CLUSTER REPLICANT" size="small" sx={{ height: '22px', fontSize: '9px', fontWeight: 800, backgroundColor: 'rgba(34, 211, 238, 0.1)', color: '#22d3ee', border: '1px solid rgba(34, 211, 238, 0.15)', fontFamily: 'monospace' }} />
                            </Box>
                            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                                <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#818cf8', backgroundColor: 'rgba(255, 255, 255, 0.04)' } }}>
                                    <Badge color="error" variant="dot"><Bell size={18} /></Badge>
                                </IconButton>
                                <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOz7SNC1_9cLVJ6hXUXZOeO7sT7N9Bnjjh0XTp9tiX7paw5JSx6pjTD3OA1yQq1RTbgsq1D1d_4PvHr12p9lqv2-6X5Y0rTPedzpGaMCIKPbhiDGKliOqa2WtzeSmI5_jjHNU5px_dbDQE6SAyy-ZXu0ZlhIIxZJIdLqzUlNcIGbsK5r98PjX14GoiIi6h_7pu7jApMRXU6mKbMTJ9XU2qkk6PlvHyPcwP9k-bnRQ41AC2YcbhE_lCxW7GxV9rMF0CKcpnr424GeUZ" sx={{ width: 36, height: 36, border: '2px solid rgba(99, 102, 241, 0.3)' }} />
                            </Stack>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Toolbar sx={{ height: '76px' }} />

            <Container maxWidth="xl" sx={{ pt: 4, pb: 14, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>

                    {/* Header + Stats */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontFamily: '"Space Grotesk", sans-serif' }}>
                                    Intelligent Stream Orchestrator
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5 }}>
                                    Orchestrating high-performance real-time visual feeds and secure proxy gateways.
                                </Typography>
                            </Box>
                            <Button variant="contained" onClick={() => setAddStream(true)} startIcon={<Plus size={16} />} sx={{ borderRadius: '12px', fontWeight: 800, px: 3, py: 1.2, fontFamily: '"Space Grotesk", sans-serif' }}>
                                Provision Stream Node
                            </Button>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 3 }}>
                            {[
                                { label: 'Active Encoders', value: stats.total, color: '99, 102, 241', icon: <Video size={18} /> },
                                { label: 'Sinks Connected', value: null, color: '16, 185, 129', icon: <CheckCircle size={18} /> },
                                { label: 'Client Listeners', value: stats.clients, color: '34, 211, 238', icon: <Users size={18} /> },
                                { label: 'Core Precision', value: stats.ping, color: '99, 102, 241', icon: <Network size={18} /> },
                            ].map(({ label, value, color, icon }) => (
                                <Paper key={label} elevation={0} sx={{ p: 3, borderRadius: '24px', border: `1px solid rgba(${color}, 0.15)`, background: '#11131f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 10px 30px rgba(${color}, 0.1)` } }}>
                                    <Box>
                                        <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 800, color: '#94a3b8', display: 'block', fontSize: '10px', mb: 0.5, fontFamily: 'monospace' }}>{label}</Typography>
                                        {value !== null && <Typography variant="h4" sx={{ fontWeight: 900, fontFamily: 'monospace', color: '#f4f4f7' }}>{value}</Typography>}
                                    </Box>
                                    <Box sx={{ width: 48, height: 48, borderRadius: '16px', backgroundColor: `rgba(${color}, 0.1)`, color: `rgb(${color})`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid rgba(${color}, 0.15)` }}>
                                        {icon}
                                    </Box>
                                </Paper>
                            ))}
                        </Box>
                    </Box>

                    {/* Main split grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '3fr 1.15fr' }, gap: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, minWidth: 0 }}>

                            {/* Search + Filter bar */}
                            <Paper elevation={0} sx={{ p: 2, borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', backgroundColor: 'rgba(255, 255, 255, 0.02)', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2.5, alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ width: { xs: '100%', sm: '320px' } }}>
                                    <TextField
                                        placeholder="Search streams by name, resolution..."
                                        size="small"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        fullWidth
                                        slotProps={{ input: { startAdornment: <Search size={14} style={{ marginRight: '8px', color: '#94a3b8' }} /> } }}
                                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#161825', borderRadius: '12px', fontFamily: 'monospace', color: '#f4f4f7', fontSize: '11.5px', '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' }, '&:hover fieldset': { borderColor: 'primary.light' }, '&.Mui-focused fieldset': { borderColor: 'primary.light' } } }}
                                    />
                                </Box>
                                <Stack direction="row" spacing={0.5}>
                                    {(['ALL', 'READY', 'OFFLINE'] as const).map((opt) => (
                                        <Button key={opt} size="small">{opt}</Button>
                                    ))}
                                </Stack>
                            </Paper>

                            {/* Stream cards */}
                            {filteredStreams.length === 0 ? (
                                <Paper elevation={0} sx={{ p: 10, textAlign: 'center', borderRadius: '24px', border: '1px dashed rgba(255, 255, 255, 0.12)', color: '#94a3b8', fontStyle: 'italic', backgroundColor: 'transparent' }}>
                                    No Streams Found
                                </Paper>
                            ) : (
                                // Fix 3: 2 columns on md+, 1 on mobile
                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                                    {filteredStreams.map((stream: any) => (
                                        <Card
                                            key={stream.uniqCode}
                                            elevation={0}
                                            sx={{ borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.06)', backgroundColor: '#11131f', display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.light', boxShadow: '0 12px 30px rgba(99, 102, 241, 0.15)' } }}
                                        >
                                            {/* Fix 4: clean ternary for snapshot vs fallback */}
                                            <Box sx={{ position: 'relative', height: '160px', backgroundColor: '#0a0b14' }}>
                                                {stream.snapshotPath ? (
                                                    <CardMedia
                                                        component="img"
                                                        image={`${API_BASE_URL}/${stream.snapshotPath}`}
                                                        alt={stream.streamName}
                                                        sx={{ width: '100%', height: '160px', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '10px', color: '#818cf8' }}>
                                                        {stream.streamName}
                                                    </Box>
                                                )}

                                                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #11131f 0%, rgba(17, 19, 31, 0) 70%)' }} />

                                                <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                                                    <Chip
                                                        label={stream.status ? 'PORT ALIVE' : 'PORT SUSPENDED'}
                                                        size="small"
                                                        sx={{ height: '20px', fontSize: '8.5px', fontWeight: 900, fontFamily: 'monospace', borderRadius: '6px', backgroundColor: stream.status ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)', color: '#fff' }}
                                                    />
                                                </Box>
                                            </Box>

                                            <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                {/* Fix 5: show stream name */}
                                                <Box
                                                    sx={{
                                                        p: 1.5,
                                                        borderRadius: '12px',
                                                        background: 'rgba(255,255,255,0.03)',
                                                        border: '1px solid rgba(255,255,255,0.06)',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            display: 'block',
                                                            mb: 0.75,
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.08em',
                                                            color: '#94a3b8',
                                                            fontSize: '10px',
                                                            fontFamily: 'monospace',
                                                        }}
                                                    >
                                                        RTSP URL
                                                    </Typography>

                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                flex: 1,
                                                                fontFamily: 'monospace',
                                                                fontWeight: 600,
                                                                color: '#f8fafc',
                                                                fontSize: '13px',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {stream.rtspUrl}
                                                        </Typography>

                                                        <Tooltip title="Copy URL">
                                                            <IconButton
                                                                size="small"
                                                                sx={{
                                                                    width: 28,
                                                                    height: 28,
                                                                    border: '1px solid rgba(34,197,94,0.2)',
                                                                    backgroundColor: 'rgba(34,197,94,0.08)',
                                                                    color: '#22c55e',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(34,197,94,0.15)',
                                                                    },
                                                                }}
                                                            >
                                                                <Copy size={13} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </Box>

                                                <Stack direction="row" spacing={0.8} sx={{ flexWrap: 'wrap', gap: 0.8 }}>
                                                    <Chip label={`📐 ${stream.resolution}`} size="small" sx={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, height: '22px', backgroundColor: 'rgba(255, 255, 255, 0.04)', color: '#a5b4fc', border: '1px solid rgba(255, 255, 255, 0.04)' }} />
                                                    <Chip label={`💨 ${stream.fps} FPS`} size="small" sx={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, height: '22px', backgroundColor: 'rgba(255, 255, 255, 0.04)', color: '#34d399', border: '1px solid rgba(255, 255, 255, 0.04)' }} />
                                                </Stack>

                                                <Box sx={{ p: 1.5, backgroundColor: 'rgba(0, 0, 0, 0.15)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '8.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>
                                                            RTSP ENCRYPTED OUTPUT RELAY
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '8px', fontWeight: 900, color: 'secondary.light' }}>
                                                            PORT : 8554
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ display: 'flex', gap: 1.5, borderTop: '1px solid rgba(255, 255, 255, 0.06)', pt: 1.5 }}>
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        startIcon={<ExternalLink size={12} />}
                                                        sx={{ py: 0.8, fontSize: '11px' }}
                                                        onClick={() => handlePlayVideo(stream.uniqCode)}
                                                    >
                                                        Play Video
                                                    </Button>
                                                    <Button variant="outlined" color="error" sx={{ minWidth: '40px', width: '40px', borderRadius: '12px', borderColor: 'rgba(239, 68, 68, 0.25)', p: 0 }} onClick={() => handleDeleteStream(stream.uniqCode)}>
                                                        <Trash2 size={13} />
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            )}
                        </Box>

                        {/* Right: Console */}
                        <Box>
                            <ConsoleSidebar logs={logs} onClearLogs={handleClearLogs} />
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Dialog open={addStream} onClose={handleCloseAddStreamForm}>
                <AddStreamModal onClose={handleCloseAddStreamForm} />
            </Dialog>
            <Dialog
                open={playVideo}
                onClose={() => {
                    setPlayVideo(false);
                    setSelectedStream(null);
                }}
                maxWidth="md"
                fullWidth
            >
                <Box sx={{ bgcolor: 'black' }}>
                    {selectedStream && (
                        <video
                            key={selectedStream.uniqCode}
                            src={`${API_BASE_URL}/${selectedStream.filePath}`}
                            controls
                            autoPlay
                            style={{
                                width: '100%',
                                maxHeight: '500px',
                                display: 'block',
                            }}
                        />
                    )}
                </Box>
            </Dialog>
        </>
    )
}

export default MainPage;