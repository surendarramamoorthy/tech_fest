import { useState } from "react";
import { registerForEvent } from "../services/eventService";

interface Prize {
  rank: string;
  amount: string;
}

interface EventCardProps {
  event: {
    id: number;
    title: string;
    category: string;
    description: string;
    date: string;
    prizes?: Prize[];
    brochure_url?: string;
    image_url?: string;
    registration_fee?: number;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const [status, setStatus] = useState<"success" | "error" | null>(null);

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
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-xl font-semibold">{event.title}</h3>
      <p className="text-sm text-gray-600">{event.category}</p>
      <p className="mt-2">{event.description}</p>
      <p className="text-sm mt-2">📅 {new Date(event.date).toLocaleDateString()}</p>

      {event.prizes?.length > 0 && (
        <div className="mt-2">
          <p className="font-semibold">🏆 Prizes:</p>
          {event.prizes.map((p, i) => (
            <p key={i}>
              {p.rank}: ₹{p.amount}
            </p>
          ))}
        </div>
      )}

      {event.registration_fee !== undefined && (
        <p className="mt-2 font-semibold">💰 Fee: ₹{event.registration_fee}</p>
      )}

      {event.brochure_url && (
        <a
          href={event.brochure_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline block mt-2"
        >
          📄 Download Brochure
        </a>
      )}

      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-40 object-cover rounded mt-2"
        />
      )}

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleRegister}
      >
        Register
      </button>

      {status === "success" && <p className="text-green-600 mt-2">✅ Registered!</p>}
      {status === "error" && <p className="text-red-600 mt-2">❌ Already registered or failed</p>}
    </div>
  );
}
