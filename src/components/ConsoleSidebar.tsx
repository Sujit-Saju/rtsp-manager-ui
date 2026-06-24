/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import { ConsoleLog } from '../types';
import { Terminal, Shield, RefreshCw, Layers } from 'lucide-react';

interface ConsoleSidebarProps {
  logs: any[];
  onClearLogs?: () => void;
}

export default function ConsoleSidebar({ logs, onClearLogs }: ConsoleSidebarProps) {
  // Fluid live metrics
  const [latency, setLatency] = useState(1.2);
  const [cpuVal, setCpuVal] = useState(74);
  const [memoryVal, setMemoryVal] = useState(42);
  const [gpuSyncVal, setGpuSyncVal] = useState(88);
  const [bandwidthVal, setBandwidthVal] = useState(66);
  const [throughput, setThroughput] = useState(4.21);

  // Fluctuating signal graph bars
  const [barHeights, setBarHeights] = useState([20, 40, 80, 60, 30, 50, 70, 90]);

  // Handle auto-scroll of console logs
  const logsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Slow fluctuations to mimic live telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(parseFloat((1.1 + Math.random() * 0.2).toFixed(2)));
      setCpuVal((prev) => Math.min(95, Math.max(60, prev + Math.floor(Math.random() * 5 - 2))));
      setMemoryVal((prev) => Math.min(80, Math.max(35, prev + Math.floor(Math.random() * 3 - 1))));
      setGpuSyncVal((prev) => Math.min(100, Math.max(82, prev + Math.floor(Math.random() * 3 - 1.5))));
      setBandwidthVal((prev) => Math.min(90, Math.max(50, prev + Math.floor(Math.random() * 4 - 2))));
      setThroughput(parseFloat((3.8 + Math.random() * 0.8).toFixed(2)));

      // Randomize bar heights for traffic pulse
      setBarHeights((prev) =>
        prev.map((h) => Math.min(100, Math.max(10, h + Math.floor(Math.random() * 30 - 15))))
      );
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#11131f',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'sticky',
        top: '100px',
        color: '#f4f4f7'
      }}
    >
      {/* Realtime Console Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Terminal size={18} className="text-indigo-400" />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f4f4f7', letterSpacing: '-0.02em', fontFamily: '"Space Grotesk", sans-serif' }}>
            System Console
          </Typography>
        </Box>
        <Chip
          label="LIVE DATA"
          size="small"
          sx={{
            height: '18px',
            fontSize: '8px',
            fontWeight: 900,
            letterSpacing: '0.1em',
            borderRadius: '6px',
            backgroundColor: 'rgba(6, 182, 212, 0.15)',
            color: '#22d3ee',
            border: '1px solid rgba(6, 182, 212, 0.2)'
          }}
        />
      </Box>

      {/* Live Radar Beat Widget */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          backgroundColor: 'rgba(6, 182, 212, 0.02)',
          borderRadius: '16px',
          border: '1px solid rgba(6, 182, 212, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, position: 'relative' }}>
          {/* Animated radar rings inside */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '50%',
              animation: 'pulse 2s infinite ease-in-out'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 8,
              border: '1px solid rgba(99, 102, 241, 0.15)',
              borderRadius: '50%'
            }}
          />
          <Box sx={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(6, 182, 212, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
            <RefreshCw size={18} className="text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace', color: '#f4f4f7', fontSize: '11px', textTransform: 'uppercase', tracking: '0.05em' }}>
            Telemetry Ping
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '10.5px', mt: 0.5, display: 'block' }}>
            Average Latency: <span style={{ color: '#22d3ee', fontWeight: 700 }}>{latency}s</span>
          </Typography>
        </Box>
      </Box>

      {/* Service Health circular displays */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', pb: 1, mb: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
            GATEWAY RESOURCE LOAD
          </Typography>
          <Shield size={12} className="text-indigo-400" />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 1.5 }}>
          {/* CPU circular progress */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 1.5, backgroundColor: 'rgba(99, 102, 241, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
            <Box sx={{ position: 'relative', width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-zinc-800" cx="26" cy="26" fill="transparent" r="21" stroke="currentColor" strokeWidth="2.5" />
                <circle
                  className="text-indigo-400"
                  cx="26"
                  cy="26"
                  fill="transparent"
                  r="21"
                  stroke="currentColor"
                  strokeDasharray="132"
                  strokeDashoffset={132 - (132 * cpuVal) / 100}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <Typography variant="caption" sx={{ position: 'absolute', fontWeight: 800, fontFamily: 'monospace', color: '#f4f4f7', fontSize: '10px' }}>
                {cpuVal}%
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ fontSize: '8.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>CPU CORE</Typography>
          </Box>

          {/* Memory progress */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 1.5, backgroundColor: 'rgba(6, 182, 212, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
            <Box sx={{ position: 'relative', width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-zinc-800" cx="26" cy="26" fill="transparent" r="21" stroke="currentColor" strokeWidth="2.5" />
                <circle
                  className="text-cyan-400"
                  cx="26"
                  cy="26"
                  fill="transparent"
                  r="21"
                  stroke="currentColor"
                  strokeDasharray="132"
                  strokeDashoffset={132 - (132 * memoryVal) / 100}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <Typography variant="caption" sx={{ position: 'absolute', fontWeight: 800, fontFamily: 'monospace', color: '#f4f4f7', fontSize: '10px' }}>
                {memoryVal}%
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ fontSize: '8.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>RAM USAGE</Typography>
          </Box>

          {/* GPU Sync percentage */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 1.5, backgroundColor: 'rgba(99, 102, 241, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
            <Box sx={{ position: 'relative', width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-zinc-800" cx="26" cy="26" fill="transparent" r="21" stroke="currentColor" strokeWidth="2.5" />
                <circle
                  className="text-indigo-400"
                  cx="26"
                  cy="26"
                  fill="transparent"
                  r="21"
                  stroke="currentColor"
                  strokeDasharray="132"
                  strokeDashoffset={132 - (132 * gpuSyncVal) / 100}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <Typography variant="caption" sx={{ position: 'absolute', fontWeight: 800, fontFamily: 'monospace', color: '#f4f4f7', fontSize: '10px' }}>
                {gpuSyncVal}%
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ fontSize: '8.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>GPU CORE</Typography>
          </Box>

          {/* Bandwidth Usage */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 1.5, backgroundColor: 'rgba(16, 185, 129, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
            <Box sx={{ position: 'relative', width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-zinc-800" cx="26" cy="26" fill="transparent" r="21" stroke="currentColor" strokeWidth="2.5" />
                <circle
                  className="text-emerald-400"
                  cx="26"
                  cy="26"
                  fill="transparent"
                  r="21"
                  stroke="currentColor"
                  strokeDasharray="132"
                  strokeDashoffset={132 - (132 * bandwidthVal) / 100}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <Typography variant="caption" sx={{ position: 'absolute', fontWeight: 800, fontFamily: 'monospace', color: '#f4f4f7', fontSize: '10px' }}>
                {bandwidthVal}%
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ fontSize: '8.5px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>NET LOAD</Typography>
          </Box>
        </Box>
      </Box>

      {/* Traffic Pulse simulation */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', pb: 1, mb: 1.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
            REALTIME THROUGHPUT
          </Typography>
          <Layers size={12} className="text-indigo-450" />
        </Box>
        <Box sx={{ backgroundColor: 'rgba(99, 102, 241, 0.02)', p: 1.8, borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'monospace', mb: 1.5 }}>
            <span style={{ color: '#94a3b8' }}>ENGINES LOAD</span>
            <b style={{ color: '#818cf8' }}>{throughput.toFixed(2)} Gb/s</b>
          </Box>
          <Box sx={{ height: 48, display: 'flex', alignItems: 'end', gap: 0.5 }}>
            {barHeights.map((h, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  borderRadius: '2px 2px 0 0',
                  background: 'linear-gradient(to top, rgba(99, 102, 241, 0.05), #6366f1)',
                  height: `${h}%`,
                  transition: 'height 1s ease'
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Live System Log stream */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '160px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', pb: 1, mb: 1.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
            NODE HANDSHAKE STREAM
          </Typography>
          {onClearLogs && (
            <Button
              onClick={onClearLogs}
              size="small"
              sx={{
                p: 0,
                minWidth: 0,
                fontFamily: 'monospace',
                fontSize: '9.5px',
                fontWeight: 800,
                color: '#94a3b8',
                textTransform: 'uppercase',
                '&:hover': { color: '#818cf8', background: 'none' }
              }}
            >
              Flush
            </Button>
          )}
        </Box>

        <Box
          ref={logsContainerRef}
          sx={{
            flex: 1,
            minHeight: '120px',
            maxHeight: '220px',
            overflowY: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            p: 1.5,
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            fontFamily: 'monospace',
            fontSize: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: 0.8,
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '2px'
            }
          }}
        >
          {logs.length === 0 ? (
            <Typography variant="caption" sx={{ color: '#64748b', fontStyle: 'italic', display: 'block', textAlign: 'center', my: 'auto' }}>
              Null queue stream
            </Typography>
          ) : (
            logs.map((log) => {
              let tagColor = '#94a3b8'; // info
              let msgColor = '#cbd5e1';
              if (log.level === 'success') {
                tagColor = '#34d399';
                msgColor = '#a7f3d0';
              } else if (log.level === 'warn') {
                tagColor = '#fbbf24';
                msgColor = '#fde68a';
              } else if (log.level === 'error') {
                tagColor = '#f87171';
                msgColor = '#fca5a5';
              }

              return (
                <Box key={log.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.8, lineHeight: 1.4 }}>
                  <span style={{ color: '#475569', flexShrink: 0 }}>{log.timestamp}</span>
                  <span style={{ color: tagColor, fontWeight: 700, flexShrink: 0 }}>
                    {/* [{log.level.toUpperCase()}] */}
                  </span>
                  <span style={{ color: msgColor, wordBreak: 'break-all' }}>
                    {log.message}
                  </span>
                </Box>
              );
            })
          )}
        </Box>
      </Box>
    </Paper>
  );
}
