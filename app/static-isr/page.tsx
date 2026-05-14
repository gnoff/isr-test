import Link from "next/link";
import { sleep } from "../components/sleep";
import { RenderInfo, getRenderInfoKey } from "../components/render-info";

async function CachedContent() {
  "use cache";
  await sleep(5000);

  return (
    <>
      <h1>ISR Test (Static ISR)</h1>

      <section>
        <h2>How this works</h2>
        <p>
          Every page in this app uses <code>&quot;use cache&quot;</code> and
          takes 5 seconds to render (artificial delay via <code>sleep()</code>).
          This lets you observe ISR and static generation behavior.
        </p>
        <p>
          The home page (<code>/static-isr</code>) is prerendered at build time.
          The <code>/static-isr/[slug]</code> route uses{" "}
          <code>generateStaticParams</code> to prerender{" "}
          <code>/static-isr/a</code> at build time. All other slugs are
          generated on first request (ISR).
        </p>
        <p>
          Each page links to longer slugs by appending a, b, or c. For example{" "}
          <code>/static-isr/a</code> links to <code>/static-isr/aa</code>,{" "}
          <code>/static-isr/ab</code>, <code>/static-isr/ac</code>. This creates
          an infinite tree of pages you can use to test cache behavior with pages
          that have never been visited.
        </p>
        <p>
          To detect whether a render is happening during static generation or a
          dynamic request, we use a separate <code>&quot;use cache&quot;</code>{" "}
          component that takes <code>performance.now()</code> as input. This
          forces a cache miss on every render, so the component always executes
          fresh and reads the current <code>isStaticGeneration</code> from
          Next.js internals (<code>workAsyncStorage</code>). The main page
          content is cached separately so it still benefits from ISR.
        </p>
      </section>

      <section>
        <h2>This render</h2>
        <p>Rendered at: {new Date().toISOString()}</p>
      </section>

      <section>
        <h2>Navigate</h2>
        <ul>
          <li><Link href="/static-isr/a">a</Link></li>
          <li><Link href="/static-isr/b">b</Link></li>
          <li><Link href="/static-isr/c">c</Link></li>
        </ul>
      </section>
    </>
  );
}

export default async function Home() {
  return (
    <main>
      <CachedContent />
      <RenderInfo now={await getRenderInfoKey()} />
    </main>
  );
}
