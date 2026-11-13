/**
 * Undated releases occupy their editorial position in the collection. Sort the
 * dated runs on either side of them without guessing when an older note appeared.
 * The same helper drives the website, static collection and RSS feed.
 */
export function orderEOInsights<T extends { publishedAt?: string }>(articles: T[]): T[] {
  const ordered: T[] = [];
  let dated: T[] = [];
  const flush = () => {
    ordered.push(...dated.sort((a, b) => b.publishedAt!.localeCompare(a.publishedAt!)));
    dated = [];
  };
  for (const article of articles) {
    if (article.publishedAt) {
      dated.push(article);
    } else {
      flush();
      ordered.push(article);
    }
  }
  flush();
  return ordered;
}
