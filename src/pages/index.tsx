import Logo from "@/assets/logo/logo";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import IconList from "@/components/icon-list";
import ToggleMode from "@/components/toggle-mode";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>BeeIcons - Live the Digital Hive!</title>
        <meta name="description" content="Your favourite icon pool!" />
        <meta property="og:title" content="BeeIcons - Live the Digital Hive!" />
        <meta property="og:description" content="Your favourite icon pool!" />
        <meta
          property="og:image"
          content="https://www.bee-icons.com/thumbnail.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="BeeIcons - Live the Digital Hive!"
        />
        <meta name="twitter:description" content="Your favourite icon pool!" />
        <meta
          name="twitter:image"
          content="https://www.bee-icons.com/thumbnail.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex gap-2 justify-between items-center mb-8 lg:mb-4">
          <Logo classIcon="flex" />
          <ToggleMode />
        </div>
        <Hero />
        <div className="flex flex-col my-10 md:my-24 text-center gap-4">
          <h2 className="font-black text-4xl">
            The first icons are already making their way to the hive!
          </h2>
          <p className="text-2xl">So come visit us in the following days!</p>
        </div>

        <IconList />

        <Contact />
      </main>
      <Footer />
    </>
  );
}
