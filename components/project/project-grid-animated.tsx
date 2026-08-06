"use client";

import { motion } from "framer-motion";
import { ScrollRevealGroup, revealItem } from "@/components/scroll-reveal";
import { ProjectCard } from "@/components/project/project-card";
import type { Project } from "@/lib/types";

export function ProjectGridAnimated({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) {
  return (
    <ScrollRevealGroup className={className}>
      {projects.map((project) => (
        <motion.div key={project.slug} variants={revealItem}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </ScrollRevealGroup>
  );
}
