import React from "react";

import "./style.css";

export default class IncorporationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      shareholders: [{ name: "" }]
    };
  }

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
    console.log(this.state.shareholders);
  };

  

  handleSubmit = evt => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Contact Numbers</h4>

        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder">
            <input
              type="text"
              placeholder={`Contact Number #${idx + 1}`}
              value={shareholder.name}
              onChange={this.handleShareholderNameChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              className="small"
            >
              -
            </button>
            <button
              type="button"
              onClick={this.handleAddShareholder}
              className="small"
            >
              +
            </button>
          </div>
        ))}
        <button className="small">Save Contact Numbers</button>
      </form>
    );
  }
}


