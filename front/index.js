import './styles.css';
import axios from 'axios';
import { isURL } from 'validator';

/** ******************
 * Global variables *
 ******************* */
const BASE_URL = 'http://localhost:3000';
const urlInput = document.getElementById('url-input');
const submitButton = document.getElementById('submit-url');
const errorMessage = document.getElementById('error-message');
const outPut = document.getElementById('output');
const userSection = document.getElementById('user-section');
const logoutButton = document.getElementById('log-out');

outPut.classList.add('hidden');

/* ************************
 * User related functions *
 ************************ */

logoutButton.addEventListener('click', () => {
  document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  window.location.reload();
});

window.onload = async () => {
  if (document.cookie.length !== 0) {
    try {
      const user = await axios.get(`${BASE_URL}/user`);
      userSection.innerText = `Welcome ${user.data}`;
    } catch (error) {
      console.log(error);
    }
  } else {
    logoutButton.hidden = true;
  }
};

/** ***************
 * API functions *
 **************** */
async function shortUrl(url) {
  try {
    const response = await axios.post(`${BASE_URL}`, {
      longUrl: url,
    });
    addShortURL(response.data);
    addCopyButton();
    outPut.classList.remove('hidden');
  } catch (error) {
    console.log(error.response.data);
    errorMessage.innerText = error.response.data;
  }
}

/** ******************
 * Helper functions *
 ******************* */
function clearPage() {
  errorMessage.innerText = '';
  while (outPut.firstChild) {
    outPut.removeChild(outPut.firstChild);
  }
  outPut.classList.add('hidden');
}

function addShortURL(url) {
  const shortUrlEl = document.createElement('a');
  shortUrlEl.target = '_blank';
  shortUrlEl.href = url;
  shortUrlEl.className = 'link';
  shortUrlEl.innerText = url;
  outPut.append(shortUrlEl);
}

function addCopyButton() {
  const copyButton = document.createElement('button');
  copyButton.className = 'copy';
  copyButton.innerText = 'Copy';
  copyButton.addEventListener('click', () => {
    // getting the short url element
    const url = document.querySelector('.link');

    // copying the link to clipboard
    navigator.clipboard.writeText(url.innerText);

    copyButton.innerText = 'Copied';
  });
  outPut.append(copyButton);
}
/** ****************
 * EventListeners *
 ***************** */
submitButton.addEventListener('click', (e) => {
  e.stopPropagation();
  e.preventDefault();
  clearPage();
  if (isURL(urlInput.value)) {
    shortUrl(urlInput.value);
  } else {
    errorMessage.innerText = 'Not a URL!!!!!';
  }
});
