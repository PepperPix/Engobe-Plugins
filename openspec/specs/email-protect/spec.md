# email-protect Specification

## Purpose

Define the existing email-protect content plugin, its browser behavior, and its independent package and release boundaries.

## Requirements

### Requirement: Email shortcode produces an encoded link

The `email` shortcode SHALL produce an anchor with `href="#"`, class `obfuscated-email`, and a `data-e` attribute containing the Base64-encoded first argument.

#### Scenario: Address with a label
- **WHEN** the shortcode receives an address as `arg0` and a non-empty label as `arg1`
- **THEN** the initial anchor contains the label and the encoded address
- **AND** the initial `href` does not contain a `mailto:` address.

#### Scenario: Address without a label
- **WHEN** the shortcode receives an address without a non-empty second argument
- **THEN** the initial anchor uses the fallback text defined by the shortcode template
- **AND** the address remains encoded in `data-e`.

### Requirement: Browser script restores email links

The plugin script SHALL process `.obfuscated-email` elements on `DOMContentLoaded`, decode their non-empty `data-e` attributes with `atob`, and replace both the link target and visible text.

#### Scenario: Valid encoded address
- **WHEN** an element contains a valid encoded address
- **THEN** its `href` becomes `mailto:` followed by the decoded value
- **AND** its visible text becomes the decoded value, replacing any initial label.

#### Scenario: Missing or invalid data
- **WHEN** `data-e` is missing, empty, or rejected by `atob`
- **THEN** the script leaves that element's initial target and text unchanged.

### Requirement: Plugin declares its shortcode and script slot

The plugin manifest SHALL declare the `email` shortcode and the `body_end` slot. The slot SHALL load `email-protect.js` as a deferred script through `plugin_asset_url`.

#### Scenario: Slot rendering
- **WHEN** the `body_end` slot is rendered
- **THEN** the script URL is resolved using `plugin_asset_url 'email-protect' 'email-protect.js'`
- **AND** the script element has the `defer` attribute.

### Requirement: Package contains explicit plugin files

The `Kiln.Plugin.EmailProtect` NuGet package SHALL use the `kiln-plugin` tag and Apache-2.0 license metadata. Its explicit file selection SHALL place the manifest, shortcode, slot, and script under `content/`.

#### Scenario: Package file mapping
- **WHEN** the package is built from its `.nuspec`
- **THEN** it contains `content/plugin.yaml`, `content/shortcodes/email.html`, `content/slots/body_end.html`, and `content/static/email-protect.js`
- **AND** repository-root planning files are not selected.

### Requirement: Plugin release is independent

The email-protect release configuration SHALL use the tag format `email-protect-v${version}`. Its workflow SHALL run only for pushes to `main` or `beta` that match `plugins/email-protect/**`, with release execution additionally gated by `RELEASE_ENABLED == 'true'`.

#### Scenario: Repository planning changes
- **WHEN** a commit changes only repository-root OpenSpec files
- **THEN** those changes do not match the email-protect release workflow's path filter.

#### Scenario: Plugin release is enabled
- **WHEN** a matching plugin push reaches `main` or `beta` and the release flag is enabled
- **THEN** the workflow runs the plugin's semantic-release configuration from `plugins/email-protect`
- **AND** versioning remains independent of Kiln and other plugins.
