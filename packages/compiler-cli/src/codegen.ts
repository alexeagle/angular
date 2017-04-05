/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Transform template html and css into executable code.
 * Intended to be used in a build step.
 */
import * as compiler from '@angular/compiler';
import {AngularCompilerOptions, NgcCliOptions} from '@angular/tsc-wrapped';
import {readFileSync} from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

import {CompilerHost, CompilerHostContext, ModuleResolutionHostAdapter} from './compiler_host';
import {PathMappedCompilerHost} from './path_mapped_compiler_host';

const GENERATED_META_FILES = /\.json$/;

const PREAMBLE = `/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

`;

export class CodeGenerator {
  constructor(
      private options: AngularCompilerOptions, private program: ts.Program,
      public host: ts.CompilerHost, private compiler: compiler.AotCompiler,
      private ngCompilerHost: CompilerHost) {}

  codegen(): Promise<any> {
    return this.compiler
        .compileAll(this.program.getSourceFiles().map(
            sf => this.ngCompilerHost.getCanonicalFileName(sf.fileName)))
        .then(generatedModules => {
          generatedModules.forEach(generatedModule => {
            const sourceFile = this.program.getSourceFile(generatedModule.srcFileUrl);
            const emitPath = this.ngCompilerHost.calculateEmitPath(generatedModule.genFileUrl);
            const source = GENERATED_META_FILES.test(emitPath) ? generatedModule.source :
                                                                 generatedModule.source;
            this.host.writeFile(emitPath, source, false, () => {}, [sourceFile]);
          });
        });
  }

  static create(
      options: AngularCompilerOptions, cliOptions: NgcCliOptions, program: ts.Program,
      tsCompilerHost: ts.CompilerHost, compilerHostContext?: CompilerHostContext,
      ngCompilerHost?: CompilerHost): CodeGenerator {
    if (!ngCompilerHost) {
      const usePathMapping = !!options.rootDirs && options.rootDirs.length > 0;
      const context = compilerHostContext || new ModuleResolutionHostAdapter(tsCompilerHost);
      ngCompilerHost = usePathMapping ? new PathMappedCompilerHost(program, options, context) :
                                        new CompilerHost(program, options, context);
    }
    const transFile = cliOptions.i18nFile;
    const locale = cliOptions.locale;
    let transContent: string = '';
    if (transFile) {
      if (!locale) {
        throw new Error(
            `The translation file (${
                                     transFile
                                   }) locale must be provided. Use the --locale option.`);
      }
      transContent = readFileSync(transFile, 'utf8');
    }
    const {compiler: aotCompiler} = compiler.createAotCompiler(ngCompilerHost, {
      translations: transContent,
      i18nFormat: cliOptions.i18nFormat,
      locale: cliOptions.locale,
      enableLegacyTemplate: options.enableLegacyTemplate !== false,
      genFilePreamble: PREAMBLE,
    });
    return new CodeGenerator(options, program, tsCompilerHost, aotCompiler, ngCompilerHost);
  }
}
