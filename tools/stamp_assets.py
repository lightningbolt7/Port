"""Stamp local CSS/JS references in the HTML pages with a content hash.

Usage:
    python tools/stamp_assets.py

GitHub Pages lets browsers reuse files for up to 10 minutes, so right after a
deploy a visitor can get the new HTML with an old cached script or stylesheet.
This rewrites e.g. assets/js/main.js to assets/js/main.js?v=3f9a1c2e, where the
tag is a hash of the file's contents: it only changes when the file does, so
browsers fetch fresh copies exactly when needed. Run it before committing.
"""
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ["index.html", "books.html"]
REF = re.compile(r'((?:href|src)=")(assets/[^"?#]+\.(?:css|js))(?:\?v=[0-9a-f]*)?(")')


def stamp(page):
    path = ROOT / page
    html = path.read_text(encoding="utf-8")

    def repl(m):
        asset = ROOT / m.group(2)
        if not asset.exists():
            return m.group(0)
        tag = hashlib.sha1(asset.read_bytes()).hexdigest()[:8]
        return f"{m.group(1)}{m.group(2)}?v={tag}{m.group(3)}"

    new = REF.sub(repl, html)
    if new != html:
        path.write_text(new, encoding="utf-8")
    for m in REF.finditer(new):
        print(f"  {page}: {m.group(2)}")


if __name__ == "__main__":
    for p in PAGES:
        stamp(p)
