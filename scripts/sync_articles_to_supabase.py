#!/usr/bin/env python3
"""Sincroniza los 1,132 artículos de hieloencasa.com en public.hieloencasa_articles vía la Edge Function hieloencasa-chat."""
import json, pathlib, time, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/hieloencasa-chat"
SYNC_KEY = "hieloencasa-sync-2026"


def main():
    cats = {
        c["slug"]: c["name"]
        for c in json.loads((ROOT / "src/data/categories.json").read_text())
    }
    rows = []
    for f in sorted((ROOT / "src/content/articles").glob("*.json")):
        a = json.loads(f.read_text())
        rows.append(
            {
                "slug": a["slug"],
                "title": a["title"],
                "category": a["pillar"],
                "category_name": cats.get(a["pillar"], a["pillar"]),
                "excerpt": a.get("excerpt") or a.get("metaDescription") or "",
                "featured_image": f"/img/ambiente/cat-{a['pillar']}.webp",
                "read_time": f"{a.get('readingMinutes', 7)} min",
                "search_text": f"{a['title']} {a['primaryKeyword']} {a.get('excerpt', '')}".lower(),
                "active": True,
            }
        )

    total = 0
    for i in range(0, len(rows), 80):
        batch = rows[i : i + 80]
        data = json.dumps({"mode": "seed_articles", "articles": batch}).encode(
            "utf-8"
        )
        for attempt in range(4):
            try:
                req = urllib.request.Request(
                    ENDPOINT,
                    data=data,
                    headers={
                        "Content-Type": "application/json",
                        "x-sync-key": SYNC_KEY,
                    },
                )
                with urllib.request.urlopen(req, timeout=60) as r:
                    res = json.loads(r.read())
                    total += res.get("count", 0)
                    print(f"Batch {i // 80 + 1}: {res}", flush=True)
                    break
            except Exception:
                if attempt == 3:
                    raise
                time.sleep(1.5)
    print(
        f"OK: Sincronizados {total} artículos en Supabase public.hieloencasa_articles."
    )


if __name__ == "__main__":
    main()
