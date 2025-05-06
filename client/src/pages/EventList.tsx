// src/pages/EventList.tsx
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { API_BASE_URL } from "../config";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/events`)
      .then((res) => res.json())
      .then(setEvents)
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Events</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
