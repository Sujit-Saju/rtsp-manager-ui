import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    InputAdornment
} from "@mui/material";

import { Plus, Search } from "lucide-react";

interface SearchToolbarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onAddStream: () => void;
}

const filters = [
    "ALL",
    "READY",
    "OFFLINE"
];

export default function SearchToolbar({
    searchTerm,
    onSearchChange,
    onAddStream
}: SearchToolbarProps) {

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 4,
                display: "flex",
                flexDirection: {
                    xs: "column",
                    lg: "row"
                },
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",

                background:
                    "linear-gradient(180deg,#1B1F27 0%,#15181D 100%)",

                border:
                    "1px solid rgba(255,255,255,.08)",

                backdropFilter: "blur(18px)"
            }}
        >

            <TextField
                fullWidth
                size="small"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search stream name, RTSP URL..."
                sx={{
                    maxWidth: 420,

                    "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        color: "#FFF",
                        background: "#111418",

                        "& fieldset": {
                            borderColor: "rgba(255,255,255,.08)",
                        },

                        "&:hover fieldset": {
                            borderColor: "#18B7FF",
                        },

                        "&.Mui-focused fieldset": {
                            borderColor: "#18B7FF",
                        },
                    },

                    "& input::placeholder": {
                        color: "#64748B",
                        opacity: 1,
                    },
                }}
            />

            <Stack
                direction="row"
                spacing={1}
                sx={{
                    flexWrap: "wrap"
                }}
            >
                {filters.map((filter) => (

                    <Button
                        key={filter}
                        variant={
                            filter === "ALL"
                                ? "contained"
                                : "outlined"
                        }
                        sx={{
                            borderRadius: 3,

                            minWidth: 90,

                            fontWeight: 700,

                            textTransform: "none",

                            ...(filter === "ALL"
                                ? {
                                    background:
                                        "linear-gradient(90deg,#18B7FF,#00D4FF)",

                                    color: "#FFF",

                                    "&:hover": {
                                        background:
                                            "linear-gradient(90deg,#00AEEF,#18B7FF)"
                                    }
                                }
                                : {

                                    color: "#CBD5E1",

                                    borderColor:
                                        "rgba(255,255,255,.12)",

                                    "&:hover": {

                                        borderColor: "#18B7FF",

                                        color: "#18B7FF",

                                        background:
                                            "rgba(24,183,255,.08)"
                                    }
                                })
                        }}
                    >
                        {filter}
                    </Button>

                ))}
            </Stack>
        </Paper>
    );
}