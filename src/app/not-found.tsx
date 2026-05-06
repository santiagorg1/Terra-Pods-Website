import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-pod flex min-h-[80vh] flex-col items-center justify-center pt-24 text-center">
      <span className="eyebrow">404</span>
      <h1 className="display-1 mt-6">
        This pod hasn't <span className="text-gold">arrived yet.</span>
      </h1>
      <p className="lead mt-6 max-w-md">
        The page you're looking for has moved or never existed. Let's get you
        back on the path.
      </p>
      <Link href="/" className="btn-primary mt-10">
        Return home
      </Link>
    </section>
  );
}
