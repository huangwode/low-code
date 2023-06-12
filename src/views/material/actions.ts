export const actionsMap = {
	alert: async (message: string) => await alert(message),
	windowOpen: async (url: string) => await window.open(url),
	// doSearch:async (data,condition) => await (data,condition)=>{
	// 	return data.filter(item=>{
	// 		return item.name.include(condition)
	// 	})
	// }
}
