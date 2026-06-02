import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useMeetings } from '../../context/meetingcontext';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Slot = {
  id: string;
  date: string;
};

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);

  const { meetings } = useMeetings();

  // Only accepted meetings
  const acceptedMeetings = meetings.filter(
    (m) => m.status === 'accepted'
  );

  // FIXED: safe local date format (no UTC bug)
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // ADD SLOT
  const addSlot = (date: Date) => {
    const formatted = formatDate(date);

    setAvailableSlots((prev) => {
      const exists = prev.some((s) => s.date === formatted);
      if (exists) return prev;

      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          date: formatted,
        },
      ];
    });
  };

  // DELETE SLOT
  const deleteSlot = (id: string) => {
    setAvailableSlots((prev) =>
      prev.filter((slot) => slot.id !== id)
    );
  };

  return (
    <div className="p-6 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Meeting Calendar
      </h1>

      {/* CALENDAR */}
      <div className="bg-white p-4 rounded shadow border">
        <Calendar
          onChange={(value: Value) => {
            if (value instanceof Date) {
              setSelectedDate(value);
            }
          }}
          value={selectedDate}
          onClickDay={addSlot}

          // GREEN MEETING DOT
          tileContent={({ date }) => {
            const day = formatDate(date);

            const hasMeeting = acceptedMeetings.some(
              (m) => m.date === day
            );

            return hasMeeting ? (
              <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>
            ) : null;
          }}
        />
      </div>

      {/* AVAILABILITY SLOTS */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-black">
          Your Availability Slots
        </h2>

        {availableSlots.length === 0 ? (
          <p className="text-black mt-2">
            No slots added yet
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {availableSlots.map((slot) => (
              <li
                key={slot.id}
                className="p-2 bg-green-100 text-green-800 rounded flex justify-between items-center"
              >
                <span>{slot.date}</span>

                <button
                  onClick={() => deleteSlot(slot.id)}
                  className="text-red-500 font-bold"
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CONFIRMED MEETINGS */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-black">
          Confirmed Meetings
        </h2>

        {acceptedMeetings.length === 0 ? (
          <p className="text-black mt-2">
            No confirmed meetings yet
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {acceptedMeetings.map((m) => (
              <li
                key={m.id}
                className="p-3 bg-white text-black border rounded"
              >
                <p>
                  <b>Investor:</b> {m.investorName}
                </p>
                <p>
                  <b>Date:</b> {m.date}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;