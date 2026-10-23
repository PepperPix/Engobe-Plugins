## MODIFIED Requirements

### Requirement: Package contains explicit plugin files
The `Engobe.Plugin.EmailProtect` NuGet package SHALL use the `engobe-plugin` tag and Apache-2.0 license metadata. Its explicit file selection SHALL place the manifest, shortcode, slot, and script under `content/`.

#### Scenario: Package file mapping
- **WHEN** the package is built from its `.nuspec`
- **THEN** it contains `content/plugin.yaml`, `content/shortcodes/email.html`, `content/slots/body_end.html`, and `content/static/email-protect.js`
- **AND** repository-root planning files are not selected.

### Requirement: Package and manifest versions stay synchronized
Each email-protect release SHALL set the NuGet package version and the `version` field in `content/plugin.yaml` to the same semantic-release version.

#### Scenario: Release prepares a new version
- **WHEN** semantic-release prepares an email-protect release
- **THEN** the nuspec version and plugin manifest version are both updated to the next release version
- **AND** the manifest is included in the release commit.
