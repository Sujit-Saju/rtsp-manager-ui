import { Box, Paper, Typography } from "@mui/material";
import {
    Activity,
    Video,
    Users,
    Cpu
} from "lucide-react";

interface Props {
    totalStreams: number;
    clients: number;
    uptime: string;
}

const cards = (
    totalStreams: number,
    clients: number,
    uptime: string
) => [
        {
            title: "Active Streams",
            value: totalStreams,
            subtitle: "Currently Available",
            icon: Video,
            color: "#18B7FF"
        },
        {
            title: "Connected Clients",
            value: clients,
            subtitle: "Across Network",
            icon: Users,
            color: "#34D399"
        },
        {
            title: "Server Uptime",
            value: uptime,
            subtitle: "System Health",
            icon: Activity,
            color: "#F59E0B"
        },
        {
            title: "CPU Usage",
            value: "21%",
            subtitle: "Current Load",
            icon: Cpu,
            color: "#A855F7"
        }
    ];

export default function StatsCards({
    totalStreams,
    clients,
    uptime
}: Props) {

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2,1fr)",
                    xl: "repeat(4,1fr)"
                },
                gap: 3
            }}
        >
            {cards(totalStreams, clients, uptime).map((item) => {

                const Icon = item.icon;

                return (
                    <Paper
                        key={item.title}
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 1.5,
                            position: "relative",
                            overflow: "hidden",

                            background:
                                "linear-gradient(180deg,#1A1D24 0%,#15181D 100%)",

                            border:
                                "1px solid rgba(255,255,255,.08)",

                            transition: ".35s",

                            "&:hover": {
                                transform: "translateY(-6px)",
                                borderColor: item.color,
                                boxShadow: `0 20px 45px ${item.color}25`
                            }
                        }}
                    >

                        <Box
                            sx={{
                                position: "absolute",
                                top: -30,
                                right: -30,
                                width: 120,
                                height: 120,
                                borderRadius: "50%",
                                background: `${item.color}18`,
                                filter: "blur(20px)"
                            }}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <Box>

                                <Typography
                                    sx={{
                                        color: "#94A3B8",
                                        fontSize: 12,
                                        letterSpacing: 1,
                                        textTransform: "uppercase"
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 1,
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: 34
                                    }}
                                >
                                    {item.value}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#64748B",
                                        mt: .5,
                                        fontSize: 13
                                    }}
                                >
                                    {item.subtitle}
                                </Typography>

                            </Box>

                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 3,

                                    background: `${item.color}18`,

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    border: `1px solid ${item.color}40`
                                }}
                            >
                                <Icon
                                    size={28}
                                    color={item.color}
                                />
                            </Box>

                        </Box>

                    </Paper>
                );
            })}
        </Box>
    );
}