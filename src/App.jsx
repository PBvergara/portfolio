import { useEffect } from "react";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FuturisticBackground from "./components/FuturisticBackground";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import Sidebar from "./components/Sidebar";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import { site } from "./data/site";

export default function App() {
  useEffect(() => {
    document.title = `${site.brand} — Software Developer`;
  }, []);

  return (
    <>
      <FuturisticBackground />
      <a className="skip" href="#home">
        Skip to content
      </a>
      <div className="workspace">
        <Sidebar />
        <div className="stage">
          <div className="stage-content">
            <Navbar />
            <main>
              <Profile />
              <Projects />
              <Skills />
            </main>
          </div>
        </div>
      </div>
      <Timeline />
      <Contact />
      <Footer />
    </>
  );
}
