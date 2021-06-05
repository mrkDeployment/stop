import React from 'react';
import '../App.css';
import axios from 'axios'

class List extends React.Component {
  constructor(props){
    super(props)
    this.state={
		'NobitexName': null,
		'BinanceName': null
    }
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.handleMax()
    }, 3000)
    }

  async handleMax(){

    let data100 = {
      symbol: "USDTIRT"
    }

    var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');

    axios.post('https://api.nobitex.ir/v2/trades', data100,{})
    .then((response) => {
      this.setState({ tether: Number.parseFloat(response.data.trades[0].price, 10) })
    })
    .catch((error) => {
      console.log('erroppppppp')
    })

    let coin_list = [
      "btc",
      "eth",
      "ltc",
      "bch",
      "xlm",
      "trx",
      "doge",
      "etc",
      "bnb",
      "eos",
      "xrp",
    ]
    
	let NobitexName=window.localStorage.getItem('NobitexName')

    let dataNobitex = {
		symbol: String(NobitexName)
	}

	// nobitex API

	await axios.post('https://api.nobitex.ir/v2/trades', dataNobitex,{})
	.then((response) => {
	var price= Number.parseFloat(response.data.trades[0].price, 10)/this.state.tether
	// this.setState({nobitex_volume2: response.data.trades[0].volume})
	this.setState({ [`nobitex_price${0}`]: price })
	})
	.catch((error) => {
	console.log('erroppppppp')
	})
	
	//binance API

	let BinanceName=window.localStorage.getItem('BinanceName')
	await axios.get("https://api.binance.com/api/v3/ticker/price?symbol="+String(BinanceName), {
	})
	.then(response => {
	var price= Number.parseFloat(response.data.price, 10)
	console.log('aaaaaaaa')
	this.setState({ [`binance_price${0}`]: price })
	})
	.catch(error => {
	console.log(error);
	});

	let Stop=window.localStorage.getItem('Stop')

	if(Stop && NobitexName && BinanceName && this.state[`nobitex_price${0}`]<Stop ){
		console.log('buyyyyyyyyyyyyyyy')
		console.log("nobitex",this.state[`nobitex_price${0}`]*0.99*this.state.tether)
		audio.play(); 
	}

}

  handleChange = (e) => {
    this.setState({ 'Stop': e.target.value })
    { e.target.value === '' && this.setState({ 'Stop': null})}
  }

  handleChange1 = (e) => {
    this.setState({ 'NobitexName': e.target.value })
    { e.target.value === '' && this.setState({ 'NobitexName': null})}
  }

  handleChange2 = (e) => {
    this.setState({ 'BinanceName': e.target.value })
    { e.target.value === '' && this.setState({ 'BinanceName': null})}
  }

  handleClickButton = () => {
    window.localStorage.setItem('Stop',this.state.Stop)
  }

  handleClickButton1 = () => {
    window.localStorage.setItem('NobitexName',this.state.NobitexName)
  }

  handleClickButton2 = () => {
    window.localStorage.setItem('BinanceName',this.state.BinanceName)
  }

  render(){
    return (
      <div className="Container">
        <div className="Stop">
          <p>قیمت کف به ریال</p>
          <input
            className="Stop"
            onChange={(e) => this.handleChange(e)}
          />
          <button
            onClick={(e) => this.handleClickButton(e)}
          >send</button>
        </div>

        <div>
          <p>Nobitex name</p>
          <input
            placeholder="Nobitex name"
            onChange={(e) => this.handleChange1(e)}
          />
          <button
            onClick={(e) => this.handleClickButton1(e)}
          >send</button>
        </div>

        <div>
          <p>Binance name</p>
          <input
            onChange={(e) => this.handleChange2(e)}
          />
          <button
            onClick={(e) => this.handleClickButton2(e)}
          >send</button>
        </div>

      </div>
    );
  }
}
export default List;
