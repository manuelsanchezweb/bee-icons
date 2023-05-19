import { getIconsData } from '@/api/getIconsData'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import IconList from '@/components/icon-list'
import { Navigation } from '@/components/navigation'
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
        <Navigation />
        <Hero />
        <div className="flex flex-col items-center my-10 md:my-24 text-center gap-4">
          <h2 className="font-black text-4xl">
            +85 cool icons already made their way to the hive!
          </h2>
          <div className="flex flex-col items-center gap-4">
            <h3>Some of the new incorporations:</h3>
            <div className="flex gap-2">
              <svg
                className="bee bee-icons"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#info-circle-lg-clip1)">
                  <path
                    d="M12.9951 7.1915C12.9951 7.74107 12.5496 8.18658 12 8.18658C11.4504 8.18658 11.0049 7.74107 11.0049 7.1915C11.0049 6.64193 11.4504 6.19641 12 6.19641C12.5496 6.19641 12.9951 6.64193 12.9951 7.1915Z"
                    fill="currentColor"
                  />{' '}
                  <path
                    d="M13 11.1866C13 10.6343 12.5523 10.1866 12 10.1866C11.4477 10.1866 11 10.6343 11 11.1866V17.1866C11 17.7389 11.4477 18.1866 12 18.1866C12.5523 18.1866 13 17.7389 13 17.1866V11.1866Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 24.1866C18.6274 24.1866 24 18.814 24 12.1866C24 5.55917 18.6274 0.186584 12 0.186584C5.37258 0.186584 0 5.55917 0 12.1866C0 18.814 5.37258 24.1866 12 24.1866ZM12 22.1866C17.5228 22.1866 22 17.7094 22 12.1866C22 6.66374 17.5228 2.18658 12 2.18658C6.47715 2.18658 2 6.66374 2 12.1866C2 17.7094 6.47715 22.1866 12 22.1866Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="info-circle-lg-clip1">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.186584)"
                    />{' '}
                  </clipPath>
                </defs>
              </svg>
              <svg
                className="bee bee-icons"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#alert-square-lg-clip1)">
                  <path
                    d="M11.5 17.1915C11.5 16.6419 11.9455 16.1964 12.4951 16.1964C13.0447 16.1964 13.4902 16.6419 13.4902 17.1915C13.4902 17.7411 13.0447 18.1866 12.4951 18.1866C11.9455 18.1866 11.5 17.7411 11.5 17.1915Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11.4951 13.1964C11.4951 13.7487 11.9428 14.1964 12.4951 14.1964C13.0474 14.1964 13.4951 13.7487 13.4951 13.1964L13.4951 7.19641C13.4951 6.64413 13.0474 6.19641 12.4951 6.19641C11.9428 6.19641 11.4951 6.64413 11.4951 7.19641L11.4951 13.1964Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.5 3.37177C0.5 1.61264 1.92605 0.186584 3.68518 0.186584H21.3148C23.0739 0.186584 24.5 1.61264 24.5 3.37177V21.0014C24.5 22.7605 23.0739 24.1866 21.3148 24.1866H3.68518C1.92605 24.1866 0.5 22.7605 0.5 21.0014V3.37177ZM3.68518 2.18658C3.03062 2.18658 2.5 2.71721 2.5 3.37177V21.0014C2.5 21.656 3.03062 22.1866 3.68518 22.1866H21.3148C21.9694 22.1866 22.5 21.656 22.5 21.0014V3.37177C22.5 2.71721 21.9694 2.18658 21.3148 2.18658H3.68518Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="alert-square-lg-clip1">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.5 0.186584)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                className="bee bee-icons"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0049 17.1817C11.0049 16.6321 11.4504 16.1866 12 16.1866C12.5496 16.1866 12.9951 16.6321 12.9951 17.1817C12.9951 17.7312 12.5496 18.1768 12 18.1768C11.4504 18.1768 11.0049 17.7312 11.0049 17.1817Z"
                  fill="currentColor"
                />
                <path
                  d="M11 13.1866C11 13.7389 11.4477 14.1866 12 14.1866C12.5523 14.1866 13 13.7389 13 13.1866V9.18658C13 8.6343 12.5523 8.18658 12 8.18658C11.4477 8.18658 11 8.6343 11 9.18658V13.1866Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.3713 3.89092C10.5111 1.81859 13.4888 1.81858 14.6286 3.89092L22.246 17.7408C23.3457 19.7402 21.8992 22.1866 19.6174 22.1866H4.38254C2.10074 22.1866 0.654244 19.7402 1.75389 17.7408L9.3713 3.89092ZM12.8762 4.85475C12.4962 4.16398 11.5037 4.16397 11.1237 4.85475L3.50632 18.7047C3.13978 19.3711 3.62194 20.1866 4.38254 20.1866H19.6174C20.378 20.1866 20.8601 19.3711 20.4936 18.7047L12.8762 4.85475Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                className="bee bee-icons"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#info-circle-lg-clip1)">
                  <path
                    d="M12.9951 7.1915C12.9951 7.74107 12.5496 8.18658 12 8.18658C11.4504 8.18658 11.0049 7.74107 11.0049 7.1915C11.0049 6.64193 11.4504 6.19641 12 6.19641C12.5496 6.19641 12.9951 6.64193 12.9951 7.1915Z"
                    fill="currentColor"
                  />{' '}
                  <path
                    d="M13 11.1866C13 10.6343 12.5523 10.1866 12 10.1866C11.4477 10.1866 11 10.6343 11 11.1866V17.1866C11 17.7389 11.4477 18.1866 12 18.1866C12.5523 18.1866 13 17.7389 13 17.1866V11.1866Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 24.1866C18.6274 24.1866 24 18.814 24 12.1866C24 5.55917 18.6274 0.186584 12 0.186584C5.37258 0.186584 0 5.55917 0 12.1866C0 18.814 5.37258 24.1866 12 24.1866ZM12 22.1866C17.5228 22.1866 22 17.7094 22 12.1866C22 6.66374 17.5228 2.18658 12 2.18658C6.47715 2.18658 2 6.66374 2 12.1866C2 17.7094 6.47715 22.1866 12 22.1866Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="info-circle-lg-clip1">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.186584)"
                    />{' '}
                  </clipPath>
                </defs>
              </svg>
              <svg
                className="bee bee-icons"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {' '}
                <path
                  d="M22.6981 6.90259C23.0935 6.51704 23.1015 5.88392 22.716 5.48848C22.3305 5.09305 21.6973 5.08503 21.3019 5.47058L8.66667 17.7899L2.6981 11.9706C2.30266 11.585 1.66955 11.593 1.284 11.9885C0.89845 12.3839 0.906464 13.017 1.3019 13.4026L7.96857 19.9026C8.35694 20.2813 8.97639 20.2813 9.36477 19.9026L22.6981 6.90259Z"
                  fill="currentColor"
                />{' '}
              </svg>
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

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      icons,
    },
  }
}
