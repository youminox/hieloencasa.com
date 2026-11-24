export const CHAT_ENDPOINT_PUBLIC =
  "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/hieloencasa-chat";
export const OPEN_CHAT_EVENT = "hec:open-chat";

export function getVisitor(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let v = localStorage.getItem("hec_visitor");
    if (!v) {
      v =
        "hec-" +
        Math.random().toString(36).slice(2, 10) +
        "-" +
        Date.now().toString(36);
      localStorage.setItem("hec_visitor", v);
    }
    return v;
  } catch {
    return "anon";
  }
}

export function trackClick(
  source: string,
  extra?: {
    session_id?: string | null;
    article_slug?: string | null;
    article_title?: string | null;
    category?: string | null;
    target_url?: string | null;
  }
) {
  if (typeof window === "undefined") return;
  try {
    fetch(CHAT_ENDPOINT_PUBLIC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "track_click",
        source,
        session_id:
          extra?.session_id || localStorage.getItem("hec_chat_session") || null,
        visitor_id: getVisitor(),
        article_slug: extra?.article_slug || null,
        article_title: extra?.article_title || null,
        category: extra?.category || "amazon",
        target_url:
          extra?.target_url ||
          "https://www.amazon.com/s?k=Countertop+Nugget+and+Bullet+Ice+Maker&tag=hieloencasa-20",
        page_url: window.location.href,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}
