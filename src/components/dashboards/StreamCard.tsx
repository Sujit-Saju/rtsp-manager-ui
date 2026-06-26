import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    IconButton,
    Snackbar,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";

import {
    Copy,
    ExternalLink,
    Trash2,
    MonitorPlay
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface StreamCardProps {
    stream: any;
    apiBaseUrl: string;
    onPlay: (uniqCode: string) => void;
    onDelete: (uniqCode: string) => void;
}

export default function StreamCard({
    stream,
    apiBaseUrl,
    onPlay,
    onDelete
}: StreamCardProps) {

    // const copyUrl = () => {
    //     navigator.clipboard.writeText(stream.rtspUrl);
    // };

    const CopyToClipboard = async (text: string) => {
        // 1. Try the modern Async Clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                toast.success("Copied to Clipboard!");
                return;
            } catch (err) {
                console.error("Modern Clipboard API failed:", err);
            }
        }

        // 2. Fallback for non-secure contexts (HTTP) or older browsers
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;

            // Avoid scrolling to bottom of the page when appending
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                toast.success("Copied to Clipboard!");
            } else {
                throw new Error("execCommand copy failed");
            }
        } catch (err) {
            console.error("Fallback Clipboard Error:", err);
            toast.error("Failed To Copy");
        }
    };

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                overflow: "hidden",
                borderRadius: 1.5,

                background:
                    "linear-gradient(180deg,#1A1D24 0%,#15181D 100%)",

                border:
                    "1px solid rgba(255,255,255,.08)",

                transition: ".35s",

                "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: "#18B7FF",
                    boxShadow:
                        "0 20px 40px rgba(24,183,255,.18)"
                }
            }}
        >

            {/* Thumbnail */}

            <Box
                sx={{
                    position: "relative",
                    height: 220,
                    overflow: "hidden"
                }}
            >

                {stream.snapshotPath ? (

                    <CardMedia
                        component="img"
                        image={`${apiBaseUrl}/${stream.snapshotPath}`}
                        sx={{
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />

                ) : (

                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            background:
                                "linear-gradient(135deg,#0F172A,#1E293B)",

                            color: "#18B7FF"
                        }}
                    >
                        <MonitorPlay size={70} />
                    </Box>

                )}

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top,rgba(0,0,0,.75),transparent 60%)"
                    }}
                />

                <Chip
                    label={
                        stream.status
                            ? "LIVE"
                            : "OFFLINE"
                    }
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,

                        fontWeight: 700,

                        bgcolor: stream.status
                            ? "#16A34A"
                            : "#DC2626",

                        color: "#fff"
                    }}
                />

                <Typography
                    sx={{
                        position: "absolute",
                        bottom: 20,
                        left: 20,

                        color: "#fff",

                        fontWeight: 700,

                        fontSize: 22
                    }}
                >
                    {stream.streamName}
                </Typography>

            </Box>

            <CardContent
                sx={{
                    p: 3
                }}
            >

                {/* URL */}

                <Typography
                    sx={{
                        color: "#64748B",
                        fontSize: 12,
                        mb: 1
                    }}
                >
                    RTSP URL
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1,
                        bgcolor: "black",
                        border: "1px solid whitesmoke",
                        borderRadius: "10px"
                    }}
                >

                    <Typography
                        sx={{
                            flex: 1,

                            color: "#E2E8F0",

                            fontFamily: "monospace",

                            overflow: "hidden",

                            whiteSpace: "nowrap",

                            textOverflow: "ellipsis"
                        }}
                    >
                        {stream.rtspUrl}
                    </Typography>

                    <Tooltip title="Copy URL">

                        <IconButton
                            onClick={() => CopyToClipboard(stream?.rtspUrl)}
                            sx={{
                                color: "#18B7FF"
                            }}
                        >
                            <Copy size={16} />
                        </IconButton>

                    </Tooltip>

                </Box>

                <Divider
                    sx={{
                        my: 3,
                        borderColor:
                            "rgba(255,255,255,.08)"
                    }}
                />

                {/* Metadata */}

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >

                    <Box>

                        <Typography
                            variant="caption"
                            color="#64748B"
                        >
                            Resolution
                        </Typography>

                        <Typography
                            color="white"
                            sx={{ fontWeight: 600 }}
                        >
                            {stream.resolution}
                        </Typography>

                    </Box>

                    <Box>

                        <Typography
                            variant="caption"
                            color="#64748B"
                        >
                            FPS
                        </Typography>

                        <Typography
                            color="white"
                            sx={{ fontWeight: 600 }}
                        >
                            {stream.fps}
                        </Typography>

                    </Box>

                    <Box>

                        <Typography
                            variant="caption"
                            color="#64748B"
                        >
                            Status
                        </Typography>

                        <Typography
                            color={
                                stream.status
                                    ? "#22C55E"
                                    : "#EF4444"
                            }
                            sx={{ fontWeight: 600 }}
                        >
                            {stream.status
                                ? "Running"
                                : "Stopped"}
                        </Typography>

                    </Box>

                </Stack>

                <Divider
                    sx={{
                        my: 3,
                        borderColor:
                            "rgba(255,255,255,.08)"
                    }}
                />

                {/* Buttons */}

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<ExternalLink size={16} />}
                        onClick={() =>
                            onPlay(stream.uniqCode)
                        }
                        sx={{
                            borderRadius: 3,

                            py: 1.2,

                            textTransform: "none",

                            fontWeight: 700,

                            background:
                                "linear-gradient(90deg,#18B7FF,#00D4FF)",

                            "&:hover": {
                                background:
                                    "linear-gradient(90deg,#00AEEF,#18B7FF)"
                            }
                        }}
                    >
                        Play Uploaded Video
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                            onDelete(stream.uniqCode)
                        }
                        sx={{
                            minWidth: 56,
                            borderRadius: 3
                        }}
                    >
                        <Trash2 size={18} />
                    </Button>

                </Stack>

            </CardContent>
        </Card>
    );
}