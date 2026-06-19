/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { RTSPStream } from '../types';
import { Play, Pause, RefreshCw, Radio, HardDrive, Cpu, ShieldCheck } from 'lucide-react';

interface StreamPlayerProps {
  stream: RTSPStream;
}

export default function StreamPlayer({ stream }: StreamPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'buffering'>('connecting');
  const [currentFps, setCurrentFps] = useState(stream.fps);
  const [bitrate, setBitrate] = useState<number>(1.2); // Mbps
  const loopPulseRef = useRef(0);

  // Simulate slightly fluctuating metrics (FPS, Bitrate)
  useEffect(() => {
    if (!isPlaying) return;

    setConnectionStatus('connecting');
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
    }, 1200);

    const interval = setInterval(() => {
      setCurrentFps(stream.fps + parseFloat((Math.random() * 0.8 - 0.4).toFixed(1)));
      setBitrate(parseFloat((Math.random() * 0.6 + 1.8).toFixed(2))); // e.g., 1.8 - 2.4 Mbps
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isPlaying, stream]);

  // Canvas Artificial Surveillance Simulation Drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frameCount = 0;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    if (stream.imageUrl) {
      img.src = stream.imageUrl;
    }

    // Mock Object detection boxes
    const mockObjects = [
      { label: 'Ingress Operator', x: 250, y: 120, w: 90, h: 180, confidence: 99 },
      { label: 'Relay Loader', x: 420, y: 150, w: 180, h: 220, confidence: 94 },
      { label: 'Node Transporter [ID:92]', x: 80, y: 220, w: 150, h: 140, confidence: 88 },
      { label: 'GPU Node Delta-4', x: 300, y: 100, w: 120, h: 240, confidence: 97 },
      { label: 'Security Gate Main', x: 550, y: 90, w: 80, h: 160, confidence: 91 },
    ];

    const draw = () => {
      if (!ctx || !canvas) return;
      frameCount++;

      const w = canvas.width;
      const h = canvas.height;

      // Ensure canvas background is deep
      ctx.fillStyle = '#080a10';
      ctx.fillRect(0, 0, w, h);

      // Draw Base Image
      if (stream.imageUrl && img.complete) {
        ctx.drawImage(img, 0, 0, w, h);
      } else {
        // Draw elegant mathematical matrix if image is loading
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 1;
        for (let i = 0; i < w; i += 40) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, h);
          ctx.stroke();
        }
        for (let j = 0; j < h; j += 40) {
          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(w, j);
          ctx.stroke();
        }
        ctx.fillStyle = '#818cf8';
        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.fillText('ESTABLISHING SECURE GATEWAY ENCRYPTION...', w / 2 - 160, h / 2);
      }

      // Live Overlay effects
      if (isPlaying) {
        if (connectionStatus === 'connecting') {
          // Connecting Overlay
          ctx.fillStyle = 'rgba(8, 10, 16, 0.85)';
          ctx.fillRect(0, 0, w, h);

          ctx.fillStyle = '#22d3ee';
          ctx.font = '14px "JetBrains Mono", monospace';
          const text = 'DECRYPTING CLIENT RTSP STREAM KEY...';
          ctx.fillText(text, w / 2 - 140, h / 2 - 10);

          // Spinning progress indicator
          ctx.strokeStyle = '#6366f1';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(w / 2, h / 2 + 35, 16, 0, (frameCount * 0.1) % (Math.PI * 2));
          ctx.stroke();
        } else {
          // Connected Overlay Surveillance Graphics

          // Draw Scan lines
          const scanY = (frameCount * 1.5) % h;
          ctx.fillStyle = 'rgba(99, 102, 241, 0.05)';
          ctx.fillRect(0, scanY - 3, w, 6);

          // Computer Vision bounding boxes
          const activeIndices = stream.id.includes('north') ? [0, 1, 2] : [3, 4];
          
          activeIndices.forEach((idx) => {
            const obj = mockObjects[idx];
            if (!obj) return;

            // Slight offset/jitter animation to look active
            const jitterX = Math.sin(frameCount * 0.04 + idx) * 1.5;
            const jitterY = Math.cos(frameCount * 0.03 + idx) * 1;

            const ox = obj.x + jitterX;
            const oy = obj.y + jitterY;
            const ow = obj.w;
            const oh = obj.h;

            // Draw bounding lock corners
            ctx.strokeStyle = idx % 2 === 0 ? '#00ffd4' : '#818cf8';
            ctx.lineWidth = 1.5;
            
            // Draw custom bracket corners for tech feel
            const len = 10;
            // Top Left
            ctx.beginPath();
            ctx.moveTo(ox, oy + len); ctx.lineTo(ox, oy); ctx.lineTo(ox + len, oy);
            ctx.stroke();
            // Top Right
            ctx.beginPath();
            ctx.moveTo(ox + ow - len, oy); ctx.lineTo(ox + ow, oy); ctx.lineTo(ox + ow, oy + len);
            ctx.stroke();
            // Bottom Left
            ctx.beginPath();
            ctx.moveTo(ox, oy + oh - len); ctx.lineTo(ox, oy + oh); ctx.lineTo(ox + len, oy + oh);
            ctx.stroke();
            // Bottom Right
            ctx.beginPath();
            ctx.moveTo(ox + ow - len, oy + oh); ctx.lineTo(ox + ow, oy + oh); ctx.lineTo(ox + ow, oy + oh - len);
            ctx.stroke();

            // Box interior fill
            ctx.fillStyle = idx % 2 === 0 ? 'rgba(0, 255, 212, 0.03)' : 'rgba(99, 102, 241, 0.02)';
            ctx.fillRect(ox, oy, ow, oh);

            // Bounding Text Label
            ctx.fillStyle = idx % 2 === 0 ? '#00ffd4' : '#818cf8';
            ctx.font = '10px "JetBrains Mono", sans-serif';
            ctx.fillText(`[ ${obj.label.toUpperCase()} : ${obj.confidence}% ]`, ox, oy - 5);
          });

          // Draw Reticle / Target System in center
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, 35, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(w / 2 - 50, h / 2); ctx.lineTo(w / 2 - 15, h / 2);
          ctx.moveTo(w / 2 + 15, h / 2); ctx.lineTo(w / 2 + 50, h / 2);
          ctx.moveTo(w / 2, h / 2 - 50); ctx.lineTo(w / 2, h / 2 - 15);
          ctx.moveTo(w / 2, h / 2 + 15); ctx.lineTo(w / 2, h / 2 + 50);
          ctx.stroke();

          // Text metrics (Left Panel)
          ctx.fillStyle = '#f4f4f7';
          ctx.font = '11px "JetBrains Mono", monospace';
          ctx.fillText(`FMT:   RTSP / ENCRYPTED`, 15, 25);
          ctx.fillText(`RES:   ${stream.resolution}`, 15, 40);
          ctx.fillText(`CODEC: ${stream.codec}`, 15, 55);
          ctx.fillText(`FPS:   ${currentFps.toFixed(1)} / SEG`, 15, 70);
          ctx.fillText(`LOAD:  ${bitrate.toFixed(2)} MB/S`, 15, 85);

          // Timestamp overlay (Bottom Left)
          const now = new Date();
          const timeStr = now.toISOString().replace('T', ' ').slice(0, 22);
          ctx.fillStyle = 'rgba(244, 244, 247, 0.85)';
          ctx.font = '11px "JetBrains Mono", monospace';
          ctx.fillText(timeStr, 15, h - 15);

          // Top right status indicators
          ctx.beginPath();
          ctx.fillStyle = '#10b981'; // Green dot
          ctx.arc(w - 18, 20, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#10b981';
          ctx.font = '10px "JetBrains Mono", sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText('● ACCREDITED FEED', w - 28, 23);

          if (stream.loop) {
            loopPulseRef.current += 0.05;
            const loopGlow = 0.6 + Math.sin(loopPulseRef.current) * 0.3;
            ctx.fillStyle = `rgba(34, 211, 238, ${loopGlow})`;
            ctx.fillText('🔁 CORE AUTOLOOP', w - 18, h - 15);
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillText('⚡ SINGLE PIPELINE PASS', w - 18, h - 15);
          }
          ctx.textAlign = 'left'; // reset
        }
      } else {
        // Paused Overlay
        ctx.fillStyle = 'rgba(8, 10, 16, 0.85)';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 13px "JetBrains Mono", monospace';
        ctx.fillText('RTSP PIPELINE SUSPENDED', w / 2 - 80, h / 2);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, connectionStatus, currentFps, bitrate, stream]);

  return (
    <div className="flex flex-col bg-[#11131f] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
      {/* Simulation Screen Header */}
      <div className="bg-[#181a28] px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-xs font-mono font-extrabold tracking-wider text-zinc-200">
            {stream.name.toUpperCase()} FEED
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-400">
          <div className="flex items-center gap-1">
            <Radio size={12} className="text-cyan-400" />
            <span>ENCRYPTED</span>
          </div>
          {stream.loop && (
            <div className="flex items-center gap-1 text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              <RefreshCw size={10} className="animate-spin text-indigo-400" style={{ animationDuration: '4s' }} />
              <span>LOOP</span>
            </div>
          )}
        </div>
      </div>

      {/* Simulator canvas */}
      <div className="relative aspect-video bg-[#080a10]">
        <canvas
          ref={canvasRef}
          width={640}
          height={360}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Controller Bars */}
      <div className="p-3.5 bg-[#181a28] flex items-center justify-between border-t border-zinc-800 font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-900 hover:bg-indigo-600 text-zinc-300 hover:text-white transition-all active:scale-95 cursor-pointer border border-zinc-800"
            title={isPlaying ? 'Suspend Ingest' : 'Resume Live Ingest'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>
          
          <button
            onClick={() => {
              setConnectionStatus('connecting');
              setTimeout(() => setConnectionStatus('connected'), 1000);
            }}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-zinc-350 border border-zinc-800 transition-all cursor-pointer"
            title="Calibrate Connection"
          >
            <RefreshCw size={13} className="text-zinc-400" />
          </button>
        </div>

        <div className="text-[10.5px] text-zinc-400 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Cpu size={12} className="text-indigo-400" />
            <span>NODE-MAPPED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HardDrive size={12} className="text-cyan-400" />
            <span>SECURE STASH</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-emerald-400" />
            <span>100% SECURE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
