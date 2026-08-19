import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/Layout";

const profilePic2 = "/images/mv-home-shot-2.webp";
const linkedinLogo = "/images/techologies/linkedin.svg";
const githubLight = "/images/techologies/Github_light.svg";
const githubDark = "/images/techologies/Github_dark.svg";

export default function Hero() {
	return (
		<Section>
			<Container className="overflow-x-clip lg:overflow-visible">
				<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
					<div className="flex flex-col space-y-4">
						<h1 className="relative self-start rainbow-frame font-semibold md:text-xl">Full stack web developer in Adelaide</h1>

						<p className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Hi, I&apos;m Michael!</p>

						<p className="max-w-[600px] text-pretty md:text-lg">
							I specialise in building high-performance, scalable, and user-centric web solutions, leveraging technologies such as
							React, TypeScript, Next.JS and WordPress.
						</p>

						<div className="flex flex-col gap-4 pt-4 sm:flex-row">
							<Button asChild size="lg">
								<Link href="/projects">
									View My Work
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>

						<div className="flex flex-row gap-4 pt-4">
							<a href="https://www.linkedin.com/in/mgxhtt-8bbb354b" target="_blank" rel="noopener noreferrer">
								<Image src={linkedinLogo} alt="Michael's LinkedIn profile" width={30} height={30} priority />
							</a>

							<a href="https://github.com/MichaelVozzo" className="dark:hidden" target="_blank" rel="noopener noreferrer">
								<Image src={githubLight} alt="Michael's GitHub profile" width={30} height={30} priority />
							</a>

							<a href="https://github.com/MichaelVozzo" className="hidden dark:block" target="_blank" rel="noopener noreferrer">
								<Image src={githubDark} alt="Michael's GitHub profile" width={30} height={30} priority />
							</a>
						</div>
					</div>

					<div className="relative flex flex-col items-center justify-center">
						<div className="oval-background" />
						<div className="relative z-10 h-[400px] w-[80%] overflow-hidden md:h-[600px]">
							<Image src={profilePic2} alt="Michael Vozzo, web developer" fill className="object-contain" priority />
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
}
