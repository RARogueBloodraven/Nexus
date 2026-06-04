import React, { useState } from 'react';
import Joyride from 'react-joyride';
import { useLocation } from 'react-router-dom';

const steps = [
  {
    target: 'body',
    content: 'Welcome to Business Nexus! Let us show you around.',
    placement: 'center',
  },
  {
    target: '.sidebar-dashboard',
    content: 'This sidebar helps you navigate through the platform.',
  },
  {
    taPrget: '.tour-meetings',
    content: 'Manage all meeting requests here.',
  },
  {
    target: '.tour-documents',
    content: 'Upload and sign contracts inside the Document Chamber.',
  },
  {
    target: '.tour-video',
    content: 'Launch video meetings with investors and entrepreneurs.',
  },
];

export const AppTour: React.FC = () => {
  const location = useLocation();

  const [run, setRun] = useState(
    !localStorage.getItem('tourCompleted')
  );

  const handleCallback = (data: any) => {
    const { status } = data;

    if (status === 'finished' || status === 'skipped') {
      localStorage.setItem('tourCompleted', 'true');
      setRun(false);
    }
  };

  if (!location.pathname.includes('dashboard')) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      disableOverlayClose
      callback={handleCallback}
      styles={{
        options: {
          primaryColor: '#2563eb',
          zIndex: 9999,
        },
      }}
    />
  );
};