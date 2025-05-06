// src/pages/admin/PendingVerifications.tsx
import { useState } from "react"
import VerificationTable from "../../components/VerificationTable"

export default function PendingVerifications() {
  const [pending, setPending] = useState([
    { id: 1, name: "Suresh Kumar", email: "suresh@mail.com", type: "user" },
    { id: 2, name: "Hackathon 2.0", eventName: "Hackathon", type: "event" }
  ])

  const handleApprove = (id: number) => {
    setPending(pending.filter(item => item.id !== id))
    // TODO: Call backend API to mark as approved
  }

  const handleReject = (id: number) => {
    setPending(pending.filter(item => item.id !== id))
    // TODO: Call backend API to delete or reject
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🕵️ Pending Verifications</h2>
      <VerificationTable data={pending} onApprove={handleApprove} onReject={handleReject} />
    </div>
  )
}
