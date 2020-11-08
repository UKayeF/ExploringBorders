import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  loginScreen: {
    height: 256,
    width: 256,
    background: `url('../assets/spritesheets/login_256.png')`,
  },
})
const Login = ({ completeTodo }) => {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const enterPassword = evt => setPassword(evt.target.value);
  const animatedSuccess = () => {
    const loginScreen = document.getElementById('login-screen');
    loginScreen.classList.add('logging-in');
    window.setTimeout(() => {
      loginScreen.classList.remove('logging-in');
      loginScreen.classList.add('logged-in');
    }, 2000)
    window.setTimeout(() => {
      completeTodo();
    }, 3000);

  }
  const validatePassword = (evt) => {
    evt.preventDefault();
    if (password === 'password') {
      animatedSuccess();
    }
    else {
      alert('enter p-a-s-s-w-o-r-d')
    }
  }

  return (
    <div>
      <div id='login-screen' className={classes.loginScreen}/>
      <form onSubmit={validatePassword}>
        <input
          id='password'
          type='text'
          value={password}
          onChange={enterPassword}
        />
        <label htmlFor='password'>Enter password (literally)</label><br />
        <button
          id='submit-password'
          onClick={validatePassword}
        >Submit password!
        </button>
      </form>
    </div>
  );
};

export default Login;
