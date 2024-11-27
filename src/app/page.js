import Image from "next/image";
import Link from "next/link";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <div>Username</div>
      <input type="text" />
      <Link href="/logged">
        <button>Log in</button>
      </Link>
    </NextUIProvider>
  );
}
