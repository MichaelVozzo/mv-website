export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container mx-auto flex h-16 flex-wrap items-center justify-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Michael Vozzo. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/MichaelVozzo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mgxhtt-8bbb354b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
