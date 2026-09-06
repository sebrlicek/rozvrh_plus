import './globals.css';
import InstallPrompt from './InstallPrompt';

export const metadata = {
  title: { default: 'Rozvrh+', template: '%s · Rozvrh+' },
  description: 'Moderní školní organizér: rozvrh, úkoly, kalendář a materiály.',
  manifest: '/manifest.webmanifest',
  applicationName: 'Rozvrh+',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Rozvrh+',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#4f46e5',
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
