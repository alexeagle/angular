'use strict';function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @module
 * @description
 * Starting point to import all public core APIs.
 */
__export(require('./src/core/metadata'));
__export(require('./src/core/util'));
__export(require('./src/core/dev_mode'));
__export(require('./src/core/di'));
__export(require('./src/facade/facade'));
var application_ref_1 = require('./src/core/application_ref');
exports.platform = application_ref_1.platform;
exports.createNgZone = application_ref_1.createNgZone;
exports.PlatformRef = application_ref_1.PlatformRef;
exports.ApplicationRef = application_ref_1.ApplicationRef;
var application_tokens_1 = require('./src/core/application_tokens');
exports.APP_ID = application_tokens_1.APP_ID;
exports.APP_COMPONENT = application_tokens_1.APP_COMPONENT;
exports.APP_INITIALIZER = application_tokens_1.APP_INITIALIZER;
exports.PLATFORM_INITIALIZER = application_tokens_1.PLATFORM_INITIALIZER;
__export(require('./src/core/zone'));
__export(require('./src/core/render'));
__export(require('./src/core/linker'));
var debug_element_1 = require('./src/core/debug/debug_element');
exports.DebugElement = debug_element_1.DebugElement;
exports.Scope = debug_element_1.Scope;
exports.inspectElement = debug_element_1.inspectElement;
exports.asNativeElements = debug_element_1.asNativeElements;
__export(require('./src/core/testability/testability'));
__export(require('./src/core/change_detection'));
__export(require('./src/core/platform_directives_and_pipes'));
__export(require('./src/core/platform_common_providers'));
__export(require('./src/core/application_common_providers'));
__export(require('./src/core/reflection/reflection'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7R0FJRztBQUNILGlCQUFjLHFCQUFxQixDQUFDLEVBQUE7QUFDcEMsaUJBQWMsaUJBQWlCLENBQUMsRUFBQTtBQUNoQyxpQkFBYyxxQkFBcUIsQ0FBQyxFQUFBO0FBQ3BDLGlCQUFjLGVBQWUsQ0FBQyxFQUFBO0FBQzlCLGlCQUFjLHFCQUFxQixDQUFDLEVBQUE7QUFDcEMsZ0NBQWtFLDRCQUE0QixDQUFDO0FBQXZGLDhDQUFRO0FBQUUsc0RBQVk7QUFBRSxvREFBVztBQUFFLDBEQUFrRDtBQUMvRixtQ0FLTywrQkFBK0IsQ0FBQztBQUpyQyw2Q0FBTTtBQUNOLDJEQUFhO0FBQ2IsK0RBQWU7QUFDZix5RUFDcUM7QUFDdkMsaUJBQWMsaUJBQWlCLENBQUMsRUFBQTtBQUNoQyxpQkFBYyxtQkFBbUIsQ0FBQyxFQUFBO0FBQ2xDLGlCQUFjLG1CQUFtQixDQUFDLEVBQUE7QUFDbEMsOEJBS08sZ0NBQWdDLENBQUM7QUFKdEMsb0RBQVk7QUFDWixzQ0FBSztBQUNMLHdEQUFjO0FBQ2QsNERBQ3NDO0FBQ3hDLGlCQUFjLG9DQUFvQyxDQUFDLEVBQUE7QUFDbkQsaUJBQWMsNkJBQTZCLENBQUMsRUFBQTtBQUM1QyxpQkFBYywwQ0FBMEMsQ0FBQyxFQUFBO0FBQ3pELGlCQUFjLHNDQUFzQyxDQUFDLEVBQUE7QUFDckQsaUJBQWMseUNBQXlDLENBQUMsRUFBQTtBQUN4RCxpQkFBYyxrQ0FBa0MsQ0FBQyxFQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFN0YXJ0aW5nIHBvaW50IHRvIGltcG9ydCBhbGwgcHVibGljIGNvcmUgQVBJcy5cbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9tZXRhZGF0YSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3V0aWwnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9kZXZfbW9kZSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL2RpJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2ZhY2FkZS9mYWNhZGUnO1xuZXhwb3J0IHtwbGF0Zm9ybSwgY3JlYXRlTmdab25lLCBQbGF0Zm9ybVJlZiwgQXBwbGljYXRpb25SZWZ9IGZyb20gJy4vc3JjL2NvcmUvYXBwbGljYXRpb25fcmVmJztcbmV4cG9ydCB7XG4gIEFQUF9JRCxcbiAgQVBQX0NPTVBPTkVOVCxcbiAgQVBQX0lOSVRJQUxJWkVSLFxuICBQTEFURk9STV9JTklUSUFMSVpFUlxufSBmcm9tICcuL3NyYy9jb3JlL2FwcGxpY2F0aW9uX3Rva2Vucyc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3pvbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9yZW5kZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9saW5rZXInO1xuZXhwb3J0IHtcbiAgRGVidWdFbGVtZW50LFxuICBTY29wZSxcbiAgaW5zcGVjdEVsZW1lbnQsXG4gIGFzTmF0aXZlRWxlbWVudHNcbn0gZnJvbSAnLi9zcmMvY29yZS9kZWJ1Zy9kZWJ1Z19lbGVtZW50JztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvcGxhdGZvcm1fZGlyZWN0aXZlc19hbmRfcGlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9wbGF0Zm9ybV9jb21tb25fcHJvdmlkZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvYXBwbGljYXRpb25fY29tbW9uX3Byb3ZpZGVycyc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7Il19