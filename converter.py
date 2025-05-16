import markdown
import os

INPUT_DIR = "conteudo"
OUTPUT_DIR = "blog/posts"
TEMPLATE = """<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{titulo}</title>
  <style>
    body {{
      font-family: sans-serif;
      padding: 2rem;
      margin: 0;
      background: #fdfdfd;
    }}
    h1 {{
      color: #222;
    }}
    a {{
      display: inline-block;
      margin-top: 2rem;
      color: #0044cc;
      text-decoration: none;
    }}
    @media (max-width: 600px) {{
      body {{
        padding: 1rem;
      }}
    }}
  </style>
</head>
<body>
  <h1>{titulo}</h1>
  {conteudo}
  <hr><a href="/blog.html">← Voltar ao Blog</a>
</body>
</html>
"""

os.makedirs(OUTPUT_DIR, exist_ok=True)

for filename in os.listdir(INPUT_DIR):
    if filename.endswith(".md"):
        with open(os.path.join(INPUT_DIR, filename), "r", encoding="utf-8") as f:
            md_content = f.read()
        html_content = markdown.markdown(md_content)
        titulo = filename.replace(".md", "").replace("-", " ").title()
        final_html = TEMPLATE.format(titulo=titulo, conteudo=html_content)
        with open(os.path.join(OUTPUT_DIR, filename.replace(".md", ".html")), "w", encoding="utf-8") as f:
            f.write(final_html)
