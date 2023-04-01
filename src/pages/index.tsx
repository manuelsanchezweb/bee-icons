import Logo from "@/assets/logo/logo";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>BeeIcons - Live the Digital Hive!</title>
        <meta name="description" content="Your favourite icon pool!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Logo classIcon="mb-8 lg:mb-4 flex mx-auto lg:mx-0" />
        <Hero />

        <div className="flex flex-col my-10 md:my-60 text-center gap-4">
          <h2 className="font-black text-4xl">
            The first icons are coming soon!
          </h2>
          <p className="text-2xl">So come visit us in the following days!</p>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
