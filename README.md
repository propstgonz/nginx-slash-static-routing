# Static Site Cleaner & Nginx Router with Docker

---

## Table of Contents
- [Introduction](#introduction)  
- [Project Structure](#project-structure)  
- [How It Works](#how-it-works)  
- [Requirements](#requirements)  
- [Usage and Deployment](#usage-and-deployment)  
- [Important Notes](#important-notes)  
- [Recommendations](#recommendations)  
- [License](#license)

---

## Introduction

This project offers a streamlined solution to deploy static websites with clean, SEO-friendly URLs using **Nginx** and **Docker**, enhanced by a Python preprocessor that automatically transforms internal `<a href>` links in your HTML files.

Its primary goal is to allow you to place your static website files into the project, execute the Docker Compose setup, and have all `.html` links automatically rewritten to slash-based routes that Nginx serves seamlessly.

---

## Project Structure

The project folder looks like this:

```
nginx-slash/
  Dockerfile
  docker-compose.yml
  fix_links.py
  html/                # Static HTML content folder - only test/demo content here
  nginx/
    default.conf
```

> **Note:**  
> The current content inside the `html/` directory is **only for testing and demonstration purposes**.  
> When deploying your actual website, **remove all test files inside `html/` and replace with your own static site files**.

---

## How It Works

- **Python Preprocessor (fix_links.py):**  
  This script runs before Nginx serves files. It scans all `.html` files in the `html/` directory and **rewrites all internal `<a href="...">` links** so that links ending with `.html` become clean slash URLs.  
  For example:  
  `<a href="about/team.html">` becomes `<a href="/about/team/">`  
  This allows you to keep `.html` files physically but serve user-friendly URLs.

- **Nginx Configuration (nginx/default.conf):**  
  Nginx listens on port 80 and serves files from `/usr/share/nginx/html` (mapped from your local `html/` folder). It:  
  - Redirects `.html` URLs to their slash equivalents.  
  - Handles requests like `/about/team/` by serving `/about/team.html` or `/about/team/index.html`.  
  - Serves the root `/` with `index.html`.

- **Docker Compose:**  
  There are two services:  
  1. **preprocessor** — runs the Python script to fix links before serving.  
  2. **nginx** — serves the processed files using Nginx.

---

## Requirements

- [Docker](https://www.docker.com/get-started) (Docker Desktop on Windows/Mac or Docker Engine on Linux)  
- Python 3.11+ (used by the preprocessor service)  
- Recommended: a reverse proxy (e.g. Traefik, Caddy, Nginx) for production deployments to manage HTTPS and routing.

---

## Usage and Deployment

1. Replace the `html/` folder content with your own static website files. Ensure your site has `.html` files organized as usual.  
2. Run the Docker Compose setup with:  
   `docker compose up --build`  
3. The preprocessor service will **automatically rewrite all internal `<a href="*.html">` links** to their slash-based equivalent URLs.  
4. Nginx will serve your site on `http://localhost:80` with clean URLs like `/about/team/`.

---

## Important Notes

- This project is **only intended for static websites**. It does **not** support server-side rendering, dynamic content, or backend APIs.  
- The Python preprocessor **modifies your HTML files in place** inside the `html/` folder during build.  
  Always keep a backup or deploy only finalized static content to avoid unwanted changes.  
- The system relies on consistent `.html` file naming conventions to generate clean URLs. Avoid linking directly to URLs without `.html` in your source files.
- All file paths must be absolute, as relative paths are broken when docker compose is executed.
- For production, it is highly recommended to run this setup **behind a reverse proxy** that handles TLS certificates, load balancing, and security headers.

---

## Recommendations

- Keep your original static source files in a separate directory or repository.  
- Use this project as a deployment step that prepares and serves your static site with clean URLs.  
- Regularly test your site locally before deploying to production environments.  
- Extend the Nginx configuration if you need caching, compression, or advanced routing features.

---

Thank you for reading!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
