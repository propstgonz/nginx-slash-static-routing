import os
import re

HTML_DIR = "html"

def process_href(match, current_path):
    original = match.group(0)
    quote = match.group(1)
    href = match.group(2)

    if href.startswith(("http://", "https://", "//", "/")):
        return original

    if not href.endswith(".html"):
        return original

    abs_path = os.path.normpath(os.path.join(os.path.dirname(current_path), href))
    web_path = os.path.relpath(abs_path, HTML_DIR).replace(os.sep, "/")
    web_path = web_path[:-5]

    if web_path.endswith("index"):
        new_href = "/"
    else:
        new_href = f"/{web_path}/"

    return f'href={quote}{new_href}{quote}'

def process_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    def replacer(match):
        return process_href(match, path)

    new_content = re.sub(r'href=(["\'])([^"\']+\.html)\1', replacer, content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"✔️ Processed: {path}")

def main():
    for root, _, files in os.walk(HTML_DIR):
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                process_file(path)

if __name__ == "__main__":
    main()
