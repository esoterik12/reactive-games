import Head from "next/head";
import LandingPage from "./components/landingpage/LandingPage";


export default function Home() {
  return (
    <>
      <Head>
        <title>Reactive Classroom</title>
        <meta
          name="description"
          content="Create basic classroom activities using React!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LandingPage />
      </main>
    </>
  );
}
