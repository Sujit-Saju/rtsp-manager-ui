import StreamPlayer from '../../components/StreamPlayer';
import { Dialog, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import React from 'react';
import { RTSPStream } from '../../types';

interface LiveStreamPlaybackModalProps {
  previewStream: RTSPStream | null;
  onClose: () => void;
}

const LiveStreamPlaybackModal = ({ previewStream, onClose }: LiveStreamPlaybackModalProps) => {
  return (
    <Dialog
      open={previewStream !== null}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableRestoreFocus
      sx={{ '& .MuiDialog-paper': { borderRadius: '24px', overflow: 'hidden' } }}
    >
      {previewStream && (
        <>
          <DialogContent sx={{ p: 2, backgroundColor: '#070a13' }}>
            <StreamPlayer stream={previewStream} />
          </DialogContent>
          
          <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.06)', backgroundColor: '#070a13', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.5)' }}>
              DECODED RAW FEED · ESTABLISHED {new Date(previewStream.createdAt).toLocaleTimeString()}
            </Typography>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                borderRadius: '12px',
                backgroundColor: 'primary.main',
                fontWeight: 800,
                fontSize: '11.5px',
                px: 3,
                py: 0.8
              }}
            >
              Close Decoder
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default LiveStreamPlaybackModal;