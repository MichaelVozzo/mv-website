import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TechnologyBadges from "@/components/TechnologyBadges";
import { technologies } from "@/data/technologies";
import { Container, Section } from "./Layout";

export default function AboutMe() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 md:gap-12 lg:gap-24 items-center">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">
              A little about me
            </h2>
            <p className="text-lg mb-8">
              Throughout my career, I have successfully led development teams,
              architected web applications, and delivered hundreds of websites
              spanning e-commerce, membership platforms, corporate sites, and
              intranets.
            </p>
            <div>
              <Button asChild variant="outline">
                <Link href="/about">
                  Learn More About Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="space-b-6 md:space-bottom-8 text-center">
            <h3 className="text-xl font-semibold mb-6 md:mb-12 rainbow-frame">
              Technologies I Work With
            </h3>
            <TechnologyBadges technologies={technologies} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
