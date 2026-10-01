import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutAndTechStack from "./components/AboutAndTechStack";
import Recognition from "./components/Recognition";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Publications from "./components/Publications";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutAndTechStack />
      <Recognition />
      <Experience />
      <Projects />
      <Publications />
      <Certifications />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
