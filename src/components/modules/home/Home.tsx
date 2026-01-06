import Categories from "./Categories";
import Cta from "./Cta";
import Events from "./Events";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";


export default function Homepage() {
  return (
    <main>
      {/* SECTION 1: HERO SECTION */}
      <Hero />
      {/* SECTION 2: CATEGORIES */}
      <Categories />
      {/* SECTION 3: FEATURED EVENTS */}
      <Events />
      {/* SECTION 4: HOW IT WORKS */}
      <HowItWorks />
      {/* SECTION 5: BECOME A HOST CTA */}
      <Cta />
      {/* SECTION 6: TESTIMONIALS */}
      <Testimonials />
    </main>
  );
}
