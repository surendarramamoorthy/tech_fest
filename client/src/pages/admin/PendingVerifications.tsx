import { useEffect, useState } from 'react';
import VerificationTable from '../../components/VerificationTable';
import {
  fetchPendingVerifications,
  approveUser,
  rejectUser,
  approveEvent,
  rejectEvent,
} from '../../services/adminService';

export default function PendingVerifications() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPendingVerifications();
        setUsers(data.users);
        setEvents(data.events);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  const handleApproveUser = async (id: number) => {
    await approveUser(id);
    setUsers(users.filter(u => u.id !== id));
  };

  const handleRejectUser = async (id: number) => {
    await rejectUser(id);
    setUsers(users.filter(u => u.id !== id));
  };

  const handleApproveEvent = async (id: number) => {
    await approveEvent(id);
    setEvents(events.filter(e => e.id !== id));
  };

  const handleRejectEvent = async (id: number) => {
    await rejectEvent(id);
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🕵️ User Verifications</h2>
      <VerificationTable
        data={users.map(user => ({ ...user, type: 'user' }))}
        onApprove={handleApproveUser}
        onReject={handleRejectUser}
      />

      <h2 className="text-2xl font-bold mt-8 mb-4">📝 Event Verifications</h2>
      <VerificationTable
        data={events.map(event => ({ ...event, type: 'event', name: event.name, eventName: event.category }))}
        onApprove={handleApproveEvent}
        onReject={handleRejectEvent}
      />
    </div>
  );
}
