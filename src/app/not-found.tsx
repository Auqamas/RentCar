import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-5 py-24 text-center">
      <p className="text-brand tracking-[0.2em] text-xs uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl font-extrabold">This page is not in the garage.</h1>
      <Link href="/" className="btn-primary mt-8 inline-flex h-12 px-8 text-sm">
        Go home
      </Link>
    </div>
  );
}
