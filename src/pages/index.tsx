import { getIconsData } from '@/api/getIconsData'
import Logo from '@/assets/logo/logo'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import IconList from '@/components/icon-list'
import ToggleMode from '@/components/toggle-mode'
import { Icon } from '@/types/types'
import Head from 'next/head'

export default function Home({ icons }: { icons: Icon[] }) {
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
            +75 cool icons already made their way to the hive!
          </h2>
          <p className="text-2xl">Stay tuned to see what is about to come!</p>
        </div>

        <IconList icons={icons} />

        <Contact />
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const icons = await getIconsData()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      icons,
    },
  }
}
