import Homepage from "@/components/modules/home/Home";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hitch - Find Your Perfect Event</title>
        <meta
          name="description"
          content="Discover and join events that match your interests with Hitch."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <Homepage />
      </main>
    </>
  );
}
