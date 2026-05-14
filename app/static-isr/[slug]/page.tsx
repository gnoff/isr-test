import Link from "next/link";
import { sleep } from "../../components/sleep";
import { RenderInfo, getRenderInfoKey } from "../../components/render-info";

export async function generateStaticParams() {
  return [{ slug: "a" }];
}

async function CachedContent({ slug }: { slug: string }) {
  "use cache";
  await sleep(5000);

  return (
    <>
      <h1>/{slug}</h1>

      <section>
        <h2>This render</h2>
        <p>Rendered at: {new Date().toISOString()}</p>
        <p>
          If static generation is <code>true</code>, this page was rendered
          during a static generation pass (build time or ISR). If{" "}
          <code>false</code>, it was rendered as a dynamic request. The value is
          frozen in the cache entry created by <code>&quot;use cache&quot;</code>,
          so it reflects the conditions when this cache entry was first populated.
        </p>
      </section>

      <section>
        <h2>Navigate</h2>
        <p>Each link appends a character to the current slug, creating a new uncached page.</p>
        <ul>
          <li><Link href={`/static-isr/${slug}a`}>{slug}a</Link></li>
          <li><Link href={`/static-isr/${slug}b`}>{slug}b</Link></li>
          <li><Link href={`/static-isr/${slug}c`}>{slug}c</Link></li>
        </ul>
        <p><Link href="/static-isr">Home</Link></p>
      </section>
    </>
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
      <CachedContent slug={slug} />
      <RenderInfo now={await getRenderInfoKey()} />
    </main>
  );
}
