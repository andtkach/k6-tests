# Books Service (Express)

Simple Node.js + Express API with an in-memory books collection and utility endpoints for load testing.

## Run

```bash
npm install
npm run start
```

Server starts on `http://localhost:3000` (or `PORT` env var).

For development with auto-reload:

```bash
npm run dev
```

## API

### System

- `GET /health`
  - Response: `200` with body `{ "ok": true }`
- `GET /delay?delay=<seconds>`
  - Query parameter `delay`: number of seconds to wait (default: `1`)
  - Response: `200` with body `delay for <N> seconds`

### Books

- `GET /books`
  - Response: `200` with array of books
- `GET /books/:id`
  - Response: `200` with book, or `404` if not found
- `POST /books`
  - Body: `{ "title": "…", "author": "…", "year": 2020 }`
  - `title` and `author` are required; `year` is optional
  - Response: `201` with created book
- `PUT /books/:id`
  - Body: any of `{ "title": "…", "author": "…", "year": 2021 }`
  - At least one field is required
  - Response: `200` with updated book, or `404` if not found
- `DELETE /books/:id`
  - Response: `204` on success, or `404` if not found

## Logging

All requests are logged to the console with method, URL, status code, and duration.

## Thread-safety note

The in-memory store is protected by a mutex so concurrent requests can’t interleave updates inside a single Node process.
