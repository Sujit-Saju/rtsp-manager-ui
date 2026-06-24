import { useState, useRef } from "react";
import {
    Box,
    Typography,
    LinearProgress,
    IconButton,
    alpha,
    useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["video/mp4", "video/webm", "video/x-matroska", "video/quicktime"];

interface VideoUploaderProps {
    onFileSelected: (file: File | null) => void;
}

export default function VideoUploader({ onFileSelected }: VideoUploaderProps) {
    const theme = useTheme();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [fileSize, setFileSize] = useState<string>("");
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const formatSize = (bytes: number) =>
        bytes < 1024 * 1024
            ? `${(bytes / 1024).toFixed(1)} KB`
            : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

    const processFile = (file: File) => {
        setError("");
        setPreviewUrl(null);

        if (!ALLOWED_TYPES.includes(file.type)) {
            setError("Invalid file type. Allowed: mp4, webm, mkv, mov.");
            return;
        }

        if (file.size > MAX_SIZE_BYTES) {
            setError(`File too large. Maximum size is ${MAX_SIZE_MB} MB.`);
            return;
        }

        setPreviewUrl(URL.createObjectURL(file));
        setFileName(file.name);
        setFileSize(formatSize(file.size));
        onFileSelected(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    const handleClear = () => {
        setPreviewUrl(null);
        setError("");
        setFileName("");
        setFileSize("");
        onFileSelected(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const usedBytes = fileSize
        ? parseFloat(fileSize) * (fileSize.includes("MB") ? 1024 * 1024 : 1024)
        : 0;
    const usagePercent = Math.min((usedBytes / MAX_SIZE_BYTES) * 100, 100);

    return (
        <Box>
            <input
                ref={inputRef}
                type="file"
                accept="video/mp4,video/webm,video/x-matroska,video/quicktime"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />

            {/* Drop zone — shown when no file selected */}
            {!previewUrl && (
                <Box
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    sx={{
                        border: "1.5px dashed",
                        borderColor: isDragging
                            ? "primary.main"
                            : error
                                ? "error.main"
                                : "divider",
                        borderRadius: 2,
                        px: 3,
                        py: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        backgroundColor: isDragging
                            ? alpha(theme.palette.primary.main, 0.04)
                            : "transparent",
                        "&:hover": {
                            borderColor: "primary.main",
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        },
                    }}
                >
                    <CloudUploadIcon
                        sx={{
                            fontSize: 36,
                            color: isDragging ? "primary.main" : "text.disabled",
                            transition: "color 0.2s",
                        }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                        Drag & drop your video here, or{" "}
                        <Typography
                            component="span"
                            variant="body2"
                            color="primary"
                            sx={{ fontWeight: 600 }}
                        >
                            browse
                        </Typography>
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                        MP4, WebM, MKV, MOV · Max {MAX_SIZE_MB} MB
                    </Typography>
                </Box>
            )}

            {/* Error */}
            {error && (
                <Typography variant="caption" color="error" sx={{ mt: 0.75, display: "block" }}>
                    {error}
                </Typography>
            )}

            {/* Preview */}
            {previewUrl && (
                <Box
                    sx={{
                        border: "0.5px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                >
                    {/* Video */}
                    <Box sx={{ position: "relative", bgcolor: "black" }}>
                        <video
                            src={previewUrl}
                            controls
                            style={{ width: "100%", maxHeight: "260px", display: "block" }}
                        />
                    </Box>

                    {/* File info bar */}
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                                <IconButton size="small" onClick={handleClear} color="error">
                                    <PlayArrowOutlinedIcon sx={{ fontSize: 18, color: "text.secondary", flexShrink: 0 }} />
                                </IconButton>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{ fontWeight: 500, maxWidth: 280 }}
                                >
                                    {fileName}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
                                <Typography variant="caption" color="text.secondary">
                                    {fileSize}
                                </Typography>
                                <IconButton size="small" onClick={handleClear} color="error">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Size progress */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={usagePercent}
                                sx={{
                                    flex: 1,
                                    height: 4,
                                    borderRadius: 2,
                                    bgcolor: "action.hover",
                                    "& .MuiLinearProgress-bar": {
                                        bgcolor: usagePercent > 85 ? "warning.main" : "primary.main",
                                        borderRadius: 2,
                                    },
                                }}
                            />
                            <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
                                {MAX_SIZE_MB} MB max
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
}