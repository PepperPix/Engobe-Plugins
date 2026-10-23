# Contributing to Engobe-Plugins

Thanks for your interest in contributing. This document covers the commit conventions a change is
expected to follow before it can be merged.

## Commit Messages

This repository uses [semantic-release](https://semantic-release.gitbook.io/) to determine version
bumps and changelog entries from commit messages. All commits on `main` must follow
[Conventional Commits](https://www.conventionalcommits.org):

```
type(scope): short, imperative description
```

- `fix: ...` — patch release (`0.1.0` → `0.1.1`)
- `feat: ...` — minor release (`0.1.0` → `0.2.0`)
- `feat: ...` or `fix: ...` with a `BREAKING CHANGE:` footer — major release
- `chore:`, `docs:`, `refactor:`, `test:`, `build:`, `ci:` — no release bump

### Scope convention: scope = plugin name

Unlike a typical single-package repository, this repository hosts multiple independently versioned
plugins. **The commit scope must be the plugin name**, e.g.:

```
feat(email-protect): add support for custom obfuscation markers
fix(email-protect): correct entity encoding for uppercase domains
```

Each plugin has its own release workflow, triggered only by commits that touch that plugin's path
(a path-filtered GitHub Actions workflow). The scope is not just documentation — semantic-release
and the per-plugin release configuration both use it (together with the touched paths) to decide
which plugin's version gets bumped. A missing or incorrect scope means the wrong plugin (or no
plugin at all) gets released for a given change, so double-check the scope matches the plugin
you actually changed before committing.

Commits that do not touch a specific plugin (e.g. repository-wide `docs:` or `chore:` changes) do
not need a plugin scope.

## Release Configuration

The email-protect release configuration is in `plugins/email-protect/release.config.cjs`.
Local release hooks must use `require.resolve` so the monorepo wrapper can import them from
its own directory. The manifest prepare hook keeps `plugin.yaml` synchronized with the
NuGet package version.

## Pull Requests

- Keep changes scoped to a single plugin per pull request where possible — this keeps the
  scope/path-filter relationship unambiguous.
- Describe the change and its motivation in the pull request description.
