"use client";
import TechBadge from "@/components/TechBadge";

const TechnologyBadges = ({ technologies }: { technologies: any[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-y-8 gap-x-6 md:gap-y-12 md:gap-x-[4rem]">
      {technologies.map((tech) => (
        <TechBadge
          key={tech.name}
          name={tech.name}
          imageLight={tech.imageLight}
          imageDark={tech.imageDark}
          width={tech.width}
          height={tech.height}
        />
      ))}
    </div>
  );
};

export default TechnologyBadges;
