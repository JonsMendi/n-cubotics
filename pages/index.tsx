import Head from "next/head";
import { useState } from "react";
import CanvasWrapper from "./page-components/canvas/canvas-wrapper";
import Footer from "./page-components/organisms/footer";
import TopBar from "./page-components/organisms/topbar";

export default function Home() {
  const [axisVisible, setAxisVisible] = useState(false);

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Head>
          <title>N-Cubotics</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="d-flex flex-column h-100 flex-grow-1">
          <TopBar />
          <CanvasWrapper axisVisible={axisVisible} setAxisVisible={setAxisVisible} />
        </main>
        <Footer axisVisible={axisVisible} />
      </div>
    </>
  );
}
