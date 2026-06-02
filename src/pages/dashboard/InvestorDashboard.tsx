import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMeetings } from '../../context/meetingcontext';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { meetings } = useMeetings();

  const [searchQuery] = useState('');

  if (!user) return null;

  const sentRequests = getRequestsFromInvestor(user.id);

  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));

  const filteredEntrepreneurs = entrepreneurs.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ FIXED SAFE FILTER (NO BUGS)
  const confirmedMeetings = meetings.filter(m =>
    m.status === 'accepted' &&
    (m.investorId === user.id || m.investorName === user.name)
  );

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Investor Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <Card><CardBody>Total Startups: {entrepreneurs.length}</CardBody></Card>
        <Card><CardBody>Industries: {industries.length}</CardBody></Card>
        <Card>
          <CardBody>
            Connections: {sentRequests.filter(r => r.status === 'accepted').length}
          </CardBody>
        </Card>
      </div>

      {/* CONFIRMED MEETINGS */}
      <Card>
        <CardHeader>
          <h2>Confirmed Meetings</h2>
        </CardHeader>

        <CardBody>
          {confirmedMeetings.length === 0 ? (
            <p className="text-gray-500">No confirmed meetings yet</p>
          ) : (
            confirmedMeetings.map(m => (
              <div key={m.id} className="p-3 border rounded mb-2">
                <p><b>Investor:</b> {m.investorName}</p>
                <p><b>Entrepreneur:</b> {m.entrepreneurName}</p>
                <p><b>Date:</b> {m.date}</p>
              </div>
            ))
          )}
        </CardBody>
      </Card>

      {/* ENTREPRENEURS */}
      <div className="grid grid-cols-3 gap-4">
        {filteredEntrepreneurs.map(e => (
          <EntrepreneurCard key={e.id} entrepreneur={e} />
        ))}
      </div>

    </div>
  );
};