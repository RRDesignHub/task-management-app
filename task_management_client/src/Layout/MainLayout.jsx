import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

export default function MainLayout() {
  return (
    <>
      <header className=" drop-shadow-lg ">
        <Navbar />
      </header>
      <main className="bg-background  min-h-[calc(100vh-60px)] pt-20">
        <Outlet></Outlet>
      </main>
      <footer className=" bg-card">
        <Footer />
      </footer>
    </>
  );
}
