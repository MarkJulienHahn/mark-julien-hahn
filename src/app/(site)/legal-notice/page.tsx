import React from "react";

import { getImprint } from "../../../../sanity/sanity-utils";
import { PortableText } from "next-sanity";

export default async function Legals() {
  const imprint = await getImprint();

  return (
    <>
      <main>
        <section className="legals__wrapper text__small">
          <div className="legals__textWrapper">
            <PortableText value={imprint.text} />
          </div>
        </section>
      </main>
    </>
  );
}
