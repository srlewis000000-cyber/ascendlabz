import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig transition={{ duration: 0.15, ease: "easeOut" }}>
      <App />
      <Analytics />
    </MotionConfig>
  </StrictMode>,
);
