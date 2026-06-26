import {
    AppBar,
    Toolbar,
    Container,
    Box,
    Typography,
    Chip,
    IconButton,
    Avatar,
    Badge
} from "@mui/material";

import { Bell } from "lucide-react";
import rtspLogo from "@/assets/logo/rtsp_logo.png";

const AppHeader = () => {
    return (
        <>
            <AppBar
                elevation={0}
                position="fixed"
                sx={{
                    height: 74,
                    background: "rgba(18,20,24,.82)",
                    backdropFilter: "blur(22px)",
                    WebkitBackdropFilter: "blur(22px)",
                    borderBottom: "1px solid rgba(255,255,255,.08)",
                    boxShadow: "none"
                }}
            >
                <Container maxWidth="xl" sx={{ height: "100%" }}>
                    <Toolbar
                        disableGutters
                        sx={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2
                            }}
                        >
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    bgcolor: "#181C22",
                                    border: "1px solid rgba(255,255,255,.08)",
                                    boxShadow: "0 0 30px rgba(24,183,255,.15)"
                                }}
                            >
                                <img
                                    src={rtspLogo}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    variant="h5"
                                    className="gradient-text"
                                    sx={{
                                        fontWeight: 800,
                                        letterSpacing: -.5
                                    }}
                                >
                                    RTSP Manager
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#94A3B8",
                                        fontSize: 13
                                    }}
                                >
                                    AI Powered Stream Management
                                </Typography>
                            </Box>

                            <Chip
                                label="ENTERPRISE"
                                sx={{
                                    ml: 2,
                                    bgcolor: "rgba(24,183,255,.12)",
                                    color: "#7DD3FC",
                                    border: "1px solid rgba(24,183,255,.25)",
                                    fontWeight: 700
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2
                            }}
                        >
                            <Chip
                                label="LIVE"
                                sx={{
                                    bgcolor: "rgba(34,197,94,.15)",
                                    color: "#4ADE80",
                                    border: "1px solid rgba(34,197,94,.25)"
                                }}
                            />

                            <IconButton
                                sx={{
                                    color: "#CBD5E1"
                                }}
                            >
                                <Badge color="error" variant="dot">
                                    <Bell size={18} />
                                </Badge>
                            </IconButton>

                            <Avatar
                                sx={{
                                    bgcolor: "#18B7FF",
                                    fontWeight: 700
                                }}
                            >
                                A
                            </Avatar>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Toolbar sx={{ height: 74 }} />
        </>
    );
};

export default AppHeader;