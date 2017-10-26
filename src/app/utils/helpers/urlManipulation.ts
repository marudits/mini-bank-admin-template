export function getParentUrl(url: string){
	const PATH_NUM = 3;

	let urlArray = url.split('/');
	urlArray.splice(PATH_NUM, urlArray.length - (PATH_NUM));
	
	return urlArray.join('/');
}