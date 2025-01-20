import React from "react";

import { getWork } from "../../../../sanity/sanity-utils";
import Projects from "../../../../components/Home/Projects";

export default async function Home({ params }: { params: { slug: string } }) {
  const work = await getWork();

  return (
    <main className="feed">
      <Projects work={work} initialSlug={params.slug}/>
    </main>
  );
}

export const revalidate = 10;