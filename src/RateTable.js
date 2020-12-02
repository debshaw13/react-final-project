import React from "react";

class RateTable extends React.Component {
  render () {
  const { rate } = this.props;
  const { currency, xrate } = rate;

    return (
      <div className="row mb-1">
        <p className="col">{currency}</p>
        <p className="col">{xrate}</p>
      </div>
    )
  }
}

export default RateTable;
