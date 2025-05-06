// src/components/VerificationTable.tsx
interface VerificationItem {
    id: number
    name: string
    email?: string
    eventName?: string
    type: "user" | "event"
  }
  
  interface Props {
    data: VerificationItem[]
    onApprove: (id: number) => void
    onReject: (id: number) => void
  }
  
  export default function VerificationTable({ data, onApprove, onReject }: Props) {
    if (data.length === 0) {
      return <p className="text-gray-500 text-center">No pending verifications.</p>
    }
  
    return (
      <table className="min-w-full border mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email / Event</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.email || item.eventName}</td>
              <td className="px-4 py-2 capitalize">{item.type}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => onApprove(item.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => onReject(item.id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  