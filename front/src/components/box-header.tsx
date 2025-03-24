import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string
  to: string
  toText: string
}

export const BoxHeader = ({ title, to, toText }: Props) => (
  <header className="flex justify-between items-center">
    <div className="flex">
      <h1 className="font-bold mr-2">{title}</h1>
      <LinkIcon size={20} strokeWidth="3" />
    </div>
    <Link href={to} className="ml-5 px-4 py-0.5 rounded-sm bg-purple-700 text-white cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed">{toText}</Link>
  </header>
)
