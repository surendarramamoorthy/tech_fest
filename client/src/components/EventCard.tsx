// src/components/EventCard.tsx
import { useState } from "react";
import { registerForEvent } from "../services/eventService";

interface Props {
  event: { id: number; name: string; category?: string };
}

export default function EventCard({ event }: Props) {
  const [status, setStatus] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      await registerForEvent(event.id);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h3 className="text-xl font-semibold">{event.name}</h3>
      <p className="text-gray-600 mb-2">{event.category}</p>
      <button
        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleRegister}
      >
        Register
      </button>
      {status === "success" && <p className="text-green-600 mt-2">Registered!</p>}
      {status === "error" && <p className="text-red-600 mt-2">Already registered or failed</p>}
    </div>
  );
}
