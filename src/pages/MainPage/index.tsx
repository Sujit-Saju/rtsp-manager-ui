import ConsoleSidebar from '@/src/components/ConsoleSidebar';
import { AppBar, Toolbar, Typography, Chip, Stack, IconButton, Avatar, Button, Paper, TextField, Card, CardMedia, CardContent, Container, Box, Badge, Dialog, Tooltip } from '@mui/material';
import { Bell, CheckCircle, Copy, ExternalLink, Plus, Search, Trash2, Users, Video, Network } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import rtspLogo from '@/assets/logo/rtsp_logo.jpeg';
import { useAppDispatch, useAppSelector } from '@/src/core/store/Hooks';
import AddStreamModal from './AddStreamModal';
import { deleteStreamAction, listStreamAction } from '@/src/core/store/action/StreamAction';
import { Stream } from '@/src/core/store/InitialStates/Stream';
import AppHeader from '@/src/components/layout/AppHeader';
import StatsCards from '@/src/components/dashboards/StatsCard';
import SearchToolbar from '@/src/components/dashboards/SearchToolBar';
import StreamCard from '@/src/components/dashboards/StreamCard';

const MainPage = () => {

    const dispatch = useAppDispatch()
    const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

    const streams = useAppSelector((store) => store.stream.data);

    const [searchTerm, setSearchTerm] = useState('');
    const [addStream, setAddStream] = useState(false);
    const [playVideo, setPlayVideo] = useState(false);

    const [selectedStream, setSelectedStream] = useState<Stream | null>(null);

    const handlePlayVideo = (uniqCode: string) => {
        const stream = streams?.find(item => item.uniqCode === uniqCode);
        if (stream) {
            setSelectedStream(stream);
            setPlayVideo(true);
        }
    };

    const handleDeleteStream = (uniqCode: string) => {
        dispatch(deleteStreamAction(uniqCode));
    };

    useEffect(() => {
        dispatch(listStreamAction())
    }, [])

    const logs: any[] = [];

    const handleClearLogs = () => {
        console.log("INSIDE HANDLE CLEAR LOGS")
    }

    const handleCloseAddStreamForm = () => {
        setAddStream(false);
    }

    useEffect(() => {
        dispatch(listStreamAction());
    }, [dispatch]);

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
            {/* AppBar — frosted glass with teal accent border */}
            <AppHeader />

            <Container maxWidth="xl" sx={{ pt: 4, pb: 14, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>

                    {/* Header + Stats */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
                            <Box>
                                <Typography variant="h5" sx={{
                                    fontWeight: 800,
                                    letterSpacing: '-0.02em',
                                    fontFamily: '"Space Grotesk", sans-serif',
                                    color: 'white',
                                }}>
                                    Intelligent Stream Orchestrator
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'white', mt: 0.5 }}>
                                    Orchestrating high-performance real-time visual feeds and secure proxy gateways.
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                onClick={() => setAddStream(true)}
                                startIcon={<Plus size={16} />}
                                sx={{
                                    borderRadius: '12px',
                                    fontWeight: 800,
                                    px: 3,
                                    py: 1.2,
                                    fontFamily: '"Space Grotesk", sans-serif',
                                    background: 'linear-gradient(135deg, #0891b2, #22d3ee)',
                                    boxShadow: '0 4px 14px rgba(8, 145, 178, 0.35)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #0e7490, #0891b2)',
                                        boxShadow: '0 6px 20px rgba(8, 145, 178, 0.45)',
                                        transform: 'translateY(-1px)',
                                    },
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                Provision Stream Node
                            </Button>
                        </Box>

                        {/* Stat cards — white glassmorphic with colored left-border accents */}
                        <StatsCards
                            totalStreams={stats.total}
                            clients={stats.clients}
                            uptime={stats.ping}
                        />
                    </Box>

                    {/* Main split grid */}
                    <Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, minWidth: 0 }}>

                            {/* Search + Filter bar */}
                            <SearchToolbar
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                                onAddStream={() => setAddStream(true)}
                            />

                            {/* Stream cards */}
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        md: "repeat(2,1fr)",
                                        xl: "repeat(3,1fr)"
                                    },
                                    gap: 3
                                }}
                            >
                                {filteredStreams.map((stream: any) => (
                                    <StreamCard
                                        key={stream.uniqCode}
                                        stream={stream}
                                        apiBaseUrl={API_BASE_URL}
                                        onPlay={handlePlayVideo}
                                        onDelete={handleDeleteStream}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* Right: Console */}
                        {/* <Box>
                            <ConsoleSidebar logs={logs} onClearLogs={handleClearLogs} />
                        </Box> */}
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
                            crossOrigin="anonymous"
                            style={{ width: '100%', maxHeight: '500px', display: 'block' }}
                        />
                    )}
                </Box>
            </Dialog>
        </>
    )
}

export default MainPage;