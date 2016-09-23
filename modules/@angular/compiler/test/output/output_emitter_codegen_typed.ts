
import {TypeScriptEmitter} from '@angular/compiler/src/output/ts_emitter';

import {print} from '../../src/facade/lang';
import {assetUrl} from '../../src/util';

function unimplemented(): any {
  throw new Error('unimplemented');
}

import {SimpleJsImportGenerator, codegenExportsVars, codegenStmts} from './output_emitter_util';

export function getExpressions(): any {
  return unimplemented();
}

// Generator
export function emit() {
  const emitter = new TypeScriptEmitter(new SimpleJsImportGenerator());
  const emittedCode = emitter.emitStatements(
      assetUrl('compiler', 'output/output_emitter_codegen_typed', 'test'), codegenStmts,
      codegenExportsVars);
  return emittedCode;
}

export function main(args: string[]) {
  const emittedCode = emit();
  print(emittedCode);
}
