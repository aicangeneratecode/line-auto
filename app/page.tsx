import { SpeedInsights } from "@vercel/speed-insights/next"
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Steps } from '@/components/sections/steps';
import { FAQ } from '@/components/sections/faq';
import { Gallery } from '@/components/sections/gallery';
import { Videos } from '@/components/sections/videos';
import { Contact } from '@/components/sections/contact';
import { Partners } from '@/components/sections/partners';
import { BackgroundController } from '@/components/background-controller';

export default function Home() {
  return (
    <BackgroundController>
      <SpeedInsights />
      <Hero />          {/* data-section="hero" */}
      <About />         {/* data-section="about" */}
      <Steps />         {/* data-section="steps" */}
      <FAQ />           {/* data-section="faq" */}
      <Gallery />       {/* data-section="gallery" */}
      <Videos />       {/* data-section="videos" */}
      <Contact />       {/* data-section="contact" */}
      <Partners />      {/* data-section="partners" */}
    </BackgroundController>
  );
}