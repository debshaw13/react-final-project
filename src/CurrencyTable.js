import React from "react";

class CurrencyTable extends React.Component {
  <div className="container">
    <div className="row">
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
    <div class="row">
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
  );
  }
}

export default CurrencyTable;
