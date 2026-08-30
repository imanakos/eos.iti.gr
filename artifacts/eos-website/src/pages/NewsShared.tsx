import type { ReactNode } from "react";

function linkifyText(text: string): ReactNode[] {
  const urlPattern = /https?:\/\/[^\s<>"')]+/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(urlPattern)) {
    const start = match.index ?? 0;
    const rawUrl = match[0];
    const url = rawUrl.replace(/[.,;:!?]+$/, "");
    const trailingPunctuation = rawUrl.slice(url.length);

    if (start > cursor) {
      nodes.push(text.slice(cursor, start));
    }

    nodes.push(
      <a
        key={`${start}-${url}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all font-medium text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary"
      >
        {url}
      </a>
    );

    if (trailingPunctuation) {
      nodes.push(trailingPunctuation);
    }

    cursor = start + rawUrl.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

export function NewsBody({ body }: { body: string }) {
  return (
    <div className="space-y-6">
      {body
        .split(/\n\s*\n/)
        .filter((paragraph) => paragraph.trim())
        .map((paragraph, index) => (
          <p key={`${index}-${paragraph.slice(0, 32)}`} className="whitespace-pre-line">
            {linkifyText(paragraph)}
          </p>
        ))}
    </div>
  );
}
