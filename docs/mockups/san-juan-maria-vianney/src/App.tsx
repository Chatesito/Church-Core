import { TopBar } from "./components/TopBar";
import { Navbar } from "./components/Navbar";
import { HomeSection } from "./components/HomeSection";
import { EventsSection } from "./components/EventsSection";
import { DailyReadingsSection } from "./components/DailyReadingsSection";
import { LearnMoreSection } from "./components/LearnMoreSection";
import { Footer } from "./components/Footer";
import { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (section: string) => {
    setCurrentPage(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeSection />;
      case "events":
        return <EventsSection />;
      case "readings":
        return <DailyReadingsSection />;
      case "members":
      case "groups":
      case "activities":
        return <LearnMoreSection activePage={currentPage} />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar />
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}