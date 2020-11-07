import React, { useState } from 'react';

const CompleteChecklist = ({ completeTodo }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [chainsawed, setChainsawed] = useState(false);
  const [read, setRead] = useState(false);

  const validateChecklist = (evt) => {
    evt.preventDefault();

    if (!emailSent) {
      window.alert('What about the email?');
      return;
    }
    if (chainsawed){
      window.alert('You actually just did that?')
      return;
    }
    if (!read){
      window.alert('Did you read my instructions?')
      return;
    }

    completeTodo();

  }

  return (
    <div>
      <form>
        <input id='email' type='checkbox' onClick={() => setEmailSent(!emailSent)}/>
        <label htmlFor='email'>Send Email to Jeff</label><br/>
        <input id='chainsaw' type='checkbox' onClick={() => setChainsawed(!chainsawed)}/>
        <label htmlFor='chainsaw'>Shave beard with chainsaw</label><br/>
        <input id='instructions' type='checkbox' onClick={() => setRead(!read)}/>
        <label htmlFor='instructions'>Read instructions properly!</label><br/>
        <button onClick={validateChecklist}>Checklist completed!</button>
      </form>
    </div>
  );
};

export default CompleteChecklist;
