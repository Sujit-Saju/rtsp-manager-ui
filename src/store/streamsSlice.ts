/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RTSPStream, ConsoleLog, ActiveTab } from '../types';

interface NewStreamForm {
  name: string;
  sourceUrl: string;
  resolution: string;
  codec: string;
  fps: number;
  networkType: 'LOCAL NETWORK' | 'WAN OPTIMIZED' | 'PERIMETER SECURED';
  loop: boolean;
}

interface StreamsState {
  streams: RTSPStream[];
  logs: ConsoleLog[];
  activeTab: ActiveTab;
  searchTerm: string;
  filterType: 'ALL' | 'READY' | 'OFFLINE';
  toastMessage: string | null;
  isCreateOpen: boolean;
  previewStream: RTSPStream | null;
  newStream: NewStreamForm;
}

const initialStreams: RTSPStream[] = [
  {
    id: 'north-gate-surveillance',
    name: 'North Gate Surveillance',
    sourceUrl: 'rtsp://192.168.1.50:554/live/main',
    resolution: '1920x1080',
    codec: 'H.264',
    fps: 30,
    networkType: 'LOCAL NETWORK',
    liveEndpoint: 'rtsp://192.168.0.10:8554/north-gate',
    isReady: true,
    loop: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZAtGVN3gcp7aShKmjzVKuq-wyYqN8f9b5JVhcuJCQe6bW3DkUf-ogL4D8-mnkJD42g1fXvlEBmQydnyGNEePznkKfP_dpYP1NG9C3_PwC7FsYnDAnXmG2bXIZwFZQXDQWfuYyB7rJAPiMyrb9SwQQv4MdpxTvQ7dokzojdqnHyJ3XJ4XszBiNANdNpmKnxNimlJoon78Jngu4EmJcVZfCe6rQY7FMpacVtOkwE45TlU6GL2uWJcbHPdLGip9Y6EDcNIqeuKuDw49P',
    createdAt: '2026-06-12T01:30:11-07:00'
  },
  {
    id: 'server-room-delta',
    name: 'Server Room Delta',
    sourceUrl: 'rtsp://10.0.4.12:8554/delta-stream',
    resolution: '1280x720',
    codec: 'H.265',
    fps: 15,
    networkType: 'WAN OPTIMIZED',
    liveEndpoint: 'rtsp://192.168.0.10:8554/server-delta',
    isReady: true,
    loop: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpSJ9IbKB4UEFwW0b7bWD7FyXL4tFVmwIhu11TeLpjLyyVJXKR17N3YNG8IRot4S2bvNyqlHECIgKJOPmpilJutpEBykd7q6knZVl1dFAgB_43B-hfeYWC5SmCmsK1T-gXP4qyodRj5FWOcv1bMA3Bb31w9IpXizjutxqJFlwzlp2zN4SsvI3cJVpzotSM3iqHlb9dic4ZtI51JIJZD_d6Yc5EbQekCLVuAKzSM3JY-8GcPtL5aUhGwTEwXkpqqG8Tj2XwJc2AV8eF',
    createdAt: '2026-06-12T02:11:45-07:00'
  },
  {
    id: 'perimeter-fence-west',
    name: 'Perimeter Fence West',
    sourceUrl: 'rtsp://192.168.1.55:554/stream1',
    resolution: '3840x2160',
    codec: 'H.265',
    fps: 30,
    networkType: 'PERIMETER SECURED',
    liveEndpoint: 'rtsp://192.168.0.10:8554/fence-west',
    isReady: true,
    loop: false,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-06-12T02:45:00-07:00'
  },
  {
    id: 'hq-main-lobby',
    name: 'HQ Main Lobby',
    sourceUrl: 'rtsp://192.168.1.200:554/cam1',
    resolution: '1920x1080',
    codec: 'H.264',
    fps: 30,
    networkType: 'LOCAL NETWORK',
    liveEndpoint: 'rtsp://192.168.0.10:8554/lobby-main',
    isReady: false,
    loop: true,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-06-12T03:02:10-07:00'
  }
];

