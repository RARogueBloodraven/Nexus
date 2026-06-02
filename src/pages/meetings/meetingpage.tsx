import React from 'react';
import { meetings } from '../../data/meetings';

const MeetingsPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meeting Requests</h1>

      {meetings.map((m) => (
        <div key={m.id} className="p-4 bg-white shadow rounded mb-3">
          <p><b>Investor:</b> {m.investorName}</p>
          <p><b>Date:</b> {m.date}</p>
          <p><b>Status:</b> {m.status}</p>

          {m.status === 'pending' && (
            <div className="mt-2 space-x-2">
              <button className="px-3 py-1 bg-green-500 text-white rounded">
                Accept
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded">
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MeetingsPage;