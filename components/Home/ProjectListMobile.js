// ProjectListMobile.js

import Link from "next/link";
import { useState, useEffect } from "react";

const ProjectsList = ({
  work,
  setFocus,
  projOnly,
  setProjOnly,
  focus,
  focusDisc,
  focusCoop,
  focusClnt,
  setFocusDisc,
  setFocusCoop,
  clickedEntry,
  setClickedEntry,
}) => {
  const [exclude, setExclude] = useState(false);

  const handleEntryClick = (entry) => {
    if (clickedEntry?.title === entry.title) {
      window.location.href = `/${entry.slug.current}`;
    } else {
      setClickedEntry(entry);
      setFocus(entry);
      setProjOnly(true);
      setFocusDisc([]);
      setFocusCoop([]);
    }
  };

  // useEffect(() => {
  //   setClickedEntry();
  // }, [focusDisc, focusCoop, focusClnt]);

  console.log(focusDisc, focusCoop);

  return (
    <ul className="grid-4fr">
      {work.map((entry, i) => (
        <li
          onClick={() => handleEntryClick(entry)}
          style={{
            opacity:
              (!projOnly || focus.title === entry.title) &&
              (entry.disciplines.some((discipline) =>
                focusDisc.some(
                  (focusDiscipline) =>
                    focusDiscipline?.title === discipline.title
                )
              ) ||
                entry.cooperations?.some((cooperation) =>
                  focusCoop.some(
                    (focusCooperation) =>
                      focusCooperation?.title === cooperation.title
                  )
                ))
                ? 1
                : 0.2,
            textDecoration:
              entry?.images?.length <= 1 || entry?.images?.length == undefined
                ? "line-through"
                : "inherit",
            textDecorationThickness: "2px",
            cursor: entry?.images?.length <= 1 ? "default" : "pointer",
          }}
          key={i}
        >
          <span className="year">
            {entry.month && entry.year
              ? entry.month < 10
                ? `0${entry.month}/${entry.year}`
                : `${entry.month}/${entry.year}`
              : "[wip]"}
          </span>
          {entry?.images?.length > 1 ? (
            <span style={{ textWrap: "none" }}>
              {clickedEntry?.title === entry.title ? (
                <Link href={`/${entry.slug.current}`}>{entry.title} ↗</Link>
              ) : (
                <span>{entry.title}</span>
              )}
            </span>
          ) : (
            entry.title
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;
