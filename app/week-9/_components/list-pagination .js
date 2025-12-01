import { useState } from "react";

export default function LisPagination({ initialCursor = null, pageSize = 10 }) {
  const [cursor, setCursor] = useState(initialCursor);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  async function loadNext() {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/items?cursor=${cursor ?? ''}&limit=${pageSize}`);
      const json = await res.json();
      setItems(prev => [...prev, ...(json.items || [])]);
      setCursor(json.nextCursor ?? null);
      setHasMore(Boolean(json.nextCursor));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <ul>{items.map(it => <li key={it.id}>{it.name}</li>)}</ul>
      <button onClick={loadNext} disabled={!hasMore || loading}>
        {loading ? 'Loading…' : hasMore ? 'Load more' : 'No more'}
      </button>
    </div>
  );
}