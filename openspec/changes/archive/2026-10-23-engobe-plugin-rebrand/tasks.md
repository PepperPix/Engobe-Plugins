# Tasks

## 1. Prepare publication identity

- [x] 1.1 Verify the `main` working state, new NuGet package ownership, repository rename coordination and publishing gate; record actual prefix-reservation status rather than assuming trust.

## 2. Rebrand package and release paths

- [x] 2.1 Rename the nuspec and package ID, switch the tag to `engobe-plugin`, update repository/domain metadata, and inspect a locally packed nupkg for the exact four expected content files and unchanged license.
- [x] 2.2 Update plugin-local package.json version-replacement path, Git asset list and projectPath together; add a local release prepare hook to synchronize `plugin.yaml`, verify each release path, and regenerate affected lock metadata using the existing package manager.
- [x] 2.3 Update current docs/context/examples and explain the manual package replacement; verify shortcode, slot, browser script and plugin name remain unchanged.
- [x] 2.4 Retain independent semantic-release history/tag format, calculate the appropriate next plugin version without publishing, and verify nuspec/manifest version handling does not perpetuate the observed mismatch.

## 3. Integration validation and handoff

- [x] 3.1 Install the local package using the renamed Engobe engine and a temporary feed; verify actual trust classification, lock content, script asset resolution, encoded HTML and browser decoding, including invalid input behavior.
- [x] 3.2 Verify release workflow gates/path filters and new trusted publishing configuration without publishing as a validation step; run strict OpenSpec validation.
- [x] 3.3 Inspect remaining legacy references, staged diff and post-commit stat for unexpected files, secrets or unrelated changes; hand off for independent review and clean only named temporary outputs.
