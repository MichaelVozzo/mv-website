// Container.tsx
export const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`container mx-auto px-4 md:px-6 ${className}`}>
    {children}
  </div>
);

// Section.tsx
export const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`w-full py-12 md:py-24 lg:py-32 ${className}`}>
    {children}
  </section>
);
