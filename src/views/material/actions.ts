export const actionsMap = {
	alert: async (message: string) => await alert(message),
	windowOpen: async (url: string) => await window.open(url),
}
