/// <reference path="rx/ts/rx.d.ts" />

// HACK: workaround for Traceur behavior.
// It expects all transpiled modules to contain this marker.
// TODO: remove this when we no longer use traceur
export var __esModule = true;

import {int, global, isPresent} from 'angular2/src/facade/lang';
import {List} from 'angular2/src/facade/collection';

// FIXME: hack around import problem with bad syntax
import Rx from 'rx/dist/rx.all';
// var Rx = require('rx/dist/rx.all');

export var Promise = global.Promise;

export class PromiseWrapper {
  static resolve(obj):Promise<any> {
    return Promise.resolve(obj);
  }

  static reject(obj):Promise<any> {
    return Promise.reject(obj);
  }

  // Note: We can't rename this method into `catch`, as this is not a valid
  // method name in Dart.
  static catchError<T>(promise:Promise<T>, onError:(error: any) => T | Thenable<T>): Promise<T> {
    return promise.catch(onError);
  }

  static all(promises:List<Promise<any>>):Promise<any> {
    if (promises.length == 0) return Promise.resolve([]);
    return Promise.all(promises);
  }

  static then<T>(promise:Promise<T>, success: (value: any) => T | Thenable<T>, rejection:(error: any) => T | Thenable<T>):Promise<T> {
    return promise.then(success, rejection);
  }

  static completer() {
    var resolve;
    var reject;

    var p = new Promise(function(res, rej) {
      resolve = res;
      reject = rej;
    });

    return {
      promise: p,
      resolve: resolve,
      reject: reject
    };
  }

  static setTimeout(fn:Function, millis:int) {
    global.setTimeout(fn, millis);
  }

  static isPromise(maybePromise):boolean {
    return maybePromise instanceof Promise;
  }
}


/**
 * Use Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 */
type Observable = Rx.Observable<any>;
type ObservableController = Rx.Subject<any>;

export class ObservableWrapper {
  static createController():Rx.Subject<any> {
    return new Rx.Subject();
  }

  static createObservable(subject:Rx.Subject<any>):Observable {
    return subject;
  }

  static subscribe(observable:Observable, generatorOrOnNext, onThrow = null, onReturn = null) {
    if (isPresent(generatorOrOnNext.next)) {
      return observable.observeOn(Rx.Scheduler.timeout).subscribe(
        (value) => generatorOrOnNext.next(value),
        (error) => generatorOrOnNext.throw(error),
        () => generatorOrOnNext.return()
      );
    } else {
      return observable.observeOn(Rx.Scheduler.timeout).subscribe(generatorOrOnNext, onThrow, onReturn);
    }
  }

  static callNext(subject:Rx.Subject<any>, value:any) {
    subject.onNext(value);
  }

  static callThrow(subject:Rx.Subject<any>, error:any) {
    subject.onError(error);
  }

  static callReturn(subject:Rx.Subject<any>) {
    subject.onCompleted();
  }
}
