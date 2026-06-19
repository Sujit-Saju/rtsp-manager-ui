# Eoxys RTSP Stream Gateway

An intelligent high-performance surveillance and RTSP stream orchestration dashboard. Designed as a sleek, premium, high-telemetry interface for real-time video surveillance networks, active camera pipeline provisioning, and edge hardware monitoring.

---

## 🚀 Key Features

- **Live Stream Orchestration & Ingestion Dashboard**:
  - Deep obsidian dark interface with real-time analytics panel.
  - Tracking indicators for active encoders, connected sinks, client listeners, and core packet stream precision.
- **WebGL Background Shader**:
  - A responsive background rendering a moving scanline grid with fluid indigo and cyan space aura glow animations (runs on GPU via WebGL).
- **Simulated Computer Vision (CV) Target Overlay**:
  - Live preview modal displaying object detection box locks (e.g., Ingress Operator, Relay Loader, Node Transporter) with active confidence percentages.
  - Simulated network traffic, camera metadata displays, dynamic FPS fluctuations, and bitrate readings (1.8 - 2.4 Mbps).
- **RTSP Node Provisioning Workflow**:
  - Form dialog allowing operator registration of new camera source addresses.
  - Interactive configuration options: resolution ceilings (FHD, HD, 4K), compression codecs (H.264, H.265 HEVC), target framerates (15, 30, 60 FPS), loop buffering, and security paths (Intranet P2P, WAN Optimized Relay, Perimeter Secured Air-Gap).
- **Real-Time System Audit Console**:
  - Stream logs auditing stream status changes, pipeline calibration, and client socket updates.
  - Gateway resource load monitoring widgets tracking live simulated CPU, Memory, and GPU loads via custom SVG ring graphs.
  - Micro-animated network traffic pulse graphics.
- **Proxy Relay Key Copier**:
  - Interactive card actions to instantly copy the proxy/relay gateway address to clipboard with system toast feedback.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vite.dev/) (Pre-configured for fast hot module replacement and build-time assets compilation)
- **Styling**: [Material UI (MUI 9)](https://mui.com/) + [TailwindCSS v4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (Handles dashboard filtering, searching, modal toggles, system logs, and stream configurations)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Shader Graphics**: WebGL Context Canvas (`BackgroundShader.tsx`)

---

## 📂 Project Structure

```text
├── assets/                  # Public assets and static files
│   ├── logo/                # Custom logo assets
│   │   └── rtsp_logo.jpeg   # App logo image
│   └── .aistudio/           # AI Studio / Project IDX metadata configs
├── src/
│   ├── components/
│   │   ├── BackgroundShader.tsx  # WebGL grid & neon aura generator
│   │   ├── ConsoleSidebar.tsx    # Live telemetry widgets & system audit log
│   │   └── StreamPlayer.tsx      # Canvas-based camera simulator & CV bracket drawer
│   ├── store/
│   │   ├── index.ts              # Redux Store configurator & selector typed bindings
│   │   └── streamsSlice.ts       # Main state manager (streams, tab filtering, dialog controllers)
│   ├── App.tsx              # Main dashboard wrapper & layout organizer
│   ├── types.ts             # Shared interfaces (RTSPStream, ConsoleLog, etc.)
│   ├── index.css            # Base stylesheet entry
│   └── main.tsx             # Application bootstrapper
├── index.html               # Main entry HTML document
├── vite.config.ts           # Vite + Tailwind + React integration configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # App dependencies, engines, and run scripts
└── .env.example             # Template for local environment variables
```

---

## ⚙️ Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 2. Install Dependencies
Run the following command in the project directory to install all dependencies:
```bash
npm install
```

### 3. Run Development Server
Start the local Vite development server:
```bash
npm run dev
```
The application will launch by default on [http://localhost:3000](http://localhost:3000) (listening on all interfaces: `0.0.0.0`).

### 4. Build for Production
To generate an optimized production bundle in the `dist` folder:
```bash
npm run build
```

### 5. Type Checking / Linting
Validate the codebase against the TypeScript compile rules:
```bash
npm run lint
```