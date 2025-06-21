FROM python:3.11-slim

WORKDIR /app
COPY . /app

RUN python fix_links.py