workspace(
    name = "angular",
    managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Fetch rules_nodejs so we can install our npm dependencies
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "c9e59009049fa42198f7087b80398fc4b2698a0f0c7fdde4fb3540c899c9b309",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/1.4.0/rules_nodejs-1.4.0.tar.gz"],
)

# Check the rules_nodejs version and download npm dependencies
# Note: bazel (version 2 and after) will check the .bazelversion file so we don't need to
# assert on that.
load("@build_bazel_rules_nodejs//:index.bzl", "check_rules_nodejs_version", "node_repositories", "yarn_install")

check_rules_nodejs_version(minimum_version_string = "1.4.0")

# Setup the Node.js toolchain
node_repositories(
    node_repositories = {
        "12.14.1-darwin_amd64": ("node-v12.14.1-darwin-x64.tar.gz", "node-v12.14.1-darwin-x64", "0be10a28737527a1e5e3784d3ad844d742fe8b0718acd701fd48f718fd3af78f"),
        "12.14.1-linux_amd64": ("node-v12.14.1-linux-x64.tar.xz", "node-v12.14.1-linux-x64", "07cfcaa0aa9d0fcb6e99725408d9e0b07be03b844701588e3ab5dbc395b98e1b"),
        "12.14.1-windows_amd64": ("node-v12.14.1-win-x64.zip", "node-v12.14.1-win-x64", "1f96ccce3ba045ecea3f458e189500adb90b8bc1a34de5d82fc10a5bf66ce7e3"),
    },
    node_version = "12.14.1",
    package_json = ["//:package.json"],
)

load("//integration:angular_integration_test.bzl", "npm_package_archives")

yarn_install(
    name = "npm",
    manual_build_file_contents = npm_package_archives(),
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

# Install all bazel dependencies of the @npm npm packages
load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")

install_bazel_dependencies()

# Load angular dependencies
load("//packages/bazel:package.bzl", "rules_angular_dev_dependencies")

rules_angular_dev_dependencies()

# Load protractor dependencies
load("@npm_bazel_protractor//:package.bzl", "npm_bazel_protractor_dependencies")

npm_bazel_protractor_dependencies()

# Load karma dependencies
load("@npm_bazel_karma//:package.bzl", "npm_bazel_karma_dependencies")

npm_bazel_karma_dependencies()

# Setup the rules_webtesting toolchain
load("@io_bazel_rules_webtesting//web:repositories.bzl", "web_test_repositories")

web_test_repositories()

load("//tools/browsers:browser_repositories.bzl", "browser_repositories")

browser_repositories()

# Setup the rules_typescript tooolchain
load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")

ts_setup_workspace()

# Setup the rules_sass toolchain
load("@io_bazel_rules_sass//sass:sass_repositories.bzl", "sass_repositories")

sass_repositories()

# Setup the skydoc toolchain
load("@io_bazel_skydoc//skylark:skylark.bzl", "skydoc_repositories")

skydoc_repositories()

load("@bazel_toolchains//rules:environments.bzl", "clang_env")
load("@bazel_toolchains//rules:rbe_repo.bzl", "rbe_autoconfig")

rbe_autoconfig(
    name = "rbe_ubuntu1604_angular",
    # Need to specify a base container digest in order to ensure that we can use the checked-in
    # platform configurations for the "ubuntu16_04" image. Otherwise the autoconfig rule would
    # need to pull the image and run it in order determine the toolchain configuration. See:
    # https://github.com/bazelbuild/bazel-toolchains/blob/1.1.2/configs/ubuntu16_04_clang/versions.bzl
    base_container_digest = "sha256:1ab40405810effefa0b2f45824d6d608634ccddbf06366760c341ef6fbead011",
    # Note that if you change the `digest`, you might also need to update the
    # `base_container_digest` to make sure marketplace.gcr.io/google/rbe-ubuntu16-04-webtest:<digest>
    # and marketplace.gcr.io/google/rbe-ubuntu16-04:<base_container_digest> have
    # the same Clang and JDK installed. Clang is needed because of the dependency on
    # @com_google_protobuf. Java is needed for the Bazel's test executor Java tool.
    digest = "sha256:0b8fa87db4b8e5366717a7164342a029d1348d2feea7ecc4b18c780bc2507059",
    env = clang_env(),
    registry = "marketplace.gcr.io",
    # We can't use the default "ubuntu16_04" RBE image provided by the autoconfig because we need
    # a specific Linux kernel that comes with "libx11" in order to run headless browser tests.
    repository = "google/rbe-ubuntu16-04-webtest",
)
