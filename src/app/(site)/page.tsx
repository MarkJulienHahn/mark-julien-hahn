import React from "react";

import { getWork } from "../../../sanity/sanity-utils";
import Projects from "../../../components/Home/Projects";
import Link from "next/link";

export default async function Home() {
  const work = await getWork();

  return (
    <>
      <main className="feed">
        <Projects work={work} />
      </main>
      <footer>
        <p className="footer text__small">
          ©Mark Julien Hahn, 2024.{" "}
          <Link href="/legal-notice" scroll={false}>
            Legal Notice
          </Link>
        </p>
      </footer>
    </>
  );
}

export const revalidate = 10;
