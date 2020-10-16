const init = () => {
    document.getElementById('app').innerHTML = app();
}

const app = () =>
`
<h1>${Header()}</h1>
${Game()}
`;

const Header = () => `Hello World`;
const Game = () => `
<div class="draw">
<div class="process"></div>
    <div class="titleDraw">Redact</div>


    <div class="leftSide">
        <button class="quoteOne"><img src="imgs/trump.png">Donald Trump</button>
    </div>
    <div class="rightSide">
        <button class="blackOut">Black Out</button>
        <br/>
        <button class="erase">Erase</button>
        <br>
        <a class="twitter-share-button"
  href="https://twitter.com/intent/tweet" data-size="large">
Tweet</a>
    </div>
    <br>

    <div class="explain">Choose from an assortment of tweets from Donald Trump. Make them your own. <br>
        <br/>
        <div class="explainBtm"> </div>
    </div>
    <canvas class="page" width="620" height="300"></canvas>
    <hr>
    <hr>
    <hr>
    <hr>
    <hr>
    <hr>
`
document.addEventListener('DOMContentLoaded', init);