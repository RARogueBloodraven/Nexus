import React, { createContext, useContext, useState } from 'react';

export type MeetingStatus = 'pending' | 'accepted' | 'rejected';

export interface MeetingRequest {
  id: string;
  investorName: string;
  entrepreneurName: string;
  date: string;
  status: MeetingStatus;
}

interface MeetingContextType {
  meetings: MeetingRequest[];
  addMeeting: (m: Omit<MeetingRequest, 'id'>) => void;
  updateMeetingStatus: (id: string, status: MeetingStatus) => void;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meetings, setMeetings] = useState<MeetingRequest[]>([
    {
      id: 'm1',
      investorName: 'John Investor',
      entrepreneurName: 'Alice Startup',
      date: '2026-06-10',
      status: 'pending',
    },
    {
      id: 'm2',
      investorName: 'Sarah Capital',
      entrepreneurName: 'TechNova',
      date: '2026-06-11',
      status: 'pending',
    },
    {
      id: 'm3',
      investorName: 'Michael Ventures',
      entrepreneurName: 'GreenFoods',
      date: '2026-06-12',
      status: 'pending',
    },
    {
      id: 'm4',
      investorName: 'Ayesha Investments',
      entrepreneurName: 'CloudSync',
      date: '2026-06-13',
      status: 'pending',
    },
  ]);

  const addMeeting = (m: Omit<MeetingRequest, 'id'>) => {
    const newMeeting: MeetingRequest = {
      ...m,
      id: crypto.randomUUID(),
    };

    setMeetings(prev => [...prev, newMeeting]);
  };

  const updateMeetingStatus = (id: string, status: MeetingStatus) => {
    setMeetings(prev =>
      prev.map(m => (m.id === id ? { ...m, status } : m))
    );
  };

  return (
    <MeetingContext.Provider value={{ meetings, addMeeting, updateMeetingStatus }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetings = () => {
  const ctx = useContext(MeetingContext);
  if (!ctx) throw new Error('useMeetings must be used inside provider');
  return ctx;
};