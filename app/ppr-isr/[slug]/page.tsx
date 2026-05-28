import Link from "next/link";
import { Suspense } from "react";
import { sleep } from "../../components/sleep";
import { RenderInfo, getRenderInfoKey } from "../../components/render-info";

export async function generateStaticParams() {
  return [{ slug: "a" }];
}

async function CachedContent({ slug }: { slug: string }) {
  "use cache";
  await sleep(5000);

  return (
    <section>
      <h2>Cached (static) portion</h2>
      <p>Rendered at: {new Date().toISOString()}</p>
    </section>
  );
}

async function DynamicContent() {
  await sleep(5000);

  return (
    <section>
      <h2>Dynamic portion</h2>
      <p>Rendered at: {new Date().toISOString()}</p>
    </section>
  );
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <h1>/{slug}</h1>

      <CachedContent slug={slug} />

      <Suspense fallback={<p>Loading dynamic content...</p>}>
        <DynamicContent />
      </Suspense>

      {/*<RenderInfo now={await getRenderInfoKey()} />*/}

      <section>
        <h2>Navigate</h2>
        <p>
          Each link appends a character to the current slug, creating a new
          uncached page.
        </p>
        <ul>
          <li>
            <Link href={`/ppr-isr/${slug}a`}>{slug}a</Link>
          </li>
          <li>
            <Link href={`/ppr-isr/${slug}b`}>{slug}b</Link>
          </li>
          <li>
            <Link href={`/ppr-isr/${slug}c`}>{slug}c</Link>
          </li>
        </ul>
        <p>
          <Link href="/ppr-isr">Home</Link>
        </p>
      </section>
    </main>
  );
}
