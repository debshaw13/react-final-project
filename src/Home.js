import React from "react";

const checkStatus = (response) => {
  if (response.ok) {
    // .ok returns true if response status is 200-299
    return response;
  }
  throw new Error('Request was either a 404 or 500');
}

const json = (response) => response.json()

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base_rate: 'USD',
      rates: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch("https://alt-exchange-rate.herokuapp.com/latest?base=" + this.state.base_rate)
    .then(checkStatus)
      .then(json)
      .then((response) => {
        this.setState({rates: response.rates});
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  handleChange(event) {
    this.setState({ base_rate: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { base_rate } = this.state;
      base_rate = base_rate.trim();
      if (!base_rate || base_rate.length !== 3) {
        return;
      }

    fetch("https://alt-exchange-rate.herokuapp.com/latest?base=" + this.state.base_rate)
    .then(checkStatus)
      .then(json)
      .then((response) => {
        this.setState({rates: response.rates});
        console.log(this.state.rates)
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  componentWillUnmount () {
    // run code just before component is removed from the DOM
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <input
                type="text"
                className="form-control mr-sm-2 mb-2"
                placeholder="USD"
                onChange={this.handleChange}
              />
              <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CurrencyConverter;
