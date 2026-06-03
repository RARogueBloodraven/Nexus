import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { AuthProvider } from './context/AuthContext';
import { MeetingProvider } from './context/meetingcontext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <MeetingProvider>
        <App />
      </MeetingProvider>
    </AuthProvider>
  </StrictMode>
);