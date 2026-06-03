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

  // Investor requests (optional stats)
  const sentRequests = getRequestsFromInvestor(user.id);

  // Industries list
  const industries = Array.from(
    new Set(entrepreneurs.map(e => e.industry))
  );

  // Filter entrepreneurs
  const filteredEntrepreneurs = entrepreneurs.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // SAFE DEBUG FILTER (NO SILENT FAILURES)
  const confirmedMeetings = meetings.filter(m =>
    m.status === 'accepted' &&
    (m.investorId === user.id || m.investorName === user.name)
  );

  // 🔍 DEBUG (REMOVE LATER IF NEEDED)
  console.log('USER ID:', user.id);
  console.log('MEETINGS:', meetings);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold text-gray-900">
        Investor Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Total Startups</p>
            <h3 className="text-xl font-bold">{entrepreneurs.length}</h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Industries</p>
            <h3 className="text-xl font-bold">{industries.length}</h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Connections</p>
            <h3 className="text-xl font-bold">
              {sentRequests.filter(r => r.status === 'accepted').length}
            </h3>
          </CardBody>
        </Card>

      </div>

      {/* CONFIRMED MEETINGS */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">
            Confirmed Meetings
          </h2>
        </CardHeader>

        <CardBody>
          {confirmedMeetings.length === 0 ? (
            <p className="text-gray-500">
              No confirmed meetings yet
            </p>
          ) : (
            <div className="space-y-3">
              {confirmedMeetings.map(m => (
                <div
                  key={m.id}
                  className="p-3 border rounded bg-white"
                >
                  <p>
                    <b>Investor:</b> {m.investorName}
                  </p>
                  <p>
                    <b>Entrepreneur:</b> {m.entrepreneurName}
                  </p>
                  <p>
                    <b>Date:</b> {m.date}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* ENTREPRENEURS GRID */}
      <div className="grid grid-cols-3 gap-4">
        {filteredEntrepreneurs.map(e => (
          <EntrepreneurCard key={e.id} entrepreneur={e} />
        ))}
      </div>

    </div>
  );
};