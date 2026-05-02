import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services  from "@/components/sections/Services";
import Portfolio, { PortfolioItem } from "@/components/sections/Portfolio";
import Clients from "@/components/sections/Clients";
import About from "@/components/sections/About";
import Testimonials, { TestimonialItem } from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import { client } from "@/sanity/lib/client";

export const revalidate = 60; // Revalidate every minute, or use longer in prod

export default async function Home() {
  const portfolioData = await client.fetch<PortfolioItem[]>(
    '*[_type == "portfolio"] | order(order asc)'
  ).catch(e => {
    console.error('Sanity fetch failed for portfolio', e.message);
    return [] as PortfolioItem[];
  });

  const testimonialsData = await client.fetch<TestimonialItem[]>(
    '*[_type == "testimonial"] | order(order asc)'
  ).catch(e => {
    console.error('Sanity fetch failed for testimonials', e.message);
    return [] as TestimonialItem[];
  });



  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Portfolio portfolioData={portfolioData} />
      <Clients />
      <About />
      <Testimonials testimonialsData={testimonialsData} />
      <Contact />
      <Footer />
    </>
  );
}
