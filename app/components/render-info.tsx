import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import { sleep } from "./sleep";

// eslint-disable-next-line react-hooks/purity
async function getCachedNow() {
  "use cache";
  return performance.now();
}

export async function getRenderInfoKey() {
  const isStaticGeneration = workAsyncStorage.getStore()?.isStaticGeneration;
  if (isStaticGeneration) {
    return getCachedNow();
  }
  // eslint-disable-next-line react-hooks/purity
  return performance.now();
}

export async function RenderInfo({ now, label }: { now: number; label?: string }) {
  "use cache";
  await sleep(5000);
  const isStaticGeneration = workAsyncStorage.getStore()?.isStaticGeneration;
  const isStatic = isStaticGeneration === true;
  return (
    <p
      style={{
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: "1.5rem",
        color: isStatic ? "green" : "red",
        padding: "0.5rem",
        border: `3px solid ${isStatic ? "green" : "red"}`,
        display: "inline-block",
      }}
    >
      {label ? `${label} — ` : ""}
      {isStatic ? "STATIC" : "DYNAMIC"}
    </p>
  );
}
