import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './Loginpage.css';
import 'animate.css';

const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('Credit Card Information:');
    console.log('Number:', state.number);
    console.log('Expiry:', state.expiry);
    console.log('CVC:', state.cvc);
    console.log('Name:', state.name);
    alert("Submitted")
  };

  return (
    <div className='creditcard-styling-container'>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form onSubmit={handleSubmit} className='animate__animated animate__backInDown'>
        <input className='submit-card-input'
          type="tel"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input className='submit-card-input'
          type="text"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input className='submit-card-input'
          type="tel"
          name="expiry"
          placeholder="MM/YY Expiry"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input className='submit-card-input'
          type="tel"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div className='submit-button-login-div'>
          <button className='submit-card-button' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;