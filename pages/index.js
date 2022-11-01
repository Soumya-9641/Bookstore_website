import Head from 'next/head'
import Image from 'next/image'

//import Body from "./components/Body";
import Slideshow from "./components/Body";
export default function Home() {
  return (
    <div>
    <Head>
      <title>--Bookstore.com--</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="theme-color" content="#ffffff"></meta>
      <meta name="description" content="bookstore.com-Book your books" />
      <link rel="icon" href="/" />
    </Head>
    
    <Slideshow />
    
    </div>
  )
}
