"use client";

import { useState } from "react";

import ListWrapper from "../Home/ListWrapper";
import SingleList from "./SingleList";
import SingleSlider from "./SingleSlider";

export default function ({ entry }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <ListWrapper>
        <SingleList entry={entry} currentIndex={currentIndex} />
      </ListWrapper>
      <SingleSlider
        entry={entry}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
      />
    </>
  );
}
