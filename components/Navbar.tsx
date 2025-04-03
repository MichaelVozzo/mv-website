"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "My Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Prevent scrolling when mobile nav is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileNavOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <nav className="container flex h-16 items-center mx-auto relative">
        <div className="mr-8">
          <Link
            href="/"
            className="text-xl font-bold"
            aria-label="Navigate Home"
          >
            <svg
              width="40"
              height="38"
              viewBox="0 0 170 161"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M169.001 66.6459C164.735 66.6099 161.82 66.8965 160.26 67.5059C158.699 68.1165 157.692 69.0405 157.236 70.2805L119.675 160.501L107.941 160.401L72.8388 69.7019C71.7948 67.0259 68.1162 65.6619 61.8068 65.6085L61.8455 60.9432L105.844 61.3139L105.805 65.9792L92.6055 65.8685C90.0268 65.8459 88.7322 66.5912 88.7188 68.1019C88.7148 68.6352 88.8428 69.2165 89.1055 69.8392L118.591 146.623L148.427 71.4059C148.699 70.7859 148.837 70.1658 148.843 69.5432C148.861 67.4085 146.869 66.3259 142.871 66.2912L133.937 66.2179L133.976 61.5512L169.041 61.8459L169.001 66.6459Z"
                fill="currentColor"
              />
              <path
                d="M125.897 4.66667C117.897 4.72667 113.913 6.80267 113.944 10.8893L114.528 88.3547C114.559 92.444 118.575 94.4573 126.573 94.3973L126.609 99.064L89.0093 99.3467L88.9747 94.68C96.8853 94.6213 100.825 92.5467 100.795 88.4573L100.221 12.3267L67.144 99.512L54.344 99.608L19.956 12.9307L20.5307 89.0627C20.5613 93.152 24.5307 95.1653 32.444 95.1067L32.4787 99.7733L0.746663 100.012L0.710663 95.3453C8.62133 95.2853 12.5613 93.212 12.5307 89.1227L11.9467 11.6587C11.916 7.572 7.94532 5.55466 0.0346578 5.61466L0 0.947998L30.932 0.714671L64.2493 87L96.2627 0.222666L125.863 0L125.897 4.66667Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-between md:flex">
          <div className="mx-auto flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-end md:hidden gap-4">
          <ModeToggle className="absolute top-4 left-4" />
          <button
            onClick={toggleMobileNav}
            className="text-foreground"
            aria-label="Open Mobile Navigation"
          >
            {isMobileNavOpen ? (
              <IoClose size={24} />
            ) : (
              <GiHamburgerMenu size={24} />
            )}
          </button>
        </div>
        {/* Full-Page Mobile Nav */}
        {isMobileNavOpen && (
          <div className="fixed top-0 left-0 w-full bg-background backdrop-blur-sm z-50 flex flex-col h-screen">
            <button
              onClick={toggleMobileNav}
              className="absolute top-4 right-4 text-foreground z-999"
              aria-label="Close Mobile Navigation"
            >
              <IoClose size={30} />
            </button>
            <div className="fixed top-0 left-0 w-full flex flex-col items-center justify-center h-screen overflow-auto">
              <div className="flex flex-col items-center justify-center w-full h-full overflow-y-auto p-16 absolute top-0 left-0 min-h-fit">
                <ul className="text-center space-y-8">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "text-3xl font-bold transition-colors hover:text-foreground",
                          pathname === item.href
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                        onClick={() => {
                          setIsMobileNavOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
