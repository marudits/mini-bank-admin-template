declare var Materialize: any; 

export function showToast(text: string, duration: number = 3000, style = ''): void {
	Materialize.toast(text, duration, style);
} 