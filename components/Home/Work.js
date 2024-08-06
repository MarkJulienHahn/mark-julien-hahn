"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";

import List from "./List";
import ListMobile from "./ListMobile";
import ListWrapper from "./ListWrapper";
import ProjectsList from "./ProjectList";
import ProjectsListMobile from "./ProjectListMobile";
import ImageWrapper from "./ImageWrapper";

import { use100vh } from "react-div-100vh";

const Work = ({ work, disciplines, cooperations, clients }) => {
  const [bgImage, setBgImage] = useState(null);

  const [focus, setFocus] = useState({});
  const [focusDisc, setFocusDisc] = useState([]);
  const [focusCoop, setFocusCoop] = useState([]);
  const [focusClnt, setFocusClnt] = useState([]);
  const [clickedEntry, setClickedEntry] = useState(null);
  const [projOnly, setProjOnly] = useState(false);

  const isNotEmptyObject = (obj) => obj && Object.keys(obj).length > 0;

  const height = use100vh();

  useEffect(() => {
    setFocusDisc(focus?.disciplines || []);
    setFocusCoop(focus?.cooperations || []);
    setFocusClnt(focus?.clients || []);
    if (isNotEmptyObject(focus) && focus.images?.length) {
      setBgImage({
        type: focus?.images[0]?.type,
        url: focus?.images[0]?.media?.url,
        fitType: focus?.images[0]?.media?.fitType,
        focus: focus,
        background: focus?.images[0]?.media?.background,
        link: focus?.slug?.current,
      });
    } else {
      setBgImage({
        url: null,
        fitType: "cover",
      });
    }
  }, [focus]);

  return (
    <>
      <div className="desktopOnly" style={{ height: height }}>
        <ListWrapper>
          <div className="grid-4fr ">
            <ProjectsList
              work={work}
              setFocus={setFocus}
              projOnly={projOnly}
              setProjOnly={setProjOnly}
              focus={focus}
              focusDisc={focusDisc}
              focusCoop={focusCoop}
              focusClnt={focusClnt}
            />
          </div>
          <List
            title="Disciplines"
            items={disciplines}
            onMouseEnter={(entry) => setFocusDisc([entry])}
            onMouseLeave={() => setFocusDisc([])}
            setProjOnly={setProjOnly}
            focusItems={focusDisc}
            setFocus={setFocus}
            focusType="grid-2fr"
          />
          <List
            title="Cooperations"
            items={cooperations}
            onMouseEnter={(entry) => setFocusCoop([entry])}
            onMouseLeave={() => setFocusCoop([])}
            setProjOnly={setProjOnly}
            focusItems={focusCoop}
            setFocus={setFocus}
            focusType="grid-2fr"
          />
          <List
            title="Clients"
            items={clients}
            onMouseEnter={(entry) => setFocusClnt([entry])}
            onMouseLeave={() => setFocusClnt([])}
            setProjOnly={setProjOnly}
            focusItems={focusClnt}
            focusType="grid-4fr clientList"
          />
        </ListWrapper>
      </div>
      <div className="mobileOnly">
        <ListWrapper>
          <ProjectsListMobile
            work={work}
            setFocus={setFocus}
            projOnly={projOnly}
            setProjOnly={setProjOnly}
            focus={focus}
            focusDisc={focusDisc}
            focusCoop={focusCoop}
            focusClnt={focusClnt}
            setFocusDisc={setFocusDisc}
            setFocusCoop={setFocusCoop}
            clickedEntry={clickedEntry}
            setClickedEntry={setClickedEntry}
          />
          <div className="mobileBottom">
            <ListMobile
              title="Disciplines"
              items={disciplines}
              onMouseEnter={(entry) => setFocusDisc([entry])}
              onMouseLeave={() => setFocusCoop([])}
              setProjOnly={setProjOnly}
              focusItems={focusDisc}
              setFocus={setFocus}
              focusType="grid-2fr"
            />
            <ListMobile
              title="Cooperations"
              items={cooperations}
              onMouseEnter={(entry) => setFocusCoop([entry])}
              onMouseLeave={() => setFocusDisc([])}
              setProjOnly={setProjOnly}
              focusItems={focusCoop}
              setFocus={setFocus}
              focusType="grid-2fr"
            />
          </div>
        </ListWrapper>
      </div>
      <Link href="/imprint">
        <span className="navigation">i</span>
      </Link>
      <ImageWrapper bgImage={bgImage} />
    </>
  );
};

export default Work;
