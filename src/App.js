import React from 'react';
import './App.css';

export class App extends React.Component {
  state = {
    textInput: '',
    isInputValid: true,
    denominations: ''
  };

  /**
   * Set textInput state with new event value
   * from input text when input text changed
   * and run validation for it.
   *
   * @param {event} e - Event from input text
   */
  handleTextInputChanged = e => {
    const textInput = e.target.value;
    this.handleValidation(textInput);

    this.setState({
      textInput,
      denominations: ''
    });
  };

  /**
   * Handle submission called when button calculate get clicked or Enter key pressed
   * Set state with converted denominations
   *
   * @param {event} e - Event from key down or button clicked
   */
  handleSubmit = e => {
    if (e.key === 'Enter' || e.key === undefined) {
      if (this.state.isInputValid) {
        const parsed = this.handleParse(this.state.textInput);
        const denominations = `= ${this.handleConvertToFraction(parsed)}.`;
        this.setState({
          denominations
        });
      }
    }
  };

  /**
   * Validate the value of the input with regex
   *
   * @param {string} text - Value of the input text
   */
  handleValidation(text) {
    // Test input string using Regex
    const pattern = /^(Rp|Rp |\d[0]+|)(\d{1,3}(\.\d{3}){1,}|\d+)(\,(\d[0])){0,1}$/;
    let isInputValid = pattern.test(text);

    if (text === '') {
      isInputValid = true;
    }

    this.setState({
      isInputValid
    });
  }

  /**
   * Renove unnecessary characters from input text
   *
   * @param {string} text - Value of the input text
   */
  handleParse(text) {
    return text
      .replace(/,00/g, '')
      .replace(/ /g, '')
      .replace(/Rp/g, '')
      .replace(/\./g, '');
  }

  /**
   * Convert cleaned input text value into string that contains
   * rupiah fraction and the number needed.
   * Available fractions: 100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50.
   *
   * @param {string} text - Cleaned input text
   */
  handleConvertToFraction(text) {
    // Convert to integer
    let rupiah = parseInt(text, 10);

    // List available rupiah fraction
    const fractions = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50];

    // Converted contains fraction and the number of the fraction that needed
    let converted = '';
    let left = fractions.reduce((left, fraction) => {
      const div = Math.floor(left / fraction);
      if (div > 0) {
        if (converted !== '') {
          converted += ', ';
        }
        converted += `${div}x Rp${fraction}`;

        return (left %= fraction);
      }
      return left;
    }, rupiah);

    // If there is no more smaller fraction but we still have rupiah
    if (left > 0) {
      if (converted !== '') {
        converted += ', ';
      }
      converted += `left Rp${left} (no available fraction)`;
    }

    return converted;
  }

  render() {
    const { isInputValid, denominations, textInput } = this.state;
    return (
      <div className="App">
        <div className="Card">
          <h1>Money Parser</h1>
          <line />
          <input
            type="text"
            className={!isInputValid ? 'input--failed' : ''}
            placeholder="Your rupiah value here..."
            onChange={this.handleTextInputChanged}
            onKeyDown={this.handleSubmit}
            value={textInput}
          />
          {!isInputValid && <p className="invalid-input-label">Your input isn't valid!</p>}
          <p>
            {' '}
            Denominations for {textInput ? textInput : '-'} <b>{denominations}</b>
          </p>
          <button onClick={this.handleSubmit}>Calculate</button>
          <i>
            After finished your input, you can press the 'Calculate' button or
            press enter.
          </i>
        </div>
      </div>
    );
  }
}

export default App;
