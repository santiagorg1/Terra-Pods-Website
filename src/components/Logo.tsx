import Image from "next/image";

export default function Logo({
  variant = "color",
  width = 160,
  className,
}: {
  variant?: "color" | "white";
  width?: number;
  className?: string;
}) {
  const src =
    variant === "white"
      ? "/isn/logo-isn-white.png"
      : "/isn/logo-isn-transparent.png";
  return (
    <Image
      src={src}
      alt="ISN Customs Broker International"
      width={width}
      height={Math.round(width * (1044 / 1796))}
      priority
      className={className}
    />
  );
}
