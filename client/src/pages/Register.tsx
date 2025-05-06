// src/pages/Register.tsx
function Register() {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form className="flex flex-col gap-2">
          <input type="text" placeholder="Name" className="border p-2" />
          <input type="email" placeholder="Email" className="border p-2" />
          <input type="password" placeholder="Password" className="border p-2" />
          <button className="bg-green-600 text-white px-4 py-2">Register</button>
        </form>
      </div>
    );
  }
  export default Register;
  