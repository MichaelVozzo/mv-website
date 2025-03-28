import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const TechBadge = ({
  name,
  imageLight,
  imageDark,
  width,
  height,
}: {
  name: string;
  imageLight: string;
  imageDark: string;
  width: number;
  height: number;
}) => {
  const lightImageClassName = imageDark
    ? "object-contain my-auto dark:hidden"
    : "object-contain my-auto";
  return (
    <div className="flex flex-col gap-2 justify-end items-center">
      <Image
        src={imageLight}
        alt={`${name} Logo`}
        width={width}
        height={height}
        className={lightImageClassName}
        priority
      />
      {imageDark && (
        <Image
          src={imageDark}
          alt={`${name} Logo`}
          width={width}
          height={height}
          className="object-contain my-auto hidden dark:block"
          priority
        />
      )}
      <p className="text-base py-1 px-3">{name}</p>
    </div>
  );
};

export default TechBadge;
