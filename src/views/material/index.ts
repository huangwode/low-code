export async function getMaterialList() {
	const materialList: Array<any> = []

	const materialProps = import.meta.glob('./props/*.ts')
	console.log('materialProps', materialProps)

	for (const key in materialProps) {
		console.log('key =>', key)
		await materialProps[key]().then((mod: any) => {
			// console.log('mod', mod)
			materialList.push(mod.default)
		})
	}

	// console.log('materialList ==>', materialList)
	return materialList
}

export async function registerGlobalComponent(app: any) {
	const materialComponents = import.meta.glob('./components/*.vue')
	for (const key in materialComponents) {
		await materialComponents[key]().then((mod: any) => {
			const fileName = key.match(/[^/]+\.vue$/)![0]
			const componentName = fileName.replace(/\.vue$/, '')
			app.component(componentName, mod.default)
		})
	}
}
