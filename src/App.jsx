import './App.css';
import SwarmBackground from './components/SwarmBackground.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import ResearchSection from './components/sections/ResearchSection.jsx';
import PublicationsSection from './components/sections/PublicationsSection.jsx';
import ExperienceSection from './components/sections/ExperienceSection.jsx';
import EducationSection from './components/sections/EducationSection.jsx';
import CourseworkSection from './components/sections/CourseworkSection.jsx';
import AwardsSection from './components/sections/AwardsSection.jsx';
import SkillsSection from './components/sections/SkillsSection.jsx';
import OpenSourceSection from './components/sections/OpenSourceSection.jsx';
import ContactSection from './components/sections/ContactSection.jsx';

export default function App() {
  return (
    <>
      <SwarmBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <ResearchSection />
        <PublicationsSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <CourseworkSection />
        <AwardsSection />
        <OpenSourceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
