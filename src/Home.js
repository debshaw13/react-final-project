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

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <select onInput={this.handleInput} onChange={this.handleChange} value={base_rate}>
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
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Currency</td>
                  <td>Rate</td>
                  <td>Inverse rate</td>
                </tr>
                {rates.map((element, index) => <tr key={index}>
                  <td>{element[0]}</td>
                  <td>{element[1]}</td>
                  <td>{1 / element[1]}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrencyConverter;
