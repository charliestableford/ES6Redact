// just empty object for now. 
const Mouse = {
	x: 0,
	y: 0,
	clickedPositions: []
};

function trackClickState(evt)
{
	App.mouseDown = true;
}

function endClickState(evt)
{
	App.mouseDown = false;
}

function trackMouse(evt)
{
	canvas = document.getElementById("page");
	// console.log("moved");
	var rect = canvas.getBoundingClientRect();
    Mouse.x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    Mouse.y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    
    if (App.mouseDown)
    {
    	trackClick(evt);
    }
    App.render();
}

function trackClick(evt)
{
	Mouse.clickedPositions.push({x: Mouse.x, y: Mouse.y, action: App.mouseAction});
    console.log();
	App.render();
}

class Writer 
{
	constructor(ctx, lineHeightPx, x=30, y=30)
	{
		this.ctx = ctx;
		this.lineHeightPx = lineHeightPx;
		this.x = x;
		this.y = y+this.lineHeightPx;
	}

	write(text)
	{
		this.lines = this.splitTextToLines(text, 500,"18px Open sans");
		for(var i=0; i<this.lines.length; i++)
		{
			this.y = this.y+this.lineHeightPx;
			this.splitWordsIntoObject(this.lines[i], this.x, this.y)
		}
	}

	splitWordsIntoObject(line, x, y)
	{
        var clickedArr =  Mouse.clickedPositions;
		var words = line.split(" ");
		var lastWordEndXPos = 0;
		for(var i=0;i<words.length;i++)
		{
			var word = new Word(this.ctx, words[i]+" ", lastWordEndXPos, y,this.lineHeightPx);
 
			if (isCollide(word, Mouse)){
				word.color = "#d5ff24";
			}

			for(var c=0; c < clickedArr.length; c++)
			{
				if (isCollide(word, Mouse.clickedPositions[c])){
					if (Mouse.clickedPositions[c].action=="blackOut")
					{
						word.blackOut = true;
					} else {
						word.blackOut = false;
					}
				}
			}

			word.write();

			lastWordEndXPos = lastWordEndXPos+word.width;
		}
	}

	splitTextToLines(phrase,maxPxLength,textStyle) {
        if (!phrase) {
            // if not defined then this
        }
		var paragraphs = phrase.split('\n');
        var phraseArray=[],
	        measure=0,
	        splitChar=" ",
	        lastPhrase = "";
	    
	    this.ctx.font = textStyle;
		//console.log(paragraphs);
		for (var a=0; a<paragraphs.length; a++)
    	{
    		var phrase = paragraphs[a];
    		//console.log("ph", phrase);
    		if (phrase=="")
    		{
    			 phraseArray.push(" ");
    			 lastPhrase = "";
    			
    		} else {

	    		//console.log(phrase);
	    		var wa=phrase.split(" ");
	    		

			    for (var i=0;i<wa.length;i++) {
			        var w=wa[i];
			        measure=this.ctx.measureText(lastPhrase+splitChar+w).width;
			        if (measure<maxPxLength) {
			            lastPhrase+=(splitChar+w);
			        } else {
			            phraseArray.push(lastPhrase);
			            lastPhrase=w;
			        }
			        if (i===wa.length-1) {
			            phraseArray.push(lastPhrase);
			            break;
			        }
			    }
			}
		}
	    return phraseArray;
	}
}

class Word{
	constructor(ctx, text, x, y, letterHeight)
	{
		this.text = text;
		this.ctx = ctx;
		this.y = y;
		this.boundingY = y-letterHeight;
		this.letterHeight = letterHeight;
		this.x = x;
		this.width = this.ctx.measureText(text).width;
		this.xEnd = x + this.width;
		this.yEnd = this.boundingY + letterHeight;
		this.color = "black"; // colour of the text
        this.blackout = false;
		this.blackOutColor = App.blackOutColor; 
	}

	write()
	{
		this.ctx.fillStyle = this.color;
		this.ctx.fillText(this.text, this.x,this.y);

if (this.blackOut)
        {
            this.ctx.fillStyle = this.blackOutColor;
			this.ctx.globalCompositeOperation = "multiply";
			this.ctx.fillRect(this.x, this.boundingY+this.letterHeight/2-3, this.width, this.letterHeight);
        }
	}
}

function isCollide(a, mouse) {
	//console.log(a, mouse);
    if (
    	(a.x < mouse.x) &&
    	(a.xEnd > mouse.x) &&
    	(a.boundingY < mouse.y) &&
    	(a.yEnd > mouse.y)
    	)
    {
    	return true;
    }
}

var dataURL;

$("#btn-download").click(function(event){
	// event.preventDefault();
	dataURL = App.canvas.toDataURL('image/png');
});

$(".direct").click(function(){
	uploadCanvas(dataURL);
});