const initialLogs: ConsoleLog[] = [
  { id: '1', timestamp: '10:15:30.22', level: 'info', message: 'Master eoxys surveillance gateway booted successfully' },
  { id: '2', timestamp: '10:15:31.42', level: 'success', message: 'Handshake complete with local relay coordinator [PORT: 8554]' },
  { id: '3', timestamp: '10:15:32.08', level: 'info', message: 'GPU Cluster Load-balancer calibrated 3 cloud pipelines' },
  { id: '4', timestamp: '10:15:34.90', level: 'success', message: 'Stream ingestion link established for: North Gate Surveillance' },
  { id: '5', timestamp: '10:15:35.12', level: 'success', message: 'Stream ingestion link established for: Server Room Delta [H.265]' },
  { id: '6', timestamp: '10:20:01.11', level: 'warn', message: 'HQ Main Lobby signal drops detected: retrying ingestion pipeline' }
];

const initialForm: NewStreamForm = {
  name: '',
  sourceUrl: 'rtsp://192.168.1.100:554/stream',
  resolution: '1920x1080',
  codec: 'H.264',
  fps: 30,
  networkType: 'LOCAL NETWORK',
  loop: true,
};

const initialState: StreamsState = {
  streams: initialStreams,
  logs: initialLogs,
  activeTab: 'Dashboard',
  searchTerm: '',
  filterType: 'ALL',
  toastMessage: null,
  isCreateOpen: false,
  previewStream: null,
  newStream: initialForm
};

const streamsSlice = createSlice({
  name: 'streams',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<ActiveTab>) => {
      state.activeTab = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilterType: (state, action: PayloadAction<'ALL' | 'READY' | 'OFFLINE'>) => {
      state.filterType = action.payload;
    },
    setToastMessage: (state, action: PayloadAction<string | null>) => {
      state.toastMessage = action.payload;
    },
    setIsCreateOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateOpen = action.payload;
      if (action.payload) {
        state.newStream = { ...initialForm };
      }
    },
    setPreviewStream: (state, action: PayloadAction<RTSPStream | null>) => {
      state.previewStream = action.payload;
    },
    updateNewStreamField: <K extends keyof NewStreamForm>(
      state: StreamsState,
      action: PayloadAction<{ field: K; value: NewStreamForm[K] }>
    ) => {
      state.newStream[action.payload.field] = action.payload.value;
    },
    addLog: (state, action: PayloadAction<{ level: 'info' | 'success' | 'warn' | 'error'; message: string }>) => {
      const time = new Date();
      const formatted = `${time.toTimeString().slice(0, 8)}.${String(time.getMilliseconds()).padStart(2, '0')}`;
      state.logs.push({
        id: String(Date.now() + Math.random()),
        timestamp: formatted,
        level: action.payload.level,
        message: action.payload.message
      });
    },
    clearLogs: (state) => {
      const time = new Date();
      const formatted = `${time.toTimeString().slice(0, 8)}.${String(time.getMilliseconds()).padStart(2, '0')}`;
      state.logs = [
        { id: String(Date.now()), timestamp: formatted, level: 'info', message: 'Stream execution audit trail wiped. Restarting recorder.' }
      ];
    },
    addStream: (state, action: PayloadAction<RTSPStream>) => {
      state.streams.push(action.payload);
    },
    deleteStream: (state, action: PayloadAction<string>) => {
      state.streams = state.streams.filter((s) => s.id !== action.payload);
      if (state.previewStream?.id === action.payload) {
        state.previewStream = null;
      }
    }
  }
});

export const {
  setActiveTab,
  setSearchTerm,
  setFilterType,
  setToastMessage,
  setIsCreateOpen,
  setPreviewStream,
  updateNewStreamField,
  addLog,
  clearLogs,
  addStream,
  deleteStream
} = streamsSlice.actions;

export default streamsSlice.reducer;
