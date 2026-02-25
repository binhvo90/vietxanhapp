const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const pinInput = document.getElementById('pin');
const rememberInput = document.getElementById('remember');
const formMessage = document.getElementById('formMessage');
const forgotPin = document.getElementById('forgotPin');

const STORAGE_KEY = 'vietxanh_login_saved';

function restoreSavedLogin() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    usernameInput.value = data.username || '';
    rememberInput.checked = Boolean(data.username);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function validateForm(username, pin) {
  const cleanUsername = username.trim();
  const cleanPin = pin.trim();

  if (!cleanUsername) {
    return 'Vui lòng nhập Mã NS hoặc Số ĐT.';
  }

  if (!/^\d{8,15}$/.test(cleanUsername)) {
    return 'Mã NS/SĐT chỉ gồm số và từ 8 đến 15 ký tự.';
  }

  if (!/^\d{4,6}$/.test(cleanPin)) {
    return 'Mã PIN phải gồm 4 đến 6 chữ số.';
  }

  return '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const pin = pinInput.value;
  const validationError = validateForm(username, pin);

  formMessage.classList.remove('success');

  if (validationError) {
    formMessage.textContent = validationError;
    return;
  }

  if (rememberInput.checked) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ username: username.trim() }));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }

  window.location.href = './index.html';
});

forgotPin.addEventListener('click', (event) => {
  event.preventDefault();
  formMessage.classList.remove('success');
  formMessage.textContent = 'Vui lòng liên hệ quản trị viên để cấp lại mã PIN.';
});

restoreSavedLogin();
