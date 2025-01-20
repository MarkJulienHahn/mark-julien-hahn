import Link from "next/link";
import React from "react";

export default function Bio() {
  return (
    <main className="bio">
      <section className="bio__text">
        <div>
          <p className="text__big">
            Mark Julien Hahn (*1994) is a designer and art director currently
            living in Berlin, Germany. <br />
            <br />
            {/* He operates his own graphic design studio and heads Softdrive
            Foundry®, a type foundry. Alongside his design work, he teaches at
            the Institute of Methodologies of Design and Representation at the
            Technical University Braunschweig. */}
            He operates his own graphic design studio where he works on
            identities, type-design and programming projects. Alongside his
            design work, he teaches at the Institute of Methodologies of Design
            and Representation at the Technical University Braunschweig.
            <br />
            <br />
            Links
            <br />
            {/* 01{"  "}
            <a
              href="https://softdrivefoundry.com"
              target="_blank"
              rel="noreferrer"
            >
              Softdrive Foundry®
            </a>{" "} */}
            <br />
            01{"  "}
            <a href="https://www.imd.tu-bs.de/" target="_blank" rel="noreferrer">
              Institute for Methodologies of Design and Representation
            </a>{" "}
            <br />
            02{"  "}
            <a href="https://stadtluecken.de" target="_blank" rel="noreferrer">
              Stadtlücken e.V.
            </a>{" "}
            <br />
            <br />
            Contact
            <br />
            Görlitzer Straße 52, 10997 Berlin
            <br />
            <a href="mailto:mail@markjulienhahn.com">Email</a>
          </p>
        </div>
        <p className="bio__subline text__small">
          ©Mark Julien Hahn, 2024.{" "}
          <Link href="/legal-notice" scroll={false}>
            Legal Notice
          </Link>
        </p>
      </section>
    </main>
  );
}
