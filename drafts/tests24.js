const rp = require("request-promise");
const request = require("request");
const cheerio = require("cheerio");
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

var url = "https://tests24.ru/?iter=3&test=565";
var ticketsLink = [];
var resolved = false;


const options = {
	uri: url,
	transform: (body) => { return cheerio.load(body, {decodeEntities: false})
	}
};

rp(options)
	.then( ($) => {

		var ticketsAllData = $(".v:not([colspan]) a[href]");


	// собираю все ссылки на билеты в массив
		for (var i = 0; i < ticketsAllData.length; i++) {
			var ticketRef = "https://tests24.ru/" + ticketsAllData[i].attribs.href;
			ticketsLink.push(ticketRef);
			if (i == ticketsAllData.length - 1) {
				resolved = true;
			};
		}



		var subUrl = ticketsLink[0];

		const subOptions = {
			uri: subUrl,
			transform: (body) => { return cheerio.load(body, {decodeEntities: false})
			}
		};

		rp(subOptions)
			.then( ($) => {
				var sendFormButton = $("input[value = Проверить]");
				var color = $("tr");
				// color[4].attribs = "bgcolor";
				console.log(color[4].attribs);
				// var htmlTest = cheerio.load(sendFormButton[0], {decodeEntities: false});

				console.log("this is from sendFormButton \n" + sendFormButton);
				// const dom = new JSDOM(`htmlTest.html()`);
				sendFormButton.html().click;

				var robust = $("tr[bgcolor]");

				console.log("this is from robust \n" + robust);


				(async () => {
					await	sendFormButton.html().click;
					// var robust = $("input[value = Проверить]");
					// var robust = $("h1");
					// console.log("this is from robust \n" + robust);
					var robust1 = cheerio.load(robust.parent, {decodeEntities: false});
					// console.log(robust1);
				})()


		// var answersAll = $("form > table > tbody > tr > td.v:not(first-child)");

			})

		.catch(function (err) {
			console.log(err);
		})
	//
	})

	.catch(function (err) {
		console.log(err);
	});

// (async () => {
// 	await rp(options);
// 	do
// 		if (resolved) {
// 			console.log(ticketsLink)
// 		};
// 	while (resolved !== true)
// })();
