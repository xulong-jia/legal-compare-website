import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-zinc-950">
          中外法律制度对照
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-700">
          <Link href="/" className="hover:text-zinc-950">
            首页
          </Link>
          <Link href="/category/civil" className="hover:text-zinc-950">
            分类
          </Link>
          <Link href="/about" className="hover:text-zinc-950">
            关于
          </Link>
        </nav>
      </div>
    </header>
  );
}
