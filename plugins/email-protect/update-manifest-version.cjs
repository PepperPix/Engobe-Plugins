const fs = require("node:fs");
const path = require("node:path");

module.exports.prepare = (_pluginConfig, { nextRelease }) => {
    if (typeof nextRelease?.version !== "string" || nextRelease.version.length === 0) {
        throw new Error("semantic-release did not provide a release version.");
    }

    const manifestPath = path.join(__dirname, "plugin.yaml");
    const manifest = fs.readFileSync(manifestPath, "utf8");
    const newline = manifest.includes("\r\n") ? "\r\n" : "\n";
    const lines = manifest.split(/\r?\n/);
    const versionLines = lines.flatMap((line, index) =>
        /^version:\s*/.test(line) ? [index] : []);

    if (versionLines.length !== 1) {
        throw new Error(`Expected one root version field in ${manifestPath}, found ${versionLines.length}.`);
    }

    lines[versionLines[0]] = `version: "${nextRelease.version}"`;
    fs.writeFileSync(manifestPath, lines.join(newline));
};
