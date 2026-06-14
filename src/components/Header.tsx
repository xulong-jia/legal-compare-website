import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-semibold text-zinc-950">
          中外法律制度对照
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-zinc-700 sm:justify-end">
          <Link href="/" className="hover:text-zinc-950">
            首页
          </Link>
          <Link href="/topics/contract-law" className="hover:text-zinc-950">
            合同法专题
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
