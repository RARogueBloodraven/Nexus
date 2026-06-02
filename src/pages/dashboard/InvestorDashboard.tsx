import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';
import { useMeetings } from '../../context/meetingcontext';

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { meetings } = useMeetings();

  const [searchQuery] = useState('');
  const [selectedIndustries] = useState<string[]>([]);

  if (!user) return null;

  const sentRequests = getRequestsFromInvestor(user.id);

  const industries = Array.from(
    new Set(entrepreneurs.map(e => e.industry))
  );

  const filteredEntrepreneurs = entrepreneurs.filter(e => {
    const matchesSearch =
      searchQuery === '' ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustries.length === 0 ||
      selectedIndustries.includes(e.industry);

    return matchesSearch && matchesIndustry;
  });

  const toggleIndustry = (industry: string) => {
    // (not used here but kept for future filters)
  };

  // ✅ FIXED: investorId based filtering (THIS IS THE FIX)
  const confirmedMeetings = meetings.filter(
    (m) =>
      m.status === 'accepted' &&
      m.investorId === user.id
  );

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-gray-900">
        Discover Startups
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">

        <Card>
          <CardBody>
            <p>Total Startups</p>
            <h3>{entrepreneurs.length}</h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p>Industries</p>
            <h3>{industries.length}</h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p>Your Connections</p>
            <h3>
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

      {/* ENTREPRENEURS */}
      <div className="grid grid-cols-3 gap-4">
        {filteredEntrepreneurs.map(e => (
          <EntrepreneurCard key={e.id} entrepreneur={e} />
        ))}
      </div>

    </div>
  );
};