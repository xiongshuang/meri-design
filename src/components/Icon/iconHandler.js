const iconFolder = require.context('../static/iconSvg/action', true, /\.svg$/)
const iconObject = iconFolder.keys().reduce((modules, modulePath) => {
	// 忽略第1个js
	let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
		moduleName = 'Icon' + moduleName
	// 执行modulesFiles函数，返回一个对象{default: {// 文件内容}, _esModule: true}
	const value = iconFolder(modulePath)
	modules[moduleName] = value.default
	return modules
  }, {})
export default iconObject