/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {platformBrowser} from '@angular/platform-browser';
import {BasicComp} from './basic';
import {MainModuleNgFactory} from './module.ngfactory';

MainModuleNgFactory.create(null as any).instance.appRef.bootstrap(BasicComp);
