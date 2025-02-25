import Contact from '@/components/contact'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import IconList from '@/components/icon-list'
import { Navigation } from '@/components/navigation'
import { Icon } from '@/types/types'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import ExampleIcons from '@/components/example-icons'
import { getIconsData } from '@/server/getIcons'

export default async function Home() {
  const icons = await getIconsData()

  const copyIcons = icons as Icon[]

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
        <Navigation />
        <Hero />
        <div className="flex flex-col items-center my-10 md:my-24 text-center gap-4">
          <small>Last updated: March 2025</small>
          <h2 className="font-black text-4xl">
            +200 cool icons already made their way to the hive!
          </h2>
          <div className="flex flex-col items-center gap-4">
            <h3>Some of the new incorporations:</h3>
            <ExampleIcons icons={copyIcons} />
          </div>

          <p className="text-2xl">Stay tuned to see what is about to come!</p>
        </div>

        <Toaster
          containerStyle={{
            position: 'relative',
          }}
          containerClassName="fixed"
          position="top-right"
        />
        <IconList icons={copyIcons} />

        <Contact />
      </main>
      <Footer />
    </>
  )
}
