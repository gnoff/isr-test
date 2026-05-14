import Link from "next/link";
import { Suspense } from "react";
import { sleep } from "../components/sleep";
import { RenderInfo, getRenderInfoKey } from "../components/render-info";
import { connection } from "next/server";

async function CachedContent() {
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
  await connection();

  return (
    <section>
      <h2>Dynamic portion</h2>
      <p>Rendered at: {new Date().toISOString()}</p>
    </section>
  );
}

export default async function Home() {
  return (
    <main>
      <h1>ISR Test (PPR ISR)</h1>

      <section>
        <h2>How this works</h2>
        <p>
          Each page has two parts: a <strong>cached</strong> portion using{" "}
          <code>&quot;use cache&quot;</code> (with a 5s render delay) and a{" "}
          <strong>dynamic</strong> portion wrapped in{" "}
          <code>&lt;Suspense&gt;</code> that renders fresh on every request.
        </p>
        <p>
          The static shell (including the cached portion) is served immediately
          from the CDN. The dynamic portion streams in after. Because both parts
          share the same Resume Data Cache (RDC), there is no tearing between
          the static and dynamic parts of the page.
        </p>
        <p>
          The <code>RenderInfo</code> component sits outside both cached and
          dynamic boundaries at the page level, using{" "}
          <code>performance.now()</code> as a cache key to force a fresh read of{" "}
          <code>isStaticGeneration</code> on every invocation.
        </p>
      </section>

      <CachedContent />

      <Suspense fallback={<p>Loading dynamic content...</p>}>
        <DynamicContent />
      </Suspense>

      <RenderInfo now={await getRenderInfoKey()} />

      <section>
        <h2>Navigate</h2>
        <ul>
          <li><Link href="/ppr-isr/a">a</Link></li>
          <li><Link href="/ppr-isr/b">b</Link></li>
          <li><Link href="/ppr-isr/c">c</Link></li>
        </ul>
      </section>
    </main>
  );
}
