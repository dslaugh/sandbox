export interface Expression {
  name?: string,
  type?: string,
  value?: string | number,
  operator?: Expression,
  expr?: Expression,
  rest?: string,
  args?: Expression[],
}
