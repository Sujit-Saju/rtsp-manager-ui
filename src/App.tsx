/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";

import theme from "./theme";
import MainPage from "./pages/MainPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",

          background: `
            radial-gradient(circle at top,
              rgba(24,183,255,.10),
              transparent 35%),
            linear-gradient(
              180deg,
              #111317 0%,
              #0F1013 100%
            )
          `,
        }}
      >
        {/* Top glow */}
        <Box
          sx={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 450,
            height: 450,
            borderRadius: "50%",
            background: "rgba(24,183,255,.12)",
            filter: "blur(140px)",
            pointerEvents: "none",
          }}
        />

        {/* Bottom glow */}
        <Box
          sx={{
            position: "absolute",
            bottom: -120,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(24,183,255,.08)",
            filter: "blur(100px)",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            minHeight: "100vh",
          }}
        >
          <MainPage />
          <Toaster position="top-center" reverseOrder={false} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}