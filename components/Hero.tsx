import Link from "next/link";
import Image from "next/image";
import profilePic2 from "/public/images/mv-home-shot-2.webp";
import linkedinLogo from "/public/images/techologies/linkedin.svg";
import githubLight from "/public/images/techologies/Github_light.svg";
import githubDark from "/public/images/techologies/Github_dark.svg";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/Layout";

export default function Hero() {
  return (
    <Section>
      <Container className="overflow-x-clip lg:overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="flex flex-col space-y-4">
            <h1 className="md:text-xl font-semibold relative rainbow-frame self-start">
              Full stack web developer in Adelaide
            </h1>
            <p className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Hi, I&apos;m Michael!
            </p>
            <p className="md:text-lg text-pretty max-w-[600px]">
              I specialise in building high-performance, scalable, and
              user-centric web solutions, leveraging techologies such as React,
              TypeScript, Next.JS and WordPress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-row gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/mgxhtt-8bbb354b"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={linkedinLogo}
                  alt="Michael's Linkedin Profile Link"
                  className="object-contain"
                  width={30}
                  height={30}
                  priority
                />
              </a>
              <a
                href="https://github.com/MichaelVozzo"
                className="dark:hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={githubLight}
                  alt="Michael's Github Profile Link"
                  className="object-contain dark:hidden"
                  width={30}
                  height={30}
                  priority
                />
              </a>
              <a
                href="https://github.com/MichaelVozzo"
                className="hidden dark:block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={githubDark}
                  alt="Michael's Github Profile Link"
                  className="object-contain hidden dark:block"
                  width={30}
                  height={30}
                  priority
                />
              </a>
            </div>
          </div>
          <div className="relative flex flex-col justify-center items-center">
            <div className="oval-background"></div>
            <div className="relative w-[80%] h-[400px] md:h-[600px] overflow-hidden z-10">
              <Image
                src={profilePic2}
                alt="Michael Vozzo web developer"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
