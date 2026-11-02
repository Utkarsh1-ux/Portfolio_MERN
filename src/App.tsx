import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useActiveSection } from "./hooks/useActiveSection";
import { Loader } from "./components/Loader";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Exploring } from "./components/Exploring";
import { Contact } from "./components/Contact";

function seenIntro() {
  try {
    return sessionStorage.getItem("intro") === "1";
  } catch {
    return false;
  }
}

export default function App() {
  const [loading, setLoading] = useState(() => !seenIntro());
  const active = useActiveSection();

  const done = useCallback(() => {
    try {
      sessionStorage.setItem("intro", "1");
    } catch {
      /* storage unavailable — fine */
    }
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" onDone={done} />}</AnimatePresence>

      <div className="rules" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} className={i >= 4 ? "hidden md:block" : ""} />
        ))}
      </div>

      <Nav active={active} />
      <main className="relative z-10">
        <Hero ready={!loading} />
        <About />
        <Projects />
        <Skills />
        <Exploring />
        <Contact />
      </main>
    </>
  );
}
