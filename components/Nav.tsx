"use client";
import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Projects" },
    { href: "/bio", label: "Bio" },
  ];

  return (
    <nav aria-label="Main Navigation">
      <ul className="nav__list">
        {navItems.map((item) => (
          <li className="nav__item text__big">
            <Link
              href={item.href}
              className={`transition-colors duration-200 ${
                pathname === item.href ? "nav__active" : "nav__inactive"
              }`}
              aria-current={pathname === item.href ? "page" : undefined}
              scroll={false}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
