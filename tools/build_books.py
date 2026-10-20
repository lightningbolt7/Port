"""Build the bookshelf data from a Goodreads export.

Usage:
    python tools/build_books.py path/to/goodreads_library_export.csv

Keeps only books that have a written review (plus whatever is on the
"currently-reading" shelf), looks up each cover on Open Library, and writes
assets/js/books-data.js for books.html.
Covers are linked by Open Library cover ID (those URLs aren't rate limited).
To pin a specific cover, add the book's Goodreads "Book Id" to COVER_OVERRIDES,
or to LOCAL_COVERS for an image saved in assets/books/ (when Open Library lacks a good one).
Books not yet on Goodreads go in MANUAL_BOOKS; once the export has the same
title, the export's copy wins and the manual entry is skipped.
"""
import csv
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets" / "js" / "books-data.js"
UA = {"User-Agent": "arvindh.dev bookshelf builder (personal site)"}

# Goodreads Book Id -> Open Library cover ID, for when the automatic pick is wrong
COVER_OVERRIDES: dict[str, int] = {
    "20518872": 8478888,  # The Three-Body Problem: title search returns a Dark Forest cover
}

# Goodreads Book Id -> image in this repo, used before any Open Library lookup
LOCAL_COVERS: dict[str, str] = {
    "233880206": "assets/books/tao-solandis.png",  # Tao Solandis isn't on Open Library
    "1126719": "assets/books/house-of-suns.jpg",  # newer edition; the Open Library scan has white borders
}

# Reviewed books that aren't in the Goodreads export (yet)
MANUAL_BOOKS = [
    {
        "id": "manual-left-hand-of-darkness",
        "title": "The Left Hand of Darkness",
        "series": "Hainish Cycle",
        "seriesNo": "4",
        "author": "Ursula K. Le Guin",
        "rating": 3,
        "review": (
            "although the concepts are ahead of its time, I just didn’t connect well with it. The second half was "
            "better than the first but it just felt lackluster. Definitely a tough read (although I liked the writing "
            "style) for me but I’m happy I was able to get one of the classics done."
        ),
        "dateRead": "2026-10-20",
        "pages": 304,
        "year": "1969",
        "cover": "https://covers.openlibrary.org/b/id/10618463-L.jpg",
        "goodreads": "https://www.goodreads.com/search?q=The+Left+Hand+of+Darkness+Le+Guin",
    },
]


def get_json(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.load(r)


def cover_by_isbn(isbn):
    try:
        data = get_json(f"https://openlibrary.org/isbn/{isbn}.json")
        ids = [c for c in data.get("covers", []) if c and c > 0]
        return ids[0] if ids else None
    except Exception:
        return None


def cover_by_search(title, author):
    q = urllib.parse.urlencode({"title": title, "author": author, "limit": 5, "fields": "cover_i,title"})
    try:
        docs = get_json(f"https://openlibrary.org/search.json?{q}").get("docs", [])
    except Exception:
        return None
    for d in docs:
        if d.get("cover_i"):
            return d["cover_i"]
    return None


def find_cover(gid, isbn, title, author):
    """Local image > pinned Open Library ID > ISBN lookup > title search."""
    if gid in LOCAL_COVERS:
        return LOCAL_COVERS[gid], "local"
    cover, source = COVER_OVERRIDES.get(gid), "override"
    if not cover and isbn:
        cover, source = cover_by_isbn(isbn), "isbn"
    if not cover:
        cover, source = cover_by_search(title, author), "search"
    time.sleep(0.4)  # be polite to Open Library
    return (f"https://covers.openlibrary.org/b/id/{cover}-L.jpg" if cover else None), source


def split_title(raw):
    """'The Dark Forest (Remembrance of Earth's Past, #2)' -> title, series, number."""
    m = re.match(r"^(.*?)\s*\(([^()]*?)(?:,\s*#([\d.]+))?\)$", raw)
    if not m:
        return raw.strip(), None, None
    return m.group(1).strip(), m.group(2).strip(), m.group(3)


def main(path):
    rows = list(csv.DictReader(open(path, encoding="utf-8-sig")))
    books, current = [], []
    for r in rows:
        review = r["My Review"].strip()
        reading_now = r["Exclusive Shelf"] == "currently-reading"
        if not review and not reading_now:
            continue
        title, series, number = split_title(r["Title"])
        author = re.sub(r"\s+", " ", r["Author"]).strip()
        isbn = r["ISBN13"].strip('="') or r["ISBN"].strip('="')
        gid = r["Book Id"]
        cover, source = find_cover(gid, isbn, title, author)
        print(f"  {'ok ' if cover else 'MISSING'} {source:8} {title}{'  (currently reading)' if reading_now else ''}")

        book = {
            "id": gid,
            "title": title,
            "series": series,
            "seriesNo": number,
            "author": author,
            "pages": int(r["Number of Pages"]) if r["Number of Pages"].isdigit() else None,
            "year": r["Original Publication Year"] or r["Year Published"] or None,
            "cover": cover,
            "goodreads": f"https://www.goodreads.com/book/show/{gid}",
        }
        if reading_now:
            current.append(book)
            continue
        books.append({
            **book,
            "rating": int(float(r["My Rating"] or 0)),
            "review": review,
            "dateRead": r["Date Read"].replace("/", "-") or None,
        })

    have = {b["title"].casefold() for b in books}
    for m in MANUAL_BOOKS:
        if m["title"].casefold() in have:
            print(f"  skip     {m['title']} (now in the Goodreads export)")
            continue
        print(f"  ok  manual   {m['title']}")
        books.append(m)

    books.sort(key=lambda b: b["dateRead"] or "", reverse=True)
    OUT.write_text(
        "// Generated by tools/build_books.py from a Goodreads export — edit there, not here.\n"
        f"window.BOOKS = {json.dumps(books, ensure_ascii=False, indent=2)};\n"
        f"window.CURRENTLY_READING = {json.dumps(current, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    print(f"\nWrote {len(books)} reviewed books and {len(current)} currently reading to {OUT}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
