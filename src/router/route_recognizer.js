'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var promise_1 = require('angular2/src/facade/promise');
var collection_1 = require('angular2/src/facade/collection');
var instruction_1 = require('./instruction');
var path_recognizer_1 = require('./path_recognizer');
var RouteMatch = (function () {
    function RouteMatch() {
    }
    return RouteMatch;
})();
exports.RouteMatch = RouteMatch;
var PathMatch = (function (_super) {
    __extends(PathMatch, _super);
    function PathMatch(instruction, remaining, remainingAux) {
        _super.call(this);
        this.instruction = instruction;
        this.remaining = remaining;
        this.remainingAux = remainingAux;
    }
    return PathMatch;
})(RouteMatch);
exports.PathMatch = PathMatch;
var RedirectMatch = (function (_super) {
    __extends(RedirectMatch, _super);
    function RedirectMatch(redirectTo, specificity) {
        _super.call(this);
        this.redirectTo = redirectTo;
        this.specificity = specificity;
    }
    return RedirectMatch;
})(RouteMatch);
exports.RedirectMatch = RedirectMatch;
var RedirectRecognizer = (function () {
    function RedirectRecognizer(path, redirectTo) {
        this.path = path;
        this.redirectTo = redirectTo;
        this._pathRecognizer = new path_recognizer_1.PathRecognizer(path);
        this.hash = this._pathRecognizer.hash;
    }
    /**
     * Returns `null` or a `ParsedUrl` representing the new path to match
     */
    RedirectRecognizer.prototype.recognize = function (beginningSegment) {
        var match = null;
        if (lang_1.isPresent(this._pathRecognizer.recognize(beginningSegment))) {
            match = new RedirectMatch(this.redirectTo, this._pathRecognizer.specificity);
        }
        return promise_1.PromiseWrapper.resolve(match);
    };
    RedirectRecognizer.prototype.generate = function (params) {
        throw new exceptions_1.BaseException("Tried to generate a redirect.");
    };
    return RedirectRecognizer;
})();
exports.RedirectRecognizer = RedirectRecognizer;
// represents something like '/foo/:bar'
var RouteRecognizer = (function () {
    // TODO: cache component instruction instances by params and by ParsedUrl instance
    function RouteRecognizer(path, handler) {
        this.path = path;
        this.handler = handler;
        this.terminal = true;
        this._cache = new collection_1.Map();
        this._pathRecognizer = new path_recognizer_1.PathRecognizer(path);
        this.specificity = this._pathRecognizer.specificity;
        this.hash = this._pathRecognizer.hash;
        this.terminal = this._pathRecognizer.terminal;
    }
    RouteRecognizer.prototype.recognize = function (beginningSegment) {
        var _this = this;
        var res = this._pathRecognizer.recognize(beginningSegment);
        if (lang_1.isBlank(res)) {
            return null;
        }
        return this.handler.resolveComponentType().then(function (_) {
            var componentInstruction = _this._getInstruction(res['urlPath'], res['urlParams'], res['allParams']);
            return new PathMatch(componentInstruction, res['nextSegment'], res['auxiliary']);
        });
    };
    RouteRecognizer.prototype.generate = function (params) {
        var generated = this._pathRecognizer.generate(params);
        var urlPath = generated['urlPath'];
        var urlParams = generated['urlParams'];
        return this._getInstruction(urlPath, urlParams, params);
    };
    RouteRecognizer.prototype.generateComponentPathValues = function (params) {
        return this._pathRecognizer.generate(params);
    };
    RouteRecognizer.prototype._getInstruction = function (urlPath, urlParams, params) {
        if (lang_1.isBlank(this.handler.componentType)) {
            throw new exceptions_1.BaseException("Tried to get instruction before the type was loaded.");
        }
        var hashKey = urlPath + '?' + urlParams.join('?');
        if (this._cache.has(hashKey)) {
            return this._cache.get(hashKey);
        }
        var instruction = new instruction_1.ComponentInstruction(urlPath, urlParams, this.handler.data, this.handler.componentType, this.terminal, this.specificity, params);
        this._cache.set(hashKey, instruction);
        return instruction;
    };
    return RouteRecognizer;
})();
exports.RouteRecognizer = RouteRecognizer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVfcmVjb2duaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVfcmVjb2duaXplci50cyJdLCJuYW1lcyI6WyJSb3V0ZU1hdGNoIiwiUm91dGVNYXRjaC5jb25zdHJ1Y3RvciIsIlBhdGhNYXRjaCIsIlBhdGhNYXRjaC5jb25zdHJ1Y3RvciIsIlJlZGlyZWN0TWF0Y2giLCJSZWRpcmVjdE1hdGNoLmNvbnN0cnVjdG9yIiwiUmVkaXJlY3RSZWNvZ25pemVyIiwiUmVkaXJlY3RSZWNvZ25pemVyLmNvbnN0cnVjdG9yIiwiUmVkaXJlY3RSZWNvZ25pemVyLnJlY29nbml6ZSIsIlJlZGlyZWN0UmVjb2duaXplci5nZW5lcmF0ZSIsIlJvdXRlUmVjb2duaXplciIsIlJvdXRlUmVjb2duaXplci5jb25zdHJ1Y3RvciIsIlJvdXRlUmVjb2duaXplci5yZWNvZ25pemUiLCJSb3V0ZVJlY29nbml6ZXIuZ2VuZXJhdGUiLCJSb3V0ZVJlY29nbml6ZXIuZ2VuZXJhdGVDb21wb25lbnRQYXRoVmFsdWVzIiwiUm91dGVSZWNvZ25pemVyLl9nZXRJbnN0cnVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQkFBaUMsMEJBQTBCLENBQUMsQ0FBQTtBQUM1RCwyQkFBNEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUM3RCx3QkFBc0MsNkJBQTZCLENBQUMsQ0FBQTtBQUNwRSwyQkFBa0IsZ0NBQWdDLENBQUMsQ0FBQTtBQUluRCw0QkFBbUMsZUFBZSxDQUFDLENBQUE7QUFDbkQsZ0NBQTZCLG1CQUFtQixDQUFDLENBQUE7QUFHakQ7SUFBQUE7SUFBa0NDLENBQUNBO0lBQURELGlCQUFDQTtBQUFEQSxDQUFDQSxBQUFuQyxJQUFtQztBQUFiLGtCQUFVLGFBQUcsQ0FBQTtBQVVuQztJQUErQkUsNkJBQVVBO0lBQ3ZDQSxtQkFBbUJBLFdBQWlDQSxFQUFTQSxTQUFjQSxFQUN4REEsWUFBbUJBO1FBQ3BDQyxpQkFBT0EsQ0FB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M0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlciwgUHJvbWlzZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9wcm9taXNlJztcbmltcG9ydCB7TWFwfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5pbXBvcnQge1JvdXRlSGFuZGxlcn0gZnJvbSAnLi9yb3V0ZV9oYW5kbGVyJztcbmltcG9ydCB7VXJsfSBmcm9tICcuL3VybF9wYXJzZXInO1xuaW1wb3J0IHtDb21wb25lbnRJbnN0cnVjdGlvbn0gZnJvbSAnLi9pbnN0cnVjdGlvbic7XG5pbXBvcnQge1BhdGhSZWNvZ25pemVyfSBmcm9tICcuL3BhdGhfcmVjb2duaXplcic7XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJvdXRlTWF0Y2gge31cblxuZXhwb3J0IGludGVyZmFjZSBBYnN0cmFjdFJlY29nbml6ZXIge1xuICBoYXNoOiBzdHJpbmc7XG4gIHBhdGg6IHN0cmluZztcbiAgcmVjb2duaXplKGJlZ2lubmluZ1NlZ21lbnQ6IFVybCk6IFByb21pc2U8Um91dGVNYXRjaD47XG4gIGdlbmVyYXRlKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21wb25lbnRJbnN0cnVjdGlvbjtcbn1cblxuXG5leHBvcnQgY2xhc3MgUGF0aE1hdGNoIGV4dGVuZHMgUm91dGVNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbnN0cnVjdGlvbjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24sIHB1YmxpYyByZW1haW5pbmc6IFVybCxcbiAgICAgICAgICAgICAgcHVibGljIHJlbWFpbmluZ0F1eDogVXJsW10pIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFJlZGlyZWN0TWF0Y2ggZXh0ZW5kcyBSb3V0ZU1hdGNoIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlZGlyZWN0VG86IGFueVtdLCBwdWJsaWMgc3BlY2lmaWNpdHkpIHsgc3VwZXIoKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVkaXJlY3RSZWNvZ25pemVyIGltcGxlbWVudHMgQWJzdHJhY3RSZWNvZ25pemVyIHtcbiAgcHJpdmF0ZSBfcGF0aFJlY29nbml6ZXI6IFBhdGhSZWNvZ25pemVyO1xuICBwdWJsaWMgaGFzaDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXRoOiBzdHJpbmcsIHB1YmxpYyByZWRpcmVjdFRvOiBhbnlbXSkge1xuICAgIHRoaXMuX3BhdGhSZWNvZ25pemVyID0gbmV3IFBhdGhSZWNvZ25pemVyKHBhdGgpO1xuICAgIHRoaXMuaGFzaCA9IHRoaXMuX3BhdGhSZWNvZ25pemVyLmhhc2g7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBgbnVsbGAgb3IgYSBgUGFyc2VkVXJsYCByZXByZXNlbnRpbmcgdGhlIG5ldyBwYXRoIHRvIG1hdGNoXG4gICAqL1xuICByZWNvZ25pemUoYmVnaW5uaW5nU2VnbWVudDogVXJsKTogUHJvbWlzZTxSb3V0ZU1hdGNoPiB7XG4gICAgdmFyIG1hdGNoID0gbnVsbDtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3BhdGhSZWNvZ25pemVyLnJlY29nbml6ZShiZWdpbm5pbmdTZWdtZW50KSkpIHtcbiAgICAgIG1hdGNoID0gbmV3IFJlZGlyZWN0TWF0Y2godGhpcy5yZWRpcmVjdFRvLCB0aGlzLl9wYXRoUmVjb2duaXplci5zcGVjaWZpY2l0eSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZXNvbHZlKG1hdGNoKTtcbiAgfVxuXG4gIGdlbmVyYXRlKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21wb25lbnRJbnN0cnVjdGlvbiB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFRyaWVkIHRvIGdlbmVyYXRlIGEgcmVkaXJlY3QuYCk7XG4gIH1cbn1cblxuXG4vLyByZXByZXNlbnRzIHNvbWV0aGluZyBsaWtlICcvZm9vLzpiYXInXG5leHBvcnQgY2xhc3MgUm91dGVSZWNvZ25pemVyIGltcGxlbWVudHMgQWJzdHJhY3RSZWNvZ25pemVyIHtcbiAgc3BlY2lmaWNpdHk6IG51bWJlcjtcbiAgdGVybWluYWw6IGJvb2xlYW4gPSB0cnVlO1xuICBoYXNoOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IE1hcDxzdHJpbmcsIENvbXBvbmVudEluc3RydWN0aW9uPiA9IG5ldyBNYXA8c3RyaW5nLCBDb21wb25lbnRJbnN0cnVjdGlvbj4oKTtcbiAgcHJpdmF0ZSBfcGF0aFJlY29nbml6ZXI6IFBhdGhSZWNvZ25pemVyO1xuXG4gIC8vIFRPRE86IGNhY2hlIGNvbXBvbmVudCBpbnN0cnVjdGlvbiBpbnN0YW5jZXMgYnkgcGFyYW1zIGFuZCBieSBQYXJzZWRVcmwgaW5zdGFuY2VcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF0aDogc3RyaW5nLCBwdWJsaWMgaGFuZGxlcjogUm91dGVIYW5kbGVyKSB7XG4gICAgdGhpcy5fcGF0aFJlY29nbml6ZXIgPSBuZXcgUGF0aFJlY29nbml6ZXIocGF0aCk7XG4gICAgdGhpcy5zcGVjaWZpY2l0eSA9IHRoaXMuX3BhdGhSZWNvZ25pemVyLnNwZWNpZmljaXR5O1xuICAgIHRoaXMuaGFzaCA9IHRoaXMuX3BhdGhSZWNvZ25pemVyLmhhc2g7XG4gICAgdGhpcy50ZXJtaW5hbCA9IHRoaXMuX3BhdGhSZWNvZ25pemVyLnRlcm1pbmFsO1xuICB9XG5cbiAgcmVjb2duaXplKGJlZ2lubmluZ1NlZ21lbnQ6IFVybCk6IFByb21pc2U8Um91dGVNYXRjaD4ge1xuICAgIHZhciByZXMgPSB0aGlzLl9wYXRoUmVjb2duaXplci5yZWNvZ25pemUoYmVnaW5uaW5nU2VnbWVudCk7XG4gICAgaWYgKGlzQmxhbmsocmVzKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5yZXNvbHZlQ29tcG9uZW50VHlwZSgpLnRoZW4oKF8pID0+IHtcbiAgICAgIHZhciBjb21wb25lbnRJbnN0cnVjdGlvbiA9XG4gICAgICAgICAgdGhpcy5fZ2V0SW5zdHJ1Y3Rpb24ocmVzWyd1cmxQYXRoJ10sIHJlc1sndXJsUGFyYW1zJ10sIHJlc1snYWxsUGFyYW1zJ10pO1xuICAgICAgcmV0dXJuIG5ldyBQYXRoTWF0Y2goY29tcG9uZW50SW5zdHJ1Y3Rpb24sIHJlc1snbmV4dFNlZ21lbnQnXSwgcmVzWydhdXhpbGlhcnknXSk7XG4gICAgfSk7XG4gIH1cblxuICBnZW5lcmF0ZShwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcG9uZW50SW5zdHJ1Y3Rpb24ge1xuICAgIHZhciBnZW5lcmF0ZWQgPSB0aGlzLl9wYXRoUmVjb2duaXplci5nZW5lcmF0ZShwYXJhbXMpO1xuICAgIHZhciB1cmxQYXRoID0gZ2VuZXJhdGVkWyd1cmxQYXRoJ107XG4gICAgdmFyIHVybFBhcmFtcyA9IGdlbmVyYXRlZFsndXJsUGFyYW1zJ107XG4gICAgcmV0dXJuIHRoaXMuX2dldEluc3RydWN0aW9uKHVybFBhdGgsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgfVxuXG4gIGdlbmVyYXRlQ29tcG9uZW50UGF0aFZhbHVlcyhwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB0aGlzLl9wYXRoUmVjb2duaXplci5nZW5lcmF0ZShwYXJhbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0SW5zdHJ1Y3Rpb24odXJsUGF0aDogc3RyaW5nLCB1cmxQYXJhbXM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcG9uZW50SW5zdHJ1Y3Rpb24ge1xuICAgIGlmIChpc0JsYW5rKHRoaXMuaGFuZGxlci5jb21wb25lbnRUeXBlKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFRyaWVkIHRvIGdldCBpbnN0cnVjdGlvbiBiZWZvcmUgdGhlIHR5cGUgd2FzIGxvYWRlZC5gKTtcbiAgICB9XG5cbiAgICB2YXIgaGFzaEtleSA9IHVybFBhdGggKyAnPycgKyB1cmxQYXJhbXMuam9pbignPycpO1xuICAgIGlmICh0aGlzLl9jYWNoZS5oYXMoaGFzaEtleSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jYWNoZS5nZXQoaGFzaEtleSk7XG4gICAgfVxuICAgIHZhciBpbnN0cnVjdGlvbiA9XG4gICAgICAgIG5ldyBDb21wb25lbnRJbnN0cnVjdGlvbih1cmxQYXRoLCB1cmxQYXJhbXMsIHRoaXMuaGFuZGxlci5kYXRhLCB0aGlzLmhhbmRsZXIuY29tcG9uZW50VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVybWluYWwsIHRoaXMuc3BlY2lmaWNpdHksIHBhcmFtcyk7XG4gICAgdGhpcy5fY2FjaGUuc2V0KGhhc2hLZXksIGluc3RydWN0aW9uKTtcblxuICAgIHJldHVybiBpbnN0cnVjdGlvbjtcbiAgfVxufVxuIl19