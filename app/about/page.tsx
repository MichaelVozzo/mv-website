import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Michael Vozzo | Web Developer in Adelaide",
  description:
    "Learn more about Michael Vozzo, professional experience, values, and what drives their work.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="aspect-square rounded-full overflow-hidden bg-slate-200 mb-4 max-w-[300px] mx-auto">
                  <Image
                    src="/images/mv-about.jpg"
                    alt="Michael Vozzo"
                    className="w-full h-full object-cover"
                    width="300"
                    height="300"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">
                  About Me
                </h1>
                <p className="text-lg mb-6">
                  Experienced Web Developer with 13+ years in designing,
                  developing, and maintaining scalable web solutions. Proven
                  ability to lead teams, implement best practices, and optimise
                  website performance.
                </p>
                <p className="text-lg mb-6">
                  Adept at problem-solving and collaborating with stakeholders
                  to deliver high-quality, secure, and user-friendly
                  applications. Passionate about working in a structured team
                  environment, leveraging modern web technologies to drive
                  innovation and efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24 border-t-1 border-b-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Skills & Expertise
            </h2>

            <Tabs defaultValue="core" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto">
                <TabsTrigger value="core">Core Development</TabsTrigger>
                <TabsTrigger value="wordpress">WordPress</TabsTrigger>
                <TabsTrigger value="hosting">Web Hosting</TabsTrigger>
                <TabsTrigger value="other">Other Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="core" className="space-y-4">
                <Card>
                  <CardContent className="pt-6 ">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        HTML5, CSS3, JavaScript, TypeScript
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        React, Next.js
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        PHP, Python
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        WordPress, REST API, GraphQL
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        MySQL, MariaDB, PostgreSQL
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wordpress" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        Custom Theme Development
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        Custom Plugin Development
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        Headless WordPress with REST API
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        WooCommerce Customisation
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hosting" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        cPanel, WHM, AWS, Google Cloud
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        Cloudflare, DNS Management
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        NGINX, Apache, Docker, Redis
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        Email Hosting, Domain Registration
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        Security & Compliance
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="other" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        UI/UX Design, Web Accessibility (WCAG 3.0)
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        SEO Optimisation, Google PageSpeed
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        Google Analytics, Cybersecurity
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        Agile Development, Team Leadership
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        Version Control (Git), Microsoft Office
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge className="h-2 w-2 rounded-full p-0" />
                        Salesforce, ClickUp, Process Automation
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Professional Experience
            </h2>

            <div className="space-y-12">
              {/* Experience 1 */}
              <div className="relative pl-8 border-l-2 border-slate-200">
                <div className="absolute -left-3 top-0">
                  <div className="h-6 w-6 rounded-full bg-slate-800 dark:bg-amber-50"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold ">Senior Web Developer</h3>
                  <p className="text-slate-600 dark:text-slate-100 mb-2">
                    EDynam, Adelaide | March 2020 - Present
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>
                      Led a team of three developers, delivering
                      high-performance websites optimised for Google Core Web
                      Vitals and SEO.
                    </li>
                    <li>
                      Streamlined development workflows by introducing new
                      technologies and best practices, increasing efficiency by
                      30%.
                    </li>
                    <li>
                      Maintained and updated CMS applications for 160+
                      Australian businesses, ensuring security and optimal
                      performance.
                    </li>
                    <li>
                      Managed web hosting, domain registration, and email
                      hosting for 600+ clients, ensuring 99.9% uptime.
                    </li>
                    <li>
                      Developed custom WordPress themes and plugins to enhance
                      website functionality and improve client objectives.
                    </li>
                    <li>
                      Built headless WordPress applications using REST API,
                      integrating with React-based frontends for dynamic content
                      delivery.
                    </li>
                    <li>
                      Conducted in-person and digital training sessions,
                      empowering clients to manage their own web solutions
                      effectively.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 2 */}
              <div className="relative pl-8 border-l-2 border-slate-200">
                <div className="absolute -left-3 top-0">
                  <div className="h-6 w-6 rounded-full bg-slate-800 dark:bg-amber-50"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold ">Web Developer</h3>
                  <p className="text-slate-600 dark:text-slate-100 mb-2">
                    EDynam, Norwood | August 2010 - March 2020
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>
                      Designed, developed, and maintained full-stack WordPress
                      websites, driving client business growth.
                    </li>
                    <li>
                      Managed cloud hosting solutions, transitioning from
                      dedicated servers to scalable cloud infrastructure.
                    </li>
                    <li>
                      Played a pivotal role in expanding EDynam, contributing to
                      its success and reputation in Adelaide.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 3 */}
              <div className="relative pl-8 border-l-2 border-slate-200">
                <div className="absolute -left-3 top-0">
                  <div className="h-6 w-6 rounded-full bg-slate-800 dark:bg-amber-50"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Freelance Web Developer</h3>
                  <p className="text-slate-600 dark:text-slate-100 mb-2">
                    MV Multimedia, Adelaide | March 2009 - August 2010
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>
                      Provided web development, graphic design, and digital
                      marketing services to small businesses.
                    </li>
                    <li>
                      Managed end-to-end business operations, including client
                      acquisition and project management.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Education Section */}
      <section className="py-16 md:py-24 border-t-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Achievements */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Key Achievements</h2>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Badge className="mt-1.5 h-2 w-2 rounded-full p-0 shrink-0" />
                    <span>
                      Developed and optimised hundreds of websites, including
                      corporate, eCommerce, membership, and intranet solutions.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="mt-1.5 h-2 w-2 rounded-full p-0 shrink-0" />
                    <span>
                      Extended WooCommerce CMS functionality to support B2B
                      orders, improving order volume and efficiency.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="mt-1.5 h-2 w-2 rounded-full p-0 shrink-0" />
                    <span>
                      Achieved #1 Google ranking for &quot;plumber
                      Adelaide&quot; for Precise Services through advanced SEO
                      strategies.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="mt-1.5 h-2 w-2 rounded-full p-0 shrink-0" />
                    <span>
                      Contributed to a 7-year consecutive &apos;Top 3 Web
                      Designers in Adelaide&apos; award (2016-2022).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="mt-1.5 h-2 w-2 rounded-full p-0 shrink-0" />
                    <span>
                      Built a scalable intranet system for the Uniting Church
                      (SA), managing 56+ CMS applications efficiently.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="mt-1.5 h-2 w-2 rounded-full p-0 shrink-0" />
                    <span>
                      Implemented a shared component library for consistent
                      frontend development, reducing build time.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Education</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-slate-300 pl-4">
                    <h3 className="text-lg font-semibold">
                      Diploma of Information Technology (Multimedia)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-100">
                      TAFE SA | 2006-2007
                    </p>
                  </div>
                  <div className="border-l-2 border-slate-300 pl-4">
                    <h3 className="text-lg font-semibold">
                      Bachelor of Computer and Information Science (Software
                      Engineering)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-100">
                      University of South Australia | 2003-2005, Deferred
                    </p>
                  </div>
                  <div className="border-l-2 border-slate-300 pl-4">
                    <h3 className="text-lg font-semibold">Year 12</h3>
                    <p className="text-slate-600 dark:text-slate-100">
                      Christian Brothers College | Class of 2002
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <h2 className="text-3xl font-bold mb-4">
                    Additional Information
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge className="h-2 w-2 rounded-full p-0" />
                      Australian Citizen
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge className="h-2 w-2 rounded-full p-0" />
                      Can obtain an Australian Federal Police clearance if
                      required
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge className="h-2 w-2 rounded-full p-0" />
                      Current South Australian driver&apos;s licence & own
                      vehicle
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
