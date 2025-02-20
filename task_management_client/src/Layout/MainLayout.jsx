import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";

export default function MainLayout() {
  return (
    <>
     <header className="bg-base-100 drop-shadow-lg">
      <Navbar />
    </header>
    <main className="bg-background py-6 min-h-screen">
      <Outlet></Outlet>
    </main>
    </>
   
  )
}
