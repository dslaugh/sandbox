import { Expression } from "./interfaces";
import specialForms from './specialForms';


export default function evaluate(expr: Expression, scope) {
  if (expr.type === 'value') {
    return expr.value;
  } else if (expr.type === 'word') {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(`Undefined binding: ${expr.name}`);
    }
  } else if (expr.type === 'apply') {
    const { operator, args } = expr;

    if (operator.type === 'word' && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      const op = evaluate(operator, scope);

      if (typeof op === 'function') {
        return op(...args.map(arg => evaluate(arg, scope)));
      } else {
        throw new TypeError('Applying a non-function');
      }
    }
  }
}
