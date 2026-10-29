# Dipankar Bhowmik — Cloud & Linux Infrastructure Portfolio (`dipankar@infra:~$`)

🌐 **Live Portfolio:** [https://dipankar-bhowmik.github.io](https://dipankar-bhowmik.github.io)  
📍 **Role Focus:** IT Support Engineer | Linux System Administration (RHEL/Ubuntu) | Cloud & DevOps Automation  
📫 **Contact:** [dkbhowmik0@gmail.com](mailto:dkbhowmik0@gmail.com) • [LinkedIn](https://www.linkedin.com/in/dipankarbhowmik)

---

## 1. Vision & Engineering Philosophy: Why I Built This

Most portfolios are static digital brochures—once the HTML loads in the browser, the connection dies and the page sits frozen. As an **IT Infrastructure, Linux, and Cloud professional**, I wanted my portfolio to behave like the production systems I support and automate.

**My Vision:** Treat my portfolio as a **live, observable distributed system**. When a hiring manager, recruiter, or senior engineer opens [dipankar-bhowmik.github.io](https://dipankar-bhowmik.github.io), they don't just read about my skills in Linux CLI, networking, and cloud infrastructure—they interact with a live terminal card (`hostnamectl — bash`) streaming real-time telemetry over a persistent WebSocket tunnel.

---

## 2. What Makes This Portfolio Unique (Key Features & Why I Used Them)

### ⚡ 1. Real-Time WebSocket Telemetry (Zero-Refresh Live Updates)
* **What it does:** Instead of using a traditional one-time HTTP `fetch()` request that requires a manual page refresh to see new data, this portfolio establishes a persistent two-way **WebSocket** connection (`WS LIVE`) to a cloud NoSQL database (`asia-southeast1`). Whenever a new visitor opens the site anywhere in the world, every currently open browser tab receives a sub-100ms push update and flashes green automatically.
* **Why I used it:** In enterprise infrastructure and SecOps (like Kibana dashboards or the Linux `watch` command), engineers rely on real-time streaming telemetry rather than stale snapshots. Building this directly into the hero terminal demonstrates practical event-driven architecture.

### 🔒 2. Database Concurrency Control via Atomic Transactions (`runTransaction`)
* **What it does:** If two or more visitors open the portfolio at the exact same millisecond, a naive `read -> add 1 -> write` script suffers from a **race condition**, overwriting one another's counts. I implemented atomic database transactions (`runTransaction`) paired with browser `sessionStorage` deduplication.
* **Why I used it:** Ensures 100% counter accuracy under parallel traffic while preventing a single user from artificially inflating the visitor count by repeatedly hitting F5/Refresh.

### 🟢 3. Ephemeral Session Presence & Disconnect Hooks (`onDisconnect`)
* **What it does:** Tracks `online_now` (live concurrent users viewing the site right now). When a visitor opens the site, a unique session node is pushed to `portfolio/online_users`, and a server-side `onDisconnect().remove()` hook is registered. The moment a visitor closes their browser tab or loses network connectivity, the database automatically removes their session and updates the active user count across all other open tabs.
* **Why I used it:** Mirrors how infrastructure monitoring tools track active SSH sessions or live cluster nodes using heartbeat and disconnect handlers.

### 🛡️ 4. Least-Privilege Database Security Rules
* **What it does:** Even though the frontend is hosted on a public GitHub Pages CDN, the backend database is locked down with declarative JSON security rules:
  * `total_views` only permits atomic increments of exactly `+1` (`newData.val() === data.val() + 1`), making it impossible for malicious users to reset or arbitrarily overwrite the visitor count from the browser console.
  * `online_users` only allows creation and deletion of individual session nodes.

### 🖥️ 5. Linux CLI & YAML Configuration Aesthetic
* **What it does:** Presents core candidate profile data as a YAML configuration (`cat profile.yaml`) and a live Linux `watch -n 0 "telemetry --realtime"` command output, complete with an inline SVG `>_` terminal favicon and OpenGraph social preview metadata.
* **Why I used it:** Reflects my day-to-day workflow working with Red Hat Enterprise Linux (RHEL), Ubuntu, Ansible playbooks, and SSH administration.

---

## 3. Architecture Overview

```text
[ Visitor Browser (Desktop / Mobile) ]
       │
       ├── 1. HTTPS GET (Fastly Global CDN) ──► [ GitHub Pages Static Hosting (index.html) ]
       │
       └── 2. Persistent WebSocket (WSS) ─────► [ Firebase Realtime Database (asia-southeast1) ]
                                                       ├── /portfolio/total_views (Atomic +1 Transaction)
                                                       └── /portfolio/online_users/$session_id (onDisconnect Hook)
```

---
