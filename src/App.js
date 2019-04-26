import React from 'react';
import Button from './Components/Button';
import Card from './Components/Card';
import Modal from './Components/Modal';
import './App.css';

export class App extends React.Component {
  state = {
    textInput: '',
    isInputValid: true,
    denominations: '',
    isModalShown: false
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
      } else {
        this.setState({
          isModalShown: true,
        })
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

  /**
   * Set isModalShown state to hide the modal
   */

   hideModal = () => {
     this.setState({
       isModalShown: false
     })
   }

  render() {
    const { isInputValid, denominations, textInput, isModalShown } = this.state;
    return (
      <div className="App">
        {isModalShown && (
          <Modal>
            <p style={{textAlign: 'center'}}>You're input isn't valid! <span role="img" aria-label="sad">😢</span></p>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal>
        )}
        <Card>
          <h1><span role="img" aria-label="money">🤑</span> Money Parser</h1>
          <line />
          <input
            type="text"
            className={!isInputValid ? 'input--failed' : ''}
            placeholder="Your rupiah value here..."
            onChange={this.handleTextInputChanged}
            onKeyDown={this.handleSubmit}
            value={textInput}
          />
          {!isInputValid && (
            <p className="invalid-input-label">Your input isn't valid! <span role="img" aria-label="sad">😢</span></p>
          )}
          <p>
            {' '}
            💸 Denominations for {textInput ? textInput : '-'}{' '}
            <b>{denominations}</b>
          </p>
          <Button onClick={this.handleSubmit}>Calculate</Button>
          <i>
            After finished your input, you can press the 'Calculate' button or
            press enter. <span role="img" aria-label="thumb-up">👍</span>
          </i>
        </Card>{' '}
      </div>
    );
  }
}

export default App;
