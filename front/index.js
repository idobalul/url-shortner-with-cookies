import './styles.css';
import axios from 'axios';
import { isURL } from 'validator';

/** ******************
 * Global variables *
 ******************* */
const BASE_URL = 'https://micr0-url.herokuapp.com';
const urlInput = document.getElementById('url-input');
const submitButton = document.getElementById('submit-url');
const errorMessage = document.getElementById('error-message');
const outPut = document.getElementById('output');

outPut.classList.add('hidden');

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
    console.log(error);
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
submitButton.addEventListener('click', () => {
  clearPage();
  if (isURL(urlInput.value)) {
    shortUrl(urlInput.value);
  } else {
    errorMessage.innerText = 'Not a URL!!!!!';
  }
});
