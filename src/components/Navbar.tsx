import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="
        fixed
        inset-x-0
        top-0
        z-50
        flex
        w-full
        items-center
        justify-between

        px-4
        py-5

        sm:px-5
        sm:py-6

        md:px-7
        md:py-7

        lg:px-8
        lg:py-8

        xl:px-10
        2xl:px-12
      "
    >
      {/* LOGO */}
      <Link
        href="/"
        className="
          shrink-0
          font-mono
          text-[clamp(0.7rem,1.2vw,1.25rem)]
          font-medium
          uppercase
          leading-none
          text-white
          transition-opacity
          duration-300
          hover:opacity-60
        "
      >
        LOGO
      </Link>

      {/* NAVIGATION */}
      <div
        className="
          flex
          shrink-0
          items-center

          gap-3

          sm:gap-4

          md:gap-5

          lg:gap-7

          xl:gap-8

          2xl:gap-10
        "
      >
        <Link
          href="/"
          className="
            whitespace-nowrap
            font-mono
            text-[clamp(0.65rem,1.2vw,1.25rem)]
            font-medium
            uppercase
            leading-none
            text-white
            transition-opacity
            duration-300
            hover:opacity-60
          "
        >
          Home
        </Link>

        <Link
          href="/about"
          className="
            whitespace-nowrap
            font-mono
            text-[clamp(0.65rem,1.2vw,1.25rem)]
            font-medium
            uppercase
            leading-none
            text-white
            transition-opacity
            duration-300
            hover:opacity-60
          "
        >
          About
        </Link>

        <Link
          href="/contact"
          className="
            whitespace-nowrap
            font-mono
            text-[clamp(0.65rem,1.2vw,1.25rem)]
            font-medium
            uppercase
            leading-none
            text-white
            transition-opacity
            duration-300
            hover:opacity-60
          "
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}