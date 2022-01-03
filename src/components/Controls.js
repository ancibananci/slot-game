import React from "react";
import '../css/Controls.css';
import Constants from '../common/Constants';

class GameControls extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
            offsets: [],
            winMsg: false,
            gameStarted: false,
            total: Constants.betConstants.startingCoins || this.state.total,
            winAmount: 0,
            betMethod: 'betOne',
            betAmount: Constants.betConstants.betOne,
            betOneWin : Constants.betConstants.betOneWinner,
            gameOver: false,
            disableDoubleSubmit: false
        }
    }

    //Function to spin the wheels and stop on random position
    onSpinReelsRepeat = (e) => {
        //Disable double submit
        this.setState( {disableDoubleSubmit :true})

        let allCanvas = document.querySelectorAll('canvas');

        //Add class motion which has css translate animation
        allCanvas.forEach((c)=>{
            c.classList.add('motion')
         }
        )
        let diffSpeed = Constants.reels.spinTime;
        let allDivisables = [];

        //Get all posiblie stops using image height and height of reel
        function getAllStops(number, divider) {
            let mainNum = number;
            while (mainNum >= 0) {
                allDivisables.push(mainNum)
                mainNum = mainNum - divider;
            }
            return allDivisables;
        }

        let canvasHeight = Constants.reels.canvasHeight;
        let imgHeight = Constants.reels.imgHeight;
        let heightOfVisible = canvasHeight - Constants.reels.number * imgHeight;
        let allStops = getAllStops(heightOfVisible, imgHeight);
        let allOffsets = [];
        let maxdiffSpeed = 0;

        //Different spin speed for each reel using setTimeout
        for (let c of allCanvas) {
            let mincanva = - allStops[Math.floor(Math.random()*allStops.length)];
            allOffsets.push(Math.abs(mincanva))
            let canvapx = mincanva + 'px';
            let hi = "translate3d(0px, "+ canvapx +", 0px)";
            diffSpeed = diffSpeed + 500;
            maxdiffSpeed = diffSpeed;
    
                setTimeout( () => {   
                    //Remove class motion and set the reel to a random position                    
                    c.classList.remove('motion')
                    c.style.transform =  hi  
    
                }, diffSpeed)    
        }

        //Sneaky solution - should be upgraded, checks winner after last reel has stopped at random position
        setTimeout( ()=> {
            this.setState({
                offsets : allOffsets
            }, ()=> this.getWinner())
        }, maxdiffSpeed)

      }
    
    //Get winner using 
    getWinner = () => {
        let offsets = this.state.offsets;
        let allimgs = this.props.allimgs;
        let chosenImgs = [];
        let chosenImg;
        let winners = [];


        for( var i =0; i< offsets.length; i++ ){
            chosenImg = offsets[i] / Constants.reels.imgHeight + 1;
            chosenImgs.push(chosenImg)  
        }

        Object.values(allimgs).forEach( (val, index) => {
                winners.push(val[chosenImgs[index]].name)
            }
        )

        //Use if we want 3 same icons in reel
        //const allEqual = arr => arr.every( v => v === arr[0] )
        
        //Check if 2 of the same items exist in list to get winner
        function checkDuplicate(arr) {
            
            function checkIndex(element, index) {
                // compare the index of array element with the supplied index
                return arr.indexOf(element) !== index
            }

            let result = false;

            // call some function with callback function as argument
            result = arr.some(checkIndex);
            if(result) {
               return true
            } else {
               return false
            }
         }
        
        //Set if winner or loser and then call current bet method to determine total win/loss
        this.setState({
            winMsg : checkDuplicate(winners),
            gameStarted : true,
            disableDoubleSubmit: false
        }, () =>{
            this.state.betMethod === 'betOne' ? this.betOne() : this.betMax()
        })

    }

    //Function to bet One
    //Need to change 5 to value for each set of images
    betOne = () => {
        let winAmount = !this.state.winMsg ? 0 : 5;
        let totalValue = !this.state.winMsg ? this.state.total - Constants.betConstants.betOne : this.state.total + winAmount;
        let gameOver = totalValue <= 0 ? true : false;

        this.setState({
            total: totalValue,
            winAmount,
            gameOver
        })
    }

    //BetMax is All in - win amount is amount of total
    betMax = () => {
        let winAmount = !this.state.winMsg ? 0 : this.state.total;
        let totalValue = !this.state.winMsg ? this.state.total - this.state.total : this.state.total + winAmount;
        let gameOver = totalValue <= 0 ? true : false;
        
        this.setState({
            total: totalValue,
            winAmount,
            gameOver
        })
    }

    //Function to change bet method, spins the wheels after setting state
    onUpdateBetMethod = (betMethod) => {
        this.setState({
            betMethod : betMethod,
            betAmount: betMethod === 'betOne' ? Constants.betConstants.betOne : this.state.total
        }, ()=> this.onSpinReelsRepeat())
    }


    render(){
        return(
            <div className="sg-game-controls">
                <div className="sg-coins">
                    Coins: {this.state.total}
                </div>
                <div className="sg-amounts">
                    <div>
                        <p className="sg-amounts__result">{this.state.betAmount}</p>
                        <p className="sg-amounts__text">Bet</p>
                    </div>
                    <div>
                        <p className="sg-amounts__result sg-amounts__winner">{this.state.winAmount}</p>
                        <p className="sg-amounts__text">Winner Paid</p>
                    </div>
                </div>  
                <div className="sg-main-controls">
                    <button disabled={this.state.gameOver || this.state.disableDoubleSubmit} className="sg-main-controls__bets" onClick={(e) => this.onUpdateBetMethod('betOne')}>Bet One</button>
                    <button disabled={this.state.gameOver || this.state.disableDoubleSubmit} className="sg-main-controls__bets" onClick={(e) => this.onUpdateBetMethod('betMax')}>Bet Max</button>
                    <button disabled={this.state.gameOver || this.state.disableDoubleSubmit} className="sg-main-controls__spin" onClick={this.onSpinReelsRepeat}>Spin</button>
                </div>
                <div onClick={(e) => this.setState({winMsg: false, gameStarted: false})} className={this.state.winMsg  ? 'winMsg' : 'hidden'} >
                    <p>{this.state.winMsg  ? 'You Win!' : this.state.gameStarted ? 'You Lost!' : ''}</p>
                    {/* <p className="">Click here to get back in the game</p> */}
                </div>  
                <div className={this.state.gameOver  ? 'gameOver' : 'hidden'} >
                    <p>Game Over!</p>
                </div>  
            </div>
        )
    }
}

export default GameControls;