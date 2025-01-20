"use client";

import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { WorkData } from "../../types/types";
import ImageComponent from "./ImageComponent";
import ImageComponentMobile from "./ImageComponentMobile";
import { useInView } from "react-intersection-observer";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";
import { useRouter } from "next/navigation";

type WorkProps = {
  project: WorkData;
  setCurrentIndex: React.Dispatch<React.SetStateAction<string | null>>;
  currentIndex: string | null;
  isInitial?: boolean;
};

export default function Project({
  project,
  setCurrentIndex,
  currentIndex,
  isInitial,
}: WorkProps) {
  const router = useRouter();
  const { ref: inViewRef, inView } = useInView({
    threshold: 1,
  });
  const projectRef = useRef<HTMLElement>(null);
  const [isRendered, setIsRendered] = useState(false);

  useLayoutEffect(() => {
    setIsRendered(true);
  }, []);

  // useEffect(() => {
  //   if (inView) {
  //     router.push(null, "", `/${project.slug.current}`);
  //     setCurrentIndex(project.slug.current);
  //   }
  // }, [inView, project.slug.current, router, setCurrentIndex]);

  useEffect(() => {
    if (isInitial && isRendered && projectRef.current) {
      const scrollToProject = () => {
        projectRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      };
      // Use requestAnimationFrame to ensure the scroll happens in the next frame
      requestAnimationFrame(scrollToProject);
    }
  }, [isInitial, isRendered]);

  const portableTextComponents: PortableTextComponents = {
    marks: {
      link: ({ children, value }) => {
        const href = value?.href;
        const rel =
          href && !href.startsWith("/") ? "noreferrer noopener" : undefined;
        return (
          <a
            href={href}
            rel={rel}
            target={href && !href.startsWith("/") ? "_blank" : undefined}
          >
            {children}
          </a>
        );
      },
    },
  };

  const setRefs = (node: HTMLElement | null) => {
    inViewRef(node);
    if (node) projectRef.current = node;
  };

  return (
    <section className="project" ref={setRefs}>
      <div className="project__information">
        <div className="project__text">
          <div className="project__headline text__big">
            <h1>{project.title}</h1>
            <h1 className="project__discipline">
              {project.disciplines.map((discipline, i) => (
                <span key={i}>
                  {discipline.title}
                  {i + 1 < project.disciplines.length && ", "}
                </span>
              ))}
            </h1>
          </div>

          <PortableText
            value={project.description as TypedObject[]}
            components={portableTextComponents}
          />
        </div>
        <div className="project__subline text__small">
          <p className="project__subline--date">
            {project.month} {project.year}
            {project.ongoing && "— ongoing"}
          </p>
          <div className="project__subline--text">
            <PortableText
              value={project.clientInformation as TypedObject[]}
              components={portableTextComponents}
            />
          </div>
        </div>
      </div>

      <div className="project__image--desktop">
        <ImageComponent
          images={project.images}
          slug={project.slug}
          inView={inView}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>

      <div className="project__image--mobile">
        <ImageComponentMobile
          images={project.images}
          slug={project.slug}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </section>
  );
}
