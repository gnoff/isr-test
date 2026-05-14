import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>ISR Test</h1>
      <ul>
        <li><Link href="/static-isr">Static ISR</Link> — fully cached pages, no dynamic parts</li>
        <li><Link href="/ppr-isr">PPR ISR</Link> — partially static pages with a dynamic Suspense boundary</li>
      </ul>
    </main>
  );
}
