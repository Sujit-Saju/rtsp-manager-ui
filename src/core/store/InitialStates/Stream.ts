export interface Stream {
  id: string;
  uniqCode: string;
  streamName: string;
  sourceType: string;
  fps: number;
  filePath: string;
  resolution?: '1280x720' | '1920x1080' | '3840x2160';
  status?: boolean;
  snapshotPath?: string;
}

export interface Streams {
  data: Stream[];
  isLoading: boolean;
  isSuccess: boolean;
  status: boolean;
  message: string;
}