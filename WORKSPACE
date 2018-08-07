workspace(name = "angular")

load(":package.bzl", "devDependencies")

devDependencies()

load("@build_bazel_rules_nodejs//:defs.bzl", "check_bazel_version", "node_repositories", "yarn_install")

check_bazel_version("0.15.0")
node_repositories(
  package_json = ["//:package.json"],
  preserve_symlinks = True,
)

load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")

go_rules_dependencies()
go_register_toolchains()

load("@io_bazel_rules_webtesting//web:repositories.bzl", "browser_repositories", "web_test_repositories")

web_test_repositories()
browser_repositories(
    chromium = True,
    firefox = True,
)

load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")

ts_setup_workspace()

load("@angular//:index.bzl", "ng_setup_workspace")

ng_setup_workspace()

#
# Ask Bazel to manage these toolchain dependencies for us.
# Bazel will run `yarn install` when one of these toolchains is requested during
# a build.
#

yarn_install(
    name = "ts-api-guardian_runtime_deps",
    package_json = "//tools/ts-api-guardian:package.json",
    yarn_lock = "//tools/ts-api-guardian:yarn.lock",
)

yarn_install(
    name = "http-server_runtime_deps",
    package_json = "//tools/http-server:package.json",
    yarn_lock = "//tools/http-server:yarn.lock",
)

##################################
# Skylark documentation generation

load("@io_bazel_rules_sass//sass:sass_repositories.bzl", "sass_repositories")
sass_repositories()

load("@io_bazel_skydoc//skylark:skylark.bzl", "skydoc_repositories")
skydoc_repositories()
