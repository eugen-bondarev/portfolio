const overrideRule = (
  rules = [],
  test = (arg: any): any => {},
  override = (arg: any): any => {}
) => {
  let found = 0
  const newRules = rules.map((r) => {
    const shouldOverride = test(r)
    if (shouldOverride) {
      found++
      return override(r)
    }
    return r
  })
  if (found === 0) {
    throw new Error('overrideRule: overriding rules failed!')
  }
  if (found > 1) {
    throw new Error(`overrideRule: applied more than one override: ${found}`)
  }
  return newRules
}

export default overrideRule
