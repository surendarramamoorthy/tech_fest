import { useState } from "react";
import { API_BASE_URL } from "../config";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    brochure_url: "",
    image_url: "",
    registration_fee: ""
  });

  const [prizes, setPrizes] = useState([
    { rank: "1st", amount: "" },
    { rank: "2nd", amount: "" },
    { rank: "3rd", amount: "" }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePrizeChange = (index: number, value: string) => {
    const newPrizes = [...prizes];
    newPrizes[index].amount = value;
    setPrizes(newPrizes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/events/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          ...form,
          registration_fee: parseFloat(form.registration_fee),
          prizes
        })
      });

      if (!res.ok) throw new Error("Failed to create event");
      alert("✅ Event created!");
      setForm({
        title: "",
        category: "",
        description: "",
        date: "",
        brochure_url: "",
        image_url: "",
        registration_fee: ""
      });
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border p-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border p-2" />
        <input name="brochure_url" value={form.brochure_url} onChange={handleChange} placeholder="Brochure URL" className="w-full border p-2" />
        <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" className="w-full border p-2" />
        <input name="registration_fee" type="number" value={form.registration_fee} onChange={handleChange} placeholder="Registration Fee (₹)" className="w-full border p-2" />

        {prizes.map((prize, i) => (
          <input key={i} value={prize.amount} onChange={(e) => handlePrizeChange(i, e.target.value)} placeholder={`${prize.rank} Prize`} className="w-full border p-2" />
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Event
        </button>
      </form>
    </div>
  );
}
