## Why

The engine's Engobe identity changes the plugin package contract. First-party plugins must use matching package metadata and release paths so users can discover and install them without weakening the existing trust rules.

## What Changes

- **BREAKING**: Publish email-protect as `Engobe.Plugin.EmailProtect` with the `engobe-plugin` tag.
- Rename the nuspec and update every release-tool reference, repository URL, README example, and current product context.
- Retain the plugin name `email-protect`, shortcode and asset behavior, explicit package file selection, independent version progression, and existing tag format.
- Document manual replacement of the old package installation without deleting existing public packages or rewriting release history.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `email-protect`: New NuGet identity and ecosystem tag, with unchanged content and release boundaries.

## Impact

- Target: renamed repository `PepperPix/Engobe-Plugins`; implementation directly on `main`.
- Affects `plugins/email-protect/Engobe.Plugin.EmailProtect.nuspec`, plugin-local `package.json`, release workflow dependencies, and documentation.
- The package ID is not yet published. NuGet support has advised that the `Engobe.Plugin.*` prefix can only be reserved after the first package exists, so the initial package release may precede prefix reservation. Until the feed reports the prefix as reserved, the package remains community-classified and relies on the engine's normal confirmation behavior.
- The renamed GitHub repository and NuGet trusted-publishing configuration have been updated. The repository release gate is currently enabled; publication remains a separate, explicitly approved step after implementation and independent review.
- Non-goals: setting the plugin to 2.0 solely to mirror Engobe's version line, changing email rendering/decoding, adding plugins, supporting both ecosystem tags, or deleting legacy packages.
