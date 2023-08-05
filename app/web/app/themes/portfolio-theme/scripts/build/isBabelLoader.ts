const isBabelLoader = (r: any) => r.use && /babel-loader/.test(r.use[0].loader)

export default isBabelLoader
