import Head from 'next/head';
import Navbar from './layout/navbar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <Navbar />
      </Head>

      <main>
        <h3>Name Distance Tech Demo</h3>
        <div>Built with NextJS</div>
      </main>

      <footer>

      </footer>

    </div>
  )
}
