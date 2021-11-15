import './auth.css';
import axios from 'axios';
import { isEmpty } from 'validator';

/** ******************
 * Global variables *
 ******************* */
const BASE_URL = 'http://localhost:3000';
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const signInButton = document.getElementById('sign-in');
const signUpButton = document.getElementById('sign-up');

/** ***************
 * API functions *
 **************** */
async function signIn(username, password) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    await console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
}

async function signUp(username, password) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      username,
      password,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
}

/** ****************
 * EventListeners *
 ***************** */
signInButton.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  if (!isEmpty(username) && !isEmpty(password)) {
    signIn(username, password);
    usernameInput.value = '';
    passwordInput.value = '';
  }
});

signUpButton.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  if (!isEmpty(username) && !isEmpty(password)) {
    signUp(username, password);
    usernameInput.value = '';
    passwordInput.value = '';
  }
});
