let symbols = 12;
let imgHeight = 60;
let canvasHeight = symbols * imgHeight;

const Constants = {
    imgs : [
        'apple.png',
        'avocado.png',
        'banana.png',
        'blackberry.png',
        'blueberries.png',
        'cherry.png',
        'coconut.png',
        'limun.png',
        'mandarin.png',
        'raspberry.png',
        'seven.png',
        'watermelon.png'
    ],
    symbolsEarn: {
            apple:{
                name: 'apple.png',
                amount: 5
             },
             avocado:{
                name: 'avocado.png',
                amount: 5
             },
             banana: {
                name: 'banana.png',
                amount: 5
             },
             blackberry: {
                name: "blackberry.png",
                amount: 5
             },
             blueberries: {
                name: "blueberries.png",
                amount: 5
             },
             cherry: {
                name: "cherry.png",
                amount: 5
             },
             coconut: {
                name: "coconut.png",
                amount: 5
             },
             limun: {
                name: "limun.png",
                amount: 5
             },
             mandarin: {
                name: "mandarin.png",
                amount: 5
             },
             raspberry: {
                name: "raspberry.png",
                amount: 5
             },
             seven: {
                name: "seven.png",
                amount: 10
             },
             watermelon: {
                name: "watermelon.png",
                amount: 5
             }
    },
    reels: {
        number: 3,
        symbols: symbols,
        spinTime: 1000,
        diffInSpin: 500,
        imgHeight: imgHeight,  
        canvasHeight: canvasHeight,
        canvasWidth: 95,
        startTop: 10
    },
    imgDimensions: {
        height: 50,
        width: 50,
        top: -30,
        left: 20
    },
    betConstants: {
        betOne: 1,
        betOneWinner: 5,
        startingCoins: 5000,

    }
}

export default Constants;