"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function () {
  const router = useRouter();

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="about__wrapper">
        <a className="link" href="mailto:mail@markjulienhahn.de">
          Mark Julien Hahn (Email)
        </a>
        <br />
        <a
          className="link"
          href="https://www.instagram.com/markjulienhahn/?hl=de"
          target="blank"
          rel="_noreferrer"
        >
          @markjulienhahn (Instagram)
        </a>
        <br />
        <br />
        Born 1994
        <br />
        Lives and works in Berlin,
        <br />
        Hertastraße 3, 12051 Berlin
        <br />
        <br /> <span className="about__copyright">© {currentYear}</span>
      </div>
      <Link href="/">
        <span className="navigation">X</span>
      </Link>
    </>
  );
}
