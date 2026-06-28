# RTSP Manager — UI

The frontend for RTSP Manager. A dark-themed dashboard for provisioning and managing RTSP video streams. Upload a video, set the stream parameters, and get a live RTSP URL you can paste directly into VLC, OpenCV, or any RTSP player.

> **Requires the [rtsp-manager-server](https://github.com/sujit-saju/rtsp-manager-server) to be running.**

---

## Features

- Provision new RTSP stream nodes with name, resolution (720p → 4K), and frame rate
- View all active streams with snapshot thumbnails and live/offline status
- Copy the RTSP URL to clipboard in one click
- Play back the uploaded source video directly in the browser
- Delete streams (also removes the file from the server)
- Real-time search and filter across all streams
- Stats overview — total streams, active clients, uptime

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** — build tooling and dev server
- **MUI v9** — UI components and dark theme
- **Tailwind CSS v4** — utility styling
- **Redux Toolkit** — global state management
- **Formik + Yup** — form handling and validation
- **Axios** — API communication with interceptors
- **Lucide React** — icons
- **React Hot Toast** — notifications

---

## Project Structure

```
src/
├── pages/
│   └── MainPage/
│       ├── index.tsx           # Main dashboard layout
│       └── AddStreamModal.tsx  # Provision stream form
├── components/
│   ├── StreamPlayer.tsx        # Canvas-based stream viewer
│   ├── dashboards/
│   │   ├── StreamCard.tsx      # Individual stream card
│   │   ├── StatsCard.tsx       # Summary stats row
│   │   └── SearchToolBar.tsx   # Search and filter bar
│   └── layout/
│       └── AppHeader.tsx       # Top navigation bar
├── core/
│   ├── store/                  # Redux store, slices, async thunks
│   ├── service/                # API service layer
│   └── api/                    # Axios instance + interceptors
└── theme.ts                    # MUI dark theme config
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- The [rtsp-manager-server](https://github.com/sujit-saju/rtsp-manager-server) running locally

### Setup

```bash
# Clone the repo
git clone https://github.com/sujit-saju/rtsp-manager-ui.git
cd rtsp-manager-ui

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Set VITE_APP_API_URL to your backend URL

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_APP_API_URL` | Base URL of the backend API | `http://192.168.0.234:5000` |

---

## Usage

1. Open the dashboard at `http://localhost:3000`
2. Click **Provision Stream Node**
3. Enter a stream name, upload a video file, choose resolution and FPS
4. Click **Provision Node** — the RTSP URL appears on the stream card within seconds
5. Copy the URL and use it in VLC, OpenCV, GStreamer, or any RTSP client

---

## License

MIT — see [LICENSE](LICENSE) for details.
