import { useState } from "react";
import { API_BASE_URL } from "../config";

export default function CreateEvent() {
  const [form, setForm] = useState({ title: "", category: "", description: "", date: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/events/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Event creation failed");
      setMessage("✅ Event created successfully");
      setForm({ name: "", category: "", description: "", date: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating event");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" required value={form.name} onChange={handleChange} placeholder="Event Name"
          className="w-full border rounded px-4 py-2" />
        <input name="category" required value={form.category} onChange={handleChange} placeholder="Category"
          className="w-full border rounded px-4 py-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description"
          className="w-full border rounded px-4 py-2" />
        <input type="date" name="date" value={form.date} onChange={handleChange}
          className="w-full border rounded px-4 py-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Event
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
