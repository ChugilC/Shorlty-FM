const input = document.getElementById('link-input');
const linkForm = document.getElementById('link-form');
const errMsg = document.getElementById('err-msg');

const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const links = document.getElementById('shorten-links');

linkForm.addEventListener('submit', formSubmit);

// hamburger menu
btn.addEventListener('click', navToggle);

function navToggle() {
  btn.classList.toggle('open');
  menu.classList.toggle('flex');
  menu.classList.toggle('hidden');
}

// Validate a URL
function validURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(str);
}

function formSubmit(e) {
  e.preventDefault();

  if (input.value === '') {
    errMsg.innerHTML = 'Please enter something!';
    input.classList.add('border-red');
  } else if (!validURL(input.value)) {
    errMsg.innerHTML = 'Please enter a valid URL!';
    input.classList.add('border-red');
  } else {
    errMsg.innerHTML = '';
    input.classList.remove('border-red');
    shortenLink(input.value);
  }
}

// Shor the URL
async function shortenLink(url) {
  const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
  const data = await res.json();
  const shortURL = data.result.full_short_link;

  const DOMelement = document.createElement('div');
  DOMelement.className =
    'flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row';

  DOMelement.innerHTML = `
    <p class="font-bold text-center text-veryDarkViolet md:text-left">
            ${url}
          </p>

          <div
            class="short-link flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0"
          >
            <a href="${shortURL}" id="clipboard" target="_blank" class="font-bold text-cyan">${shortURL}</a>
            <button id="copy" 
              class="p-2 px-8 text-white bg-cyan rounded-lg hover:opacity-70 focus:outline-none"
            >
              Copy
            </button>
          </div>
  `;

  links.appendChild(DOMelement);
  input.value = '';
}
