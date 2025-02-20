import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";

export default function MainLayout() {
  return (
    <>
     <header className=" drop-shadow-lg ">
      <Navbar />
    </header>
    <main className="bg-background min-h-[100vh] pt-28">
      <Outlet></Outlet>
    </main>
    </>
   
  )
}