// function uploadCanvas(dataURL){
// 	// console.log(dataURL);
// 	// debugger;
// 	$.ajax(
// 		{
// 			url: "index.php?controller=pages&route=uploadImg",
// 			type: "POST",
// 			data: { 
// 		  imgBase64: dataURL,
// 		 },
// 		 success: function(){
// 				console.log("It's working! (this part but isn't in the db)"); 
// 			},
	  
// 		error: function(response)
// 		{
// 			console.log('made it in here but in the error function');
// 			console.log(dataURL);
// 		}
// 		   });
	
// 		return false;
// }

var App = {
    blackOutColor: "black",
	mouseAction: "blackOut", 
    canvas: document.getElementById("page"),
    ctx: document.getElementById("page").getContext("2d"),
    clickedPositions: Mouse.clickedPositions,

	init: function(element){
        App.quote = "";

		document.getElementById("erase").addEventListener("click", function(){
			App.mouseAction = "erase";
            // console.log("You've clicked erase");
			App.render();
		});

		// make this into DRY before handing in
		document.getElementById("quoteOne").addEventListener("click", function(){      
            App.quote =  quoteArrOne[Math.floor(Math.random()*quoteArrOne.length)];
            App.blackOut();
            App.render();
            App.clear();       
		});

        document.getElementById("quoteTwo").addEventListener("click", function(){      
            App.quote =  quoteArrTwo[Math.floor(Math.random()*quoteArrTwo.length)];
            App.blackOut();
            App.render();   
            App.clear();    
		});

	},
    clear: function(clickedPositions){
            App.ctx.beginPath();
            App.ctx.clearRect(0, 0, canvas.width, canvas.height);
            // clickX = []; clickY = []; clickDrag = [];  
            Mouse.clickedPositions= [];
            // console.log("Are you in here Bob?");
            App.blackOut();
            App.render();
    },

    blackOut: function(){
        var element = document.getElementById("blackOut").addEventListener("click", function(){
			App.mouseAction = "blackOut";
            // console.log("We in here");
			App.render();
		})
	},

	render: function(){

		var canvas = document.getElementById("page");
		var ctx = canvas.getContext("2d");
		var quote = this.quote;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		writer = new Writer(ctx, 28);

		quoteArrOne = ["China is doing very badly, worst year in 27 - was supposed to start buying our agricultural product now - no signs that they are doing so. That is the problem with China, they just don’t come through. Our Economy has become MUCH larger than the Chinese Economy is last 3 years....", "It snowed over 4 inches this past weekend in New York City. It is still October. So much for Global Warming.", "Newly released emails prove that scientists have manipulated data on global warming. The data is unreliable.", "In the 1920's people were worried about global cooling--it never happened. Now it's global warming. Give me a break!", "Tonight, we forcefully condemn the blatant corruption of the Democrat Party, the Fake News Media, and the rogue bureaucrats of the Deep State. The only message these radicals will understand is a crushing defeat on November 3, 2020!", "Despite the negative press, covefefe", "Crazy Joe Biden is trying to act like a tough guy. Actually, he is weak, both mentally and physically, and yet he threatens me, for the second time, with physical assault. He doesn't know me, but he would go down fast and hard, crying all the way. Don’t threaten people Joe!", "Why would Kim Jong-un insult me by calling me 'old,' when I would NEVER call him 'short and fat?' Oh well, I try so hard to be his friend - and maybe someday that will happen!", "The number of Coronavirus cases is strongly trending downward throughout the United States, with few exceptions. Very good news, indeed!"], "Was just informed that the Fake News from the Thursday White House Press Conference had me speaking & asking questions of Dr. Deborah Birx. Wrong, I was speaking to our Laboratory expert, not Deborah, about sunlight etc. & the CoronaVirus. The Lamestream Media is corrupt & sick!";

		quoteArrTwo = ["If we are serious about climate change we can't just talk the talk, we've got to walk the walk and take on powerful special interests.", "Donald Trump believes climate change is a hoax. Donald Trump is an idoit.", "Abortion is a constitutional right", "I don't know if its a world record but Donald Trump has been sued more than 3,500 ties over the past 30 years.", "Thank you, I've had it, I'm going home, talk to you soon." , "Go vote or I'm sending everybody raisin cookes.", "In the United States it costs, on average, $12,000 to have a baby. In Finland it costs $60. We've got to end the disgrace of our profit-driven health care system and pass Medicare for all."];

		// String(quoteArrOne);
        // console.log(this.quote);
		// console.log(typeof quoteArrOne);
		writer.write(this.quote);
		// console.log(this.quote);

		$('#tweetIt').click(function(e){
			// tell browser not to do the default action
			e.preventDefault();
			// get the quote from the quoteHolder
			//put the image in the quote holder
			var quote  = $('#quoteHolder').text();
		   // trigger a new window with the Twitter dialog
			window.open('https://twitter.com/share?url=undefined&text=' + quote,  'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
		  });
	},
};

// call it right away
App.init();

window.addEventListener('mousemove', trackMouse, false);
window.addEventListener('click', trackClick, false);
window.addEventListener("mousedown", trackClickState, false);
window.addEventListener("mouseup", endClickState, false);

    