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

    const rateProcessor = (rawRate) => {
      if (rawRate < 0.0001) {
        return rawRate.toFixed(6);
      } else if (rawRate < 0.001) {
        return rawRate.toFixed(5);
      } else if (rawRate < 0.01) {
        return rawRate.toFixed(4);
      } else if (rawRate < 1) {
        return rawRate.toFixed(3);
      } else if (rawRate < 99) {
        return rawRate.toFixed(2);
      } else if (rawRate > 1000) {
        return rawRate.toFixed(0);
      } else {
        return rawRate.toFixed(1);
      }
    }

    const processedRates = rates.map((rate) => {
      const thisRate = parseFloat(rate[1]);
      return rateProcessor(thisRate);
    });

    const inverseRates = rates.map((rate) => {
      const thisInverseRate = 1 / (parseFloat(rate[1]));
      return rateProcessor(thisInverseRate);
    });

    return (
      <div className="container p-0">
        <div className="row">
          <div className="col-12 pt-4 mt-4">
            <h5 className="text-center" id="currency-table">Currency Table</h5>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-4 col-md-5 p-0">
          </div>
          <div className="col-4 col-md-2 p-0">
            <select className="custom-select bg-primary text-white" onInput={this.handleInput} onChange={this.handleChange}>
              {rates.map((element, index) => <option key={index}>
              {element[0]}</option>
              )}
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
