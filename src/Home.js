import React from "react";
import { json, checkStatus } from './utils';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base_rate: 'USD',
      rates: [],
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch("https://alt-exchange-rate.herokuapp.com/latest?base=" + this.state.base_rate)
    .then(checkStatus)
      .then(json)
      .then((response) => {
        this.setState({rates: Object.entries(response.rates)});
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  handleInput(event) {
    this.setState({ base_rate: event.target.value });
  }

  handleChange(event) {
    //event.preventDefault();

    fetch("https://alt-exchange-rate.herokuapp.com/latest?base=" + this.state.base_rate)
    .then(checkStatus)
      .then(json)
      .then((response) => {
        this.setState({rates: Object.entries(response.rates)});
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  componentWillUnmount () {
    // run code just before component is removed from the DOM
  }

  render() {
    const { base_rate, rates } = this.state;

    const numberProcessor = (number) => {
      if (number < 0.0001) {
        return number.toFixed(6);
      } else if (number < 0.001) {
        return number.toFixed(5);
      } else if (number < 0.01) {
        return number.toFixed(4);
      } else if (number < 1) {
        return number.toFixed(3);
      } else if (number < 99) {
        return number.toFixed(2);
      } else if (number > 1000) {
        return number.toFixed(0);
      } else {
        return number.toFixed(1);
      }
    }

    const processedRates = rates.map((rate) => {
      const thisRate = parseFloat(rate[1]);
      return numberProcessor(thisRate);
    });

    const inverseRates = rates.map((rate) => {
      const thisInverseRate = 1 / (parseFloat(rate[1]));
      return numberProcessor(thisInverseRate);
    });

    return (
      <div className="container p-0">
        <div className="row">
          <div className="col-4 col-md-5 p-0">
          </div>
          <div className="col-4 col-md-2 p-0">
            <h5 className="text-center">Currency Table</h5>
            <hr />
          </div>
          <div className="col-4 col-md-5 p-0">
          </div>
        </div>
        <div className="row">
          <div className="col-4 col-md-5 p-0">
          </div>
          <div className="col-4 col-md-2 p-0">
            <select className="custom-select bg-primary text-white" onInput={this.handleInput} onChange={this.handleChange} value={base_rate}>
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>AUD</option>
              <option>BGN</option>
              <option>BRL</option>
              <option>CAD</option>
              <option>CHF</option>
              <option>CNY</option>
              <option>CZK</option>
              <option>DKK</option>
              <option>HKD</option>
              <option>HRK</option>
              <option>HUF</option>
              <option>IDR</option>
              <option>ILS</option>
              <option>INR</option>
              <option>ISK</option>
              <option>JPY</option>
              <option>KRW</option>
              <option>MXN</option>
              <option>MYR</option>
              <option>NOK</option>
              <option>NZD</option>
              <option>PHP</option>
              <option>PLN</option>
              <option>RON</option>
              <option>RUB</option>
              <option>SEK</option>
              <option>SGD</option>
              <option>THB</option>
              <option>TRY</option>
              <option>ZAR</option>
            </select>
            <br />
            <br />
          </div>
          <div className="col-4 col-md-5 p-0">
          </div>
        </div>
        <div className="row">
          <div className="col-1 col-md-3 p-0">
          </div>
          <div className="col-10 col-md-6 p-2">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Currency</th>
                  <th className="text-center" scope="col">Exchange Rate</th>
                  <th className="text-center" scope="col">Inverse Exchange Rate</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((element, index) => <tr key={index}>
                  <td>{element[0]}</td>
                  <td className="text-center">{processedRates[index]}</td>
                  <td className="text-center">{(inverseRates[index])}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <div className="col-1 col-md-3 p-0">
          </div>
        </div>
      </div>
    );
  }
}

export default CurrencyConverter;
