export type MeetingStatus = 'pending' | 'accepted' | 'rejected';

export interface MeetingRequest {
  id: string;
  investorName: string;
  entrepreneurName: string;
  date: string;
  status: MeetingStatus;
}

export const meetings: MeetingRequest[] = [
  {
    id: '1',
    investorName: 'John Investor',
    entrepreneurName: 'Alice Startup',
    date: '2026-06-10',
    status: 'pending',
  },
];