import React from 'react';
import { useMeetings } from '../../context/meetingcontext';

const MeetingsPage: React.FC = () => {
  const { meetings, updateMeetingStatus } = useMeetings();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Meeting Requests
      </h1>

      {meetings.map((m) => (
        <div
          key={m.id}
          className="p-4 bg-white shadow rounded mb-3"
        >
          <p>
            <b>Investor:</b> {m.investorName}
          </p>

          <p>
            <b>Date:</b> {m.date}
          </p>

          <p>
            <b>Status:</b> {m.status}
          </p>

          {/* ACTION BUTTONS */}
          {m.status === 'pending' && (
            <div className="mt-2 space-x-2">
              <button
                onClick={() =>
                  updateMeetingStatus(m.id, 'accepted')
                }
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  updateMeetingStatus(m.id, 'rejected')
                }
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
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