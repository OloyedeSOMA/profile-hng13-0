
const userTime = document.querySelector(`[data-testid="test-user-time"]`)

if(userTime){
    const time= Date.now();
    userTime.textContent += " "+ time;
}

const form = document.getElementById('form');
if (form) {
  const inputs = form.querySelectorAll('input, textarea');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  // Fallback for browsers that don't support <dialog>
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function () {
      this.style.display = 'block';
    };
    HTMLDialogElement.prototype.close = function () {
      this.style.display = 'none';
    };
  }

  function validate(input) {
    const wrapper = input.closest('.input-wrapper') || input;
    const errorText = wrapper.parentElement.querySelector('.error-text');
    let message = '';

    if (!input.value.trim()) {
      message = 'This field is required';
    } else if (input.type === 'email' && !/^[^ ]+@[^ ]+\.[a-z]{2,}$/i.test(input.value)) {
      message = 'Invalid email format';
    } else if (input.id === 'message' && input.value.trim().length < 10) {
      message = 'Message must be at least 10 characters';
    }

    if (errorText) {
      errorText.textContent = message;
    }

    if (message) {
      if (wrapper) wrapper.classList.add('error');
      else input.classList.add('error');
    } else {
      if (wrapper) wrapper.classList.remove('error');
      else input.classList.remove('error');
    }

    return message === '';
  }


  inputs.forEach(inp => inp.addEventListener('input', () => validate(inp)));

  
  form.addEventListener('submit', e => {
    e.preventDefault();
    const allValid = [...inputs].every(validate);
    if (allValid && successModal) {
      successModal.showModal();
      form.reset();
    }
  });

  
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => successModal.close());
  }
}
