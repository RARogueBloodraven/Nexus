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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  if (!user) return null;

  const sentRequests = getRequestsFromInvestor(user.id);

  const industries = Array.from(
    new Set(entrepreneurs.map(e => e.industry))
  );

  // FILTER ENTREPRENEURS
  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    const matchesSearch =
      searchQuery === '' ||
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustries.length === 0 ||
      selectedIndustries.includes(entrepreneur.industry);

    return matchesSearch && matchesIndustry;
  });

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  // ✅ FIXED: only THIS investor's confirmed meetings
  const confirmedMeetings = meetings.filter(
    (m) =>
      m.status === 'accepted' &&
      m.investorName === user.name
  );

  return (
    <div className="space-y-6 animate-fade-in">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Discover Startups
        </h1>
        <p className="text-gray-600">
          Find and connect with promising entrepreneurs
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card>
          <CardBody>
            <p className="text-gray-600">Total Startups</p>
            <h3 className="text-xl font-bold">
              {entrepreneurs.length}
            </h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-gray-600">Industries</p>
            <h3 className="text-xl font-bold">
              {industries.length}
            </h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-gray-600">Your Connections</p>
            <h3 className="text-xl font-bold">
              {sentRequests.filter(r => r.status === 'accepted').length}
            </h3>
          </CardBody>
        </Card>

      </div>

      {/* CONFIRMED MEETINGS */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">
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

      {/* ENTREPRENEURS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredEntrepreneurs.map(e => (
          <EntrepreneurCard
            key={e.id}
            entrepreneur={e}
          />
        ))}
      </div>

    </div>
  );
};