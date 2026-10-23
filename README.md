# Engobe-Plugins

First-party content plugins for Engobe, a static site generator for .NET. Each plugin is distributed
as its own NuGet package, tagged `engobe-plugin` on nuget.org, and versioned independently of Engobe
and of the other plugins in this repository.

**Status:** Early development — plugins are added incrementally.

## Plugins in this repository

- `email-protect` — obfuscates email addresses in generated HTML to reduce scraping by spam bots.
  (Package and content follow separately; not yet published from this repository.)

## Installation

Install the email-protect plugin from NuGet with the Engobe CLI after its initial package release:

```bash
engobe plugin add Engobe.Plugin.EmailProtect
```

### Replacing an existing installation

The package ID changed from `Kiln.Plugin.EmailProtect` to `Engobe.Plugin.EmailProtect`. Back up the
project first and inspect any local changes in the existing `email-protect` plugin directory. The
package ID change requires replacing the installed package; updating the old lock entry will not
migrate it:

```bash
engobe plugin remove email-protect
engobe plugin add Engobe.Plugin.EmailProtect
```

Until nuget.org reports the `Engobe.Plugin.` prefix as reserved, Engobe classifies the package as a
community plugin and requires the normal installation confirmation. Review the regenerated
`.engobe/plugins.lock.json` entry and verify the rendered email link and script after installation.

## Versioning

Each plugin has its own release cadence: a change to one plugin does not trigger a release for
another, and plugin releases are independent of Engobe's own version. See
[CONTRIBUTING.md](CONTRIBUTING.md) for the commit conventions this depends on.

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
