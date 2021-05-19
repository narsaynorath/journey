import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Journey</title>
        <meta
          name="description"
          content="A journey starts with just one step."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello World
    </div>
  );
}
