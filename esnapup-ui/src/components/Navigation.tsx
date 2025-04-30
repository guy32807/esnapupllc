// filepath: /src/components/Navigation.tsx
import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <nav className="flex justify-center gap-8 p-4 bg-gray-100 shadow-md">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <Link href="/about-us" className="hover:underline">
        About Us
      </Link>
      <Link href="/contact-us" className="hover:underline">
        Contact Us
      </Link>
    </nav>
  );
}