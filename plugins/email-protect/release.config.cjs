module.exports = {
    extends: "semantic-release-monorepo",
    branches: [
        "main",
        {
            name: "beta",
            prerelease: true
        }
    ],
    tagFormat: "email-protect-v${version}",
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        [
            "@droidsolutions-oss/semantic-release-update-file",
            {
                files: [
                    {
                        path: ["Engobe.Plugin.EmailProtect.nuspec"],
                        type: "xml",
                        replacements: [
                            {
                                key: "version",
                                value: "${nextRelease.version}"
                            }
                        ]
                    }
                ]
            }
        ],
        // The monorepo wrapper imports plugin names from its own directory.
        require.resolve("./update-manifest-version.cjs"),
        "@droidsolutions-oss/semantic-release-nuget",
        [
            "@semantic-release/git",
            {
                assets: [
                    "CHANGELOG.md",
                    "Engobe.Plugin.EmailProtect.nuspec",
                    "plugin.yaml"
                ],
                message: "chore(release): email-protect ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
            }
        ],
        "@semantic-release/github"
    ],
    projectPath: "Engobe.Plugin.EmailProtect.nuspec",
    npmPublish: false
};
