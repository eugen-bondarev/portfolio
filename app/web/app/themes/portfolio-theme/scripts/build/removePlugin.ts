const removePlugin = (plugins: any, constructorName: any) =>
  plugins.filter((p: any) => p.constructor.name !== constructorName)

export default removePlugin
