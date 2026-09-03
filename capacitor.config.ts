import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cz.sebrlicek.rozvrhplus',
  appName: 'Rozvrh+',
  webDir: 'out',
  server: {
    url: 'https://rozvrhplus.vercel.app',
    cleartext: false
  }
};

export default config;
