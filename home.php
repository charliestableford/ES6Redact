<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="site.css">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div id="draw">
<div class="process"></div>
    <div class="titleDraw">Redact</div>


    <div class="leftSide">
        <button id="quoteOne"><img src="imgs/trump.png">Donald Trump</button>
        <button id="quoteTwo"><img src="imgs/bernie.png">Bernie Sanders</button>
    </div>
    <div class="rightSide">
        <button id="blackOut">Black Out</button>
        <br/>
        <button id="erase">Erase</button>
    </div>
    <br>

    <div class="explain">Choose from an assortment of tweets from Donald Trump or Bernie Sanders. Make them your own. <br><br> I realize Joe Biden is the democratic candidate but I am a proud Bernie supporter.
        <br/>
        <div class="explainBtm"> </div>
    </div>
    <canvas id="page" width="620" height="300"></canvas>
    <hr>
    <hr>
    <hr>
    <hr>
    <hr>
    <hr>
    <!-- <button id="#btn-download">
        Download
    </button>  -->
    <div id="twitter">
    <!-- <button class="btn btn-info btn-lg" id="tweetIt"><i class="fa fa-twitter"> Share On Twitter</i></button>     -->
</div>
<script
  src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous"></script>
<script type="text/javascript" src="js/redact.js"></script>
</body>
</html>

