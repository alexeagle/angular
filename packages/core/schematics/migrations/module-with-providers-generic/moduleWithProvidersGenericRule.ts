import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';

const FAILURE_STRING =
    'ModuleWithProviders will require generic type parameters in Angular v9';
const TODO_FIX = '<any /*TODO: supply a type*/>';

/**
 * Rule to detect usage of @angular/core#ModuleWithProviders that is missing
 * the generic type parameter.
 * This is part of the rollout of Angular Ivy.
 */
export class Rule extends Lint.Rules.AbstractRule {
  static metadata: Lint.IRuleMetadata = {
    ruleName: 'module-with-providers-generic',
    description: `Auto-fixes ModuleWithProviders that is not generic`,
    optionsDescription: '',
    options: null,
    type: 'typescript',
    typescriptOnly: true,
  };

  apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
  }
}


class Walker extends Lint.RuleWalker {
  visitMethodDeclaration(node: ts.MethodDeclaration) {
    if (node.type && this.isModuleWithProvidersNotGeneric(node.type)) {
      const fixStart = node.type.getEnd();
      // Start with the fallback fix, adding a TODO
      let fix = this.appendText(fixStart, TODO_FIX);

      // Look for a return statement which indicates the ngModule type
      // If found, fix by inserting that as the generic type
      if (node.body) {
        for (const s of node.body.statements) {
          if (tsutils.isReturnStatement(s) && s.expression &&
              tsutils.isObjectLiteralExpression(s.expression)) {
            const ngModule = this.findNgModuleProperty(s.expression);
            if (ngModule) {
              fix = this.appendText(fixStart, `<${ngModule}>`);
            }
          }
        }
      }
      this.addFailureAtNode(node.type, FAILURE_STRING, fix);
    }
    this.walkChildren(node);
  }

  visitVariableDeclaration(node: ts.VariableDeclaration) {
    if (node.type && this.isModuleWithProvidersNotGeneric(node.type)) {
      // Start with the fallback fix, adding a TODO
      let fix = this.appendText(node.type.end, TODO_FIX);

      if (node.initializer && tsutils.isCallExpression(node.initializer) &&
          tsutils.isPropertyAccessExpression(node.initializer.expression)) {
        // TODO(alexeagle): maybe we should use the typechecker to get the type
        // of the expression
        // For now we assume that the expression type is the one which should
        // be inferred
        // for expression RouterModule.forRoot(routes, {useHash: true});
        // lhs is RouterModule
        const lhs = node.initializer.expression.expression;
        if (tsutils.isIdentifier(lhs)) {
          // Delete the explicit type of the declared variable
          fix = this.deleteFromTo(node.name.end, node.type.end);
        }
      }

      this.addFailureAtNode(node.type, FAILURE_STRING, fix);
    }
  }

  isModuleWithProvidersNotGeneric(node: ts.TypeNode): boolean {
    return tsutils.isTypeReferenceNode(node) &&
        tsutils.isIdentifier(node.typeName) &&
        node.typeName.text === 'ModuleWithProviders' && !node.typeArguments;
  }

  findNgModuleProperty(expr: ts.ObjectLiteralExpression): string|undefined {
    for (const e of expr.properties) {
      if (tsutils.isPropertyAssignment(e) && tsutils.isIdentifier(e.name) &&
          e.name.text === 'ngModule' && tsutils.isIdentifier(e.initializer)) {
        return e.initializer.text;
      }
    }
    return undefined;
  }
}
