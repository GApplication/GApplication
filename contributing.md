# Contributing Guidelines

Thank you for contributing to this repository. To keep the codebase clean, readable, and automation-friendly, **all contributions must follow the standards below**.

## Git Commit Message Standard

This project follows **Conventional Commits**.

# 1. Commit Message Format

```
<type>(<scope>): <subject>

<body>
```

Only the subject line is required.

# 2. Subject Line Rules (Mandatory)

- **Maximum 50 characters** – Keep it concise
- **Use imperative mood** – e.g., "add", not "added"
- **Use lowercase** – Start with lowercase letters
- **No period at the end** – Don't add punctuation

### Examples

```
✅ Good
feat(auth): add jwt refresh token

❌ Bad
Added JWT refresh token.
```

# 3. Commit Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code change without behavior change |
| `perf` | Performance improvement |
| `style` | Formatting, linting, whitespace |
| `test` | Adding or updating tests |
| `docs` | Documentation only |
| `build` | Build system or dependencies |
| `ci` | CI/CD changes |
| `chore` | Maintenance tasks |
| `revert` | Revert a previous commit |

# 4. Commit Scopes

The scope describes which part of the codebase is affected.

**Common scopes:**
- `auth`
- `db`
- `api`
- `user`
- `wallet`
- `config`

**Example:**
```
fix(db): handle mysql reconnect
```

# 5. Commit Body (Optional)

Use the body when additional explanation is required.

**Rules:**
- Wrap lines at 72 characters
- Explain **why**, not what
- Use bullet points when helpful

**Example:**
```
refactor(auth): simplify token validation

- Remove duplicated checks
- Centralize expiration logic
```

---

Following these guidelines ensures clean Git history, easier reviews,
automated changelogs, and predictable releases.

Thank you for contributing.
