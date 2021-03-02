import React from "react";
import {saveContactNumbers} from "../../api/Other"

import "./style.css";

export default class IncorporationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      shareholders: [{ phone_number: "" }]
    };
  }

  handleNameChange = evt => {
    this.setState({ phone_number: evt.target.value });
  };

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, phone_number: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
    console.log(this.state.shareholders);
  };

  handleSubmit = evt => {
    const { name, shareholders } = this.state;
    console.log(shareholders)
    let data=[]
    this.state.shareholders.map((shareholder, sidx) => {
      // if (idx !== sidx) return shareholder;
      let obj={
        "emp_id": 10000,shareholder
      }
      data.push(obj)
    });
    console.log(data)
    alert(`Incorporated: ${name} with ${shareholders.length} Contact Numbers`);
    saveContactNumbers(data)
        .then((response) => {
          if (!response.error) {
              console.log(data)
          }
        })
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ phone_number: "" }])
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


