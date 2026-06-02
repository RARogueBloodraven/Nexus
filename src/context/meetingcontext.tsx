import React, { createContext, useContext, useState } from 'react';

export type MeetingStatus = 'pending' | 'accepted' | 'rejected';

export interface MeetingRequest {
  id: string;
  investorId: string;
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
      id: '1',
      investorId: 'inv1',
      investorName: 'John Investor',
      entrepreneurName: 'Alice Startup',
      date: '2026-06-10',
      status: 'pending',
    },
    {
      id: '2',
      investorId: 'inv2',
      investorName: 'Sarah Investor',
      entrepreneurName: 'Tech Startup',
      date: '2026-06-12',
      status: 'pending',
    },
    {
      id: '3',
      investorId: 'inv1',
      investorName: 'John Investor',
      entrepreneurName: 'AI Startup',
      date: '2026-06-15',
      status: 'pending',
    },
  ]);

  // ADD MEETING
  const addMeeting = (m: Omit<MeetingRequest, 'id'>) => {
    const newMeeting: MeetingRequest = {
      ...m,
      id: crypto.randomUUID(),
    };

    setMeetings(prev => [...prev, newMeeting]);
  };

  // UPDATE STATUS (Accept / Reject)
  const updateMeetingStatus = (id: string, status: MeetingStatus) => {
    setMeetings(prev =>
      prev.map(m =>
        m.id === id ? { ...m, status } : m
      )
    );
  };

  return (
    <MeetingContext.Provider
      value={{
        meetings,              //FIXED (this was your bug)
        addMeeting,
        updateMeetingStatus,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

// Hook
export const useMeetings = () => {
  const ctx = useContext(MeetingContext);
  if (!ctx) throw new Error('useMeetings must be used inside MeetingProvider');
  return ctx;
};