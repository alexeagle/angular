# Refactoring the ModuleWithProviders type to require a generic type parameter

`ModuleWithProviders` in `@angular/core` is currently declared with a default generic type of `any`.
See packages/core/src/metadata/ng_module.ts.

ngtsc (the Ivy compiler) re-writes code using the `ModuleWithProviders` type when a generic type is
not specified.

We want to remove this backward-compatibility shim in version 9. This migration attempts to insert
the type of the Module returned by a method that declares a non-generic `ModuleWithProviders` type.

Note that this refactoring has already been carried out internally at Google - the g3 codebase
doesn't have a generic type default on the `ModuleWithProviders` declaration.
