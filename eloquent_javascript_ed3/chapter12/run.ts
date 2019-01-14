import evaluate from './evaluator';
import parse from './parser';
import topScope from './topScope';

export default function run(program: string) {
  return evaluate(parse(program), Object.create(topScope));
}
