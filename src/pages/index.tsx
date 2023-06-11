import { getIconsData } from '@/api/getIconsData'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import IconList from '@/components/icon-list'
import { Navigation } from '@/components/navigation'
import { Icon } from '@/types/types'
import { downloadSVG } from '@/utils/utils'
import Head from 'next/head'

export default function Home({ icons }: { icons: Icon[] }) {
  if (!icons) return null

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
          <h2 className="font-black text-4xl">
            +110 cool icons already made their way to the hive!
          </h2>
          <div className="flex flex-col items-center gap-4">
            <h3>Some of the new incorporations:</h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {icons
                .sort((a, b) => b.id - a.id)
                .slice(0, 10)
                .map((icon: Icon) => (
                  <button
                    key={icon.name}
                    onClick={() => downloadSVG(icon, 'lg')}
                    className="hexa-shape hexa-shadow bg-gray-100 flex flex-col items-center justify-center min-w-[72px] w-[72px] min-h-[64px] transition-all hover:scale-110 focus:scale-110 focus:outline-none hover:bg-gray-300"
                  >
                    <div dangerouslySetInnerHTML={{ __html: icon.icon.lg }} />
                  </button>
                ))}
            </div>
          </div>

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

  if (!icons) {
    return {
      notFound: true,
    }
  }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      icons,
    },
  }
}
