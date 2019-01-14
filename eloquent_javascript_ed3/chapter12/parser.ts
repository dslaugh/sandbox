import { Expression } from "./interfaces";

function skipSpace(string: string): string {
  const first = string.search(/\S/);
  if (first === -1) {
    return '';
  }
  return string.slice(first);
}

function parseApply(expr: Expression, program: string): Expression {
  program = skipSpace(program);

  if (program[0] !== '(') {
    return { expr, rest: program };
  }

  program = skipSpace(program.slice(1));
  expr = { type: 'apply', operator: expr, args: [] };

  while (program[0] !== ')') {
    const arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);

    if (program[0] === ',') {
      program = skipSpace(program.slice(1));
    } else if (program[0] !== ')') {
      throw new SyntaxError(`Expected ',' or ')'`);
    }
  }

  return parseApply(expr, program.slice(1));
}

function parseExpression(program: string): Expression {
  program = skipSpace(program);
  let match;
  let expr;

  if (match = /^"([^"]*)"/.exec(program)) {
    expr = { type: 'value', value: match[1] };
  } else if (match = /^\d+\b/.exec(program)) {
    expr = { type: 'value', value: Number(match[0]) };
  } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = { type: 'word', name: match[0] };
  } else {
    throw new SyntaxError(`Unexpected syntax: ${program}`);
  }

  return parseApply(expr, program.slice(match[0].length));
}

export default function parse(program: string): Expression {
  let { expr, rest } = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError('Unexpected text after program');
  }

  return expr;
}
