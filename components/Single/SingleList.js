"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ({ entry }) {
  const router = useRouter();

  function goBack() {
    router.push("/");
  }

  return (
    <>
      <ul className="grid-4fr">
        <li>
          <span className="year">
            {entry.month && entry.year
              ? entry.month < 10
                ? `0${entry.month}/${entry.year}`
                : `${entry.month}/${entry.year}`
              : "[wip]"}
          </span>
          {entry.title}
        </li>
      </ul>
      <ul className="grid-2fr">
        {entry.disciplines.map((entry, i) => (
          <li key={i}>{entry.title}</li>
        ))}
      </ul>
      <ul className="grid-2fr">
        {entry.cooperations?.map((entry, i) => (
          <li key={i}>{entry.title}</li>
        ))}
      </ul>
      <ul className="grid-3fr">
        {entry.clients?.map((entry, i) => (
          <li key={i}>{entry.title}</li>
        ))}
      </ul>
      <ul className="grid-2fr" onClick={goBack}>
        <span className="navigation">X</span>
      </ul>
    </>
  );
}
