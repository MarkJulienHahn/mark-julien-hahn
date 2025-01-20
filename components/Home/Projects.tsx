"use client";

import React, { useState, useEffect } from "react";
import Project from "./Project";
import { WorkData } from "../../types/types";
import { useRouter } from "next/navigation";

type ProjectsProps = {
  work: WorkData[];
  initialSlug?: string;
};

export default function Projects({ work, initialSlug }: ProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      window.history.pushState(null, "", "");
    };
  }, []);

  return work.map((project) => (
    <Project
      key={project.slug.current}
      project={project}
      setCurrentIndex={setCurrentIndex}
      currentIndex={currentIndex}
      isInitial={project.slug.current == initialSlug}
    />
  ));
}
