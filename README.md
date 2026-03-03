# DBOps

**DBOps** is a Database script toolkit designed to simplify database administration tasks through reusable, organized, and automation-ready SQL and PL/SQL scripts
<br>
This project aims to evolve into a multi-database DBA automation platform supporting Oracle, PostgreSQL, and MySQL

---

## Project Goals

- Organize commonly used DBA scripts
- Standardize script structure and documentation
- Enable automation through shell and scheduler integration
- Prepare for future web-based execution and monitoring
- Expand to support multiple database systems

---

## Developer Setup

### Requirements

- Install the following tools:
    - [Go](https://go.dev/dl/)
    - [Pnpm](https://pnpm.io/installation)
    - [Node.js (required for pnpm)](https://nodejs.org/en/download)
    - [Oracle Instant Client (21.x recommended)](https://www.oracle.com/database/technologies/instant-client/downloads.html)

### Install Project Dependencies

```bash
go mod tidy
pnpm install
```

### Run the Project

```bash
pnpm dev
```

---

## Security Notice

Some scripts require elevated privileges.
<br>
Always test scripts in non-production environments before executing in production systems.
