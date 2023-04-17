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
