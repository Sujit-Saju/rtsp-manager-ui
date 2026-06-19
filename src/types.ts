/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RTSPStream {
  id: string;
  name: string;
  sourceUrl: string;
  resolution: string;
  codec: string;
  fps: number;
  networkType: 'LOCAL NETWORK' | 'WAN OPTIMIZED' | 'PERIMETER SECURED';
  liveEndpoint: string;
  isReady: boolean;
  loop: boolean;
  imageUrl?: string;
  createdAt: string;
}

export interface MetricCard {
  label: string;
  value: string | number;
  change?: string;
  icon: string;
  color: string;
}

export interface ServiceMetric {
  name: string;
  value: number;
  color: string;
}

export interface ConsoleLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'error';
  message: string;
}

export type ActiveTab = 'Dashboard' | 'Cluster' | 'Logs' | 'Security';
