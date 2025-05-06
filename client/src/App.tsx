import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { UserProvider } from "./context/UserContext"

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Header />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </UserProvider>
  )
}

export default App
