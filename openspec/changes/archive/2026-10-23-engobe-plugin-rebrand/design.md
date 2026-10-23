# Design

## Context

See [proposal.md](proposal.md). Before this change, email-protect used `Kiln.Plugin.EmailProtect.nuspec` at package version `1.1.1` while `plugin.yaml` declared `1.1.0`. The plugin-local `package.json` referenced the nuspec in its version-update configuration, Git assets, and publishing project path. The workflow runs from that directory, uses OIDC, and is gated by `RELEASE_ENABLED`.

## Goals / Non-Goals

**Goals:** Publish a correctly identified Engobe plugin using existing release boundaries and unchanged plugin behavior.

**Non-Goals:** No browser changes, automatic consumer migration, dual ecosystem tags, release-history rewrite, or forced plugin 2.0.

## Decisions

1. **Change package identity, not plugin identity.** Use `Engobe.Plugin.EmailProtect.nuspec`, package ID `Engobe.Plugin.EmailProtect`, and `engobe-plugin`. Keep `name: email-protect`, `email`, `body_end`, file paths inside `content/`, and browser script behavior.
2. **Keep independent version progression.** Retain `email-protect-v${version}` and the plugin's existing semantic-release history. The package ID change is a breaking package-contract change; from the latest `email-protect-v1.1.1` tag, the next stable release is `2.0.0` when recorded with a breaking Conventional Commit. This major version is for the package identity break, not to match Engobe's version line.
3. **Update all release references together.** Nuspec rename, version-replacement path, publishing path, and Git asset list are one atomic change. The existing release updater supports XML, not arbitrary YAML; add a small local semantic-release `prepare` plugin to update `plugin.yaml` so its version matches the nuspec on every release. Include the manifest in the release commit assets and keep the independent tag format.
4. **Require real publication identity.** The package ID is not yet published, so its ownership will be established by the initial release. NuGet support has advised that `Engobe.Plugin.*` can only be reserved after the first package exists. The initial package may therefore precede reservation and remains community-classified until the feed reports the reservation; the engine's normal confirmation behavior must remain in place. No client trust override is acceptable.

## Initial Release Bootstrap

At implementation start, the new package ID was absent from NuGet and the `Engobe.` prefix was not reserved. NuGet support has advised that the first package must exist before the prefix can be reserved. The renamed GitHub repository exists; the `Engobe.Plugin.*` trusted-publishing pattern and repository identity have been configured, but the OIDC policy still needs validation through a release-ready workflow check. The workflow requests OIDC, and the GitHub `RELEASE_ENABLED` variable is currently `true`.

This change prepares the package and release configuration but does not push or publish. After independent review and explicit release approval, the initial publication can establish package ownership; prefix reservation and first-party trust classification must then be verified separately. Until then, consumers must receive the normal community-package confirmation.

## Risks / Trade-offs

- Changing only the nuspec filename breaks publication -> validate all three package.json path references and inspect a locally packed nupkg.
- Initial package appears community-classified before prefix reservation -> retain the normal community confirmation behavior; do not claim first-party status without feed metadata.
- Consumer blindly edits its lock -> document backup, inspect local customizations, reinstall the new package, then verify the regenerated lock and output.

## Migration Plan

Work on `main` with release execution paused during the coordinated cutover. Pack locally without publishing; test with the renamed engine and inspect email output/script behavior. Independently review before an explicitly approved release. Once the new package exists, document replacement and optionally deprecate the legacy package with replacement information. Retain all old artifacts; rollback consumers using pinned old packages and their backups.
