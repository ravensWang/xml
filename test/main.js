
var XML = require('../index')
var ajax = XML.Ajax()

async function app() {
	try {
		let data = await ajax.get('http://www.baidu.com')
		console.log(data)
	} catch (e) {
		console.log(e)
	}
}

app()