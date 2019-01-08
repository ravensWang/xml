# ajax

A simple http based on axios


## Installation

Using npm:

	npm i --save https://github.com/svon/xml

In Node.js:

	import XML from '@svon/xml'
	const ajax = XML.Ajax()

	async function test() {
		try {
			let html = await ajax.get('http://www.baidu.com')
			console.log(html)
		} catch (e) {
			console.log(e)
		}
	}
	test()
