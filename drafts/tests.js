const rp = require("request-promise");
const request = require("request");
const cheerio = require("cheerio");

var url = "https://tests24.ru/?iter=3&test=565";

const options = {
	uri: url,
	transform: (body) => { return cheerio.load(body) }
};

rp(options)
	.then( ($) => { 
		
		var tickets = $(".v:not([colspan]) a[href]");
		
		var ticketRef = "https://tests24.ru/" + tickets[0].attribs.href;
		
		//console.log(ticketRef);
		
		var subOptions = {
		uri: ticketRef,
		transform: (body) => { return cheerio.load(body) }
		};
		
		rp(subOptions) 
			.then( ($) => { 
				var count = 1;
				var questionAll = $("form > table > tbody > tr > td.v:first-child");
				var answersAll = $("form > table > tbody > tr > td.v:not(first-child)");
				
				for (var k = 0; k < answersAll.length; k++) {
					answersAll[k].attribs.class += " answer";
				}
				
				for (var i=0; i < questionAll.length; i++) {
					var question = questionAll[i].children[1].data;
					
					//for (var j = 0; j < answersAll[1].children[0].children[0].children.length; j++) {
					//answersAll[i+1].children[0].children[0].children[j].children[0].children[0].attribs.checked;
					//console.log(answersAll[0].children[0].children[0].children[j].children[0].children[0].attribs);	
					//}
					
					
					
					//console.log(answersAll[0].children[0].children[0].children.length);
					//console.log(answersAll[1].children[0].children[0].children.length);
				}
				
					//console.log(answersAll[0].children[0].children[0].children[1].children[0].children[0].attribs);
					//console.log(answersAll[1].children[0].children[0].children[1].children[0].children[0].attribs);
					//console.log(answersAll[2].children[0].children[0].children[1].children[0].children[0].attribs);
					//console.log(answersAll[3].children[0].children[0].children[1].children[0].children[0].attribs);
					//console.log(answersAll[4].children[0].children[0].children[1].children[0].children[0].attribs);
					console.log(answersAll);
				
				//console.log(answersAll[1].children[0].children[0].children[0].children[1].children[0].data);
				//console.log(answersAll[1].children[0].children[0].children.length);
				
				
				// var answers = questionAll[0].next;
				// answers.attribs.class += " answers";
				
				
				//console.log(question);
				// console.log(answersAll[1]);
				//console.log(questionAll[0].next.attribs("class: v"));
		})
		.catch(function (err) {
		console.log(err);
		});
	
	})
	.catch(function (err) {
		console.log(err);
	});



 
//request(url, function () { return function(err, resp, body) {
   //     if (err) throw err;        
		//mainPage = cheerio.load(body);
		
//		mainPage;}

//});
//console.log(mainPage);
		

// var tickets = mainPage('.v:not([colspan]) a[href]');

// var urlTicket = "https://tests24.ru/" + tickets[0].attribs.href;

// console.log(urlTicket);

//		 request(urlTicket, function(err, resp, body) {
   //     if (err)
      //      throw err;
        //subPage = cheerio.load(body);
		
//});
// :not([colspan]) a[href]
 