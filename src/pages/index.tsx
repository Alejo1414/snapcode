import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ExampleOutput from "../components/ExampleOutput";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Snapcode - Convert Screenshots to Tailwind CSS Code</title>
        <meta
          name="description"
          content="Transform UI screenshots into production-ready Tailwind CSS HTML code instantly. Perfect for developers and designers."
        />
      </Head>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <HowItWorks />
          <ExampleOutput />
          <Testimonials />
          <Pricing />
        </main>
        <Footer />
      </div>
    </>
  );
}
