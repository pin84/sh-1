export default function(id){
	let obj = {
		106: [106, 148],
		105: [105],
		259: [259],
		260: [260]
	};
	
	let k
	for (const [key, value] of Object.entries(obj)) {
		let index = value.findIndex(item => item == id);
		if (index !== -1) {
			k = key
			break;
		}
	}
	
	
	return k
}