// document.addEventListener('DOMContentLoaded', () => {
//   const checkoutItemsList = document.querySelector('.checkout__items');
//   const totalAmountSpan = document.querySelector('.checkout__total-amount');
//   const shippingFeeSpan = document.querySelector('.checkout__shipping-fee');
//   const vatAmountSpan = document.querySelector('.checkout__vat-amount');
//   const grandTotalAmountSpan = document.querySelector(
//     '.checkout__grand-total-amount'
//   );
//   const orderConfirmationModal = document.getElementById(
//     'orderConfirmationModal'
//   );
//   const confirmationModalItemsList = orderConfirmationModal.querySelector(
//     '.confirmation-modal__items'
//   );
//   const confirmationModalGrandTotalAmount =
//     orderConfirmationModal.querySelector(
//       '.confirmation-modal__grand-total-amount'
//     );
//   const backToHomeBtn = orderConfirmationModal.querySelector(
//     '.confirmation-modal__back-home-btn'
//   );
//   const checkoutForm = document.querySelector('.checkout__form');
//   const checkoutPayBtn = document.querySelector('.checkoutBtn');
//   const goBackLink = document.querySelector('.checkout__back-btn');

//   const SHIPPING_COST = 50;
//   const VAT_RATE = 0.2;

//   let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

//   // --- Helper functions for error handling ---
//   function showInputError(inputElement, message = '') {
//     const group = inputElement.closest('.checkout__group');
//     if (group) {
//       group.classList.add('has-error');
//       const errorMessageElement = group.querySelector(
//         '.checkout__error-message'
//       );
//       if (errorMessageElement) {
//         // Ensure the message content is set
//         errorMessageElement.textContent = message;
//         errorMessageElement.style.display = 'inline';
//       }
//     }
//   }

//   function clearInputError(inputElement) {
//     const group = inputElement.closest('.checkout__group');
//     if (group) {
//       group.classList.remove('has-error');
//       const errorMessageElement = group.querySelector(
//         '.checkout__error-message'
//       );
//       if (errorMessageElement) {
//         // Clear the message content
//         errorMessageElement.textContent = '';
//         errorMessageElement.style.display = 'none';
//       }
//     }
//   }
//   // --- End Helper functions ---

//   function renderCheckoutSummary() {
//     checkoutItemsList.innerHTML = '';
//     confirmationModalItemsList.innerHTML = '';
//     let subtotal = 0;

//     if (cartItems.length === 0) {
//       checkoutItemsList.innerHTML =
//         '<li class="checkout__empty-message">Your cart is empty. Please add items before checking out.</li>';
//       totalAmountSpan.textContent = `$0`;
//       shippingFeeSpan.textContent = `$0`;
//       vatAmountSpan.textContent = `$0`;
//       grandTotalAmountSpan.textContent = `$0`;
//       checkoutPayBtn.disabled = true;
//       return;
//     }

//     checkoutPayBtn.disabled = false;

//     cartItems.forEach((item) => {
//       const itemTotal = item.price * item.quantity;
//       subtotal += itemTotal;

//       // Render checkout summary
//       const li = document.createElement('li');
//       li.classList.add('checkout__item');
//       li.innerHTML = `
//         <img class="checkout__image" src="${item.image}" alt="${item.name}" />
//         <div class="checkout__info">
//           <p class="checkout__item-name">${item.name}</p>
//           <p class="checkout__price">$${item.price.toLocaleString('en-US')}</p>
//         </div>
//         <span class="checkout__quantity">x${item.quantity}</span>
//       `;
//       checkoutItemsList.appendChild(li);

//       // Confirmation modal preview
//       const modalLi = document.createElement('li');
//       modalLi.classList.add('confirmation-modal__item');
//       modalLi.innerHTML = `
//         <img class="confirmation-modal__image" src="${item.image}" alt="${
//         item.name
//       }" />
//         <div class="confirmation-modal__info">
//           <p class="confirmation-modal__item-name">${item.name}</p>
//           <p class="confirmation-modal__price">$${item.price.toLocaleString(
//             'en-US'
//           )}</p>
//         </div>
//         <span class="confirmation-modal__quantity">x${item.quantity}</span>
//       `;
//       confirmationModalItemsList.appendChild(modalLi);
//     });

//     const vat = subtotal * VAT_RATE;
//     const grandTotal = subtotal + SHIPPING_COST + vat;

//     totalAmountSpan.textContent = `$${subtotal.toLocaleString('en-US')}`;
//     shippingFeeSpan.textContent = `$${SHIPPING_COST.toLocaleString('en-US')}`;
//     vatAmountSpan.textContent = `$${Math.round(vat).toLocaleString('en-US')}`;
//     grandTotalAmountSpan.textContent = `$${grandTotal.toLocaleString('en-US')}`;
//     confirmationModalGrandTotalAmount.textContent = `$${grandTotal.toLocaleString(
//       'en-US'
//     )}`;

//     if (cartItems.length > 1) {
//       const separatorDiv = document.createElement('div');
//       separatorDiv.classList.add('confirmation-modal__separator');
//       confirmationModalItemsList.appendChild(separatorDiv);

//       const othersLi = document.createElement('li');
//       othersLi.classList.add('confirmation-modal__other-items-toggle');
//       othersLi.innerHTML = `<span class="confirmation-modal__others-text">and ${
//         cartItems.length - 1
//       } other item(s)</span>`;
//       confirmationModalItemsList.appendChild(othersLi);
//     }
//   }

//   renderCheckoutSummary();

//   // --- Live validation on input/blur ---
//   const inputElements = checkoutForm.querySelectorAll(
//     'input:not([type="radio"])'
//   );

//   inputElements.forEach((input) => {
//     // Validate on input (as user types)
//     input.addEventListener('input', () => {
//       // Clear previous error if input becomes non-empty
//       if (input.value.trim()) {
//         clearInputError(input);
//       }

//       // Specific validation for email
//       if (input.id === 'email' && input.value.trim()) {
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
//           showInputError(input, 'Invalid email format');
//         } else {
//           clearInputError(input);
//         }
//       }

//       // Specific validation for e-money fields if e-money is selected
//       const emoneyRadio = document.querySelector(
//         'input[name="payment"][value="emoney"]'
//       );
//       if (emoneyRadio && emoneyRadio.checked) {
//         if (input.id === 'emoney-number' && input.value.trim()) {
//           // Check for at least 9 digits
//           if (!/^\d{9,}$/.test(input.value)) {
//             showInputError(input, 'Invalid e-Money number (min 9 digits)');
//           } else {
//             clearInputError(input);
//           }
//         }
//         if (input.id === 'emoneycode' && input.value.trim()) {
//           // Check for exactly 4 digits
//           if (!/^\d{4}$/.test(input.value)) {
//             showInputError(input, 'Invalid PIN (4 digits)');
//           } else {
//             clearInputError(input);
//           }
//         }
//       }
//     });

//     // Validate on blur (when user leaves the field)
//     input.addEventListener('blur', () => {
//       if (!input.value.trim()) {
//         showInputError(input, 'This field is required');
//       }
//       // Re-run specific validation on blur to catch errors missed by input event
//       if (input.id === 'email' && input.value.trim()) {
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
//           showInputError(input, 'Invalid email format');
//         }
//       }
//       const emoneyRadio = document.querySelector(
//         'input[name="payment"][value="emoney"]'
//       );
//       if (emoneyRadio && emoneyRadio.checked) {
//         if (input.id === 'emoney-number' && input.value.trim()) {
//           if (!/^\d{9,}$/.test(input.value)) {
//             showInputError(input, 'Invalid e-Money number (min 9 digits)');
//           }
//         }
//         if (input.id === 'emoneycode' && input.value.trim()) {
//           if (!/^\d{4}$/.test(input.value)) {
//             showInputError(input, 'Invalid PIN (4 digits)');
//           }
//         }
//       }
//     });
//   });
//   // --- End Live validation ---

//   checkoutForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     let allValid = true;

//     // Validate all input groups (except radio buttons)
//     const inputGroups = checkoutForm.querySelectorAll('.checkout__group');
//     inputGroups.forEach((group) => {
//       const input = group.querySelector('input');

//       if (!input || input.type === 'radio') {
//         return;
//       }

//       // Perform a final check for emptiness on submit
//       if (!input.value.trim()) {
//         showInputError(input, 'This field is required'); // Ensure message is set for empty fields
//         allValid = false;
//       } else {
//         // If not empty, clear any existing 'required' error message
//         clearInputError(input);
//       }
//     });

//     // Specific email validation on submit
//     const emailInput = document.getElementById('email');
//     if (
//       emailInput &&
//       emailInput.value.trim() &&
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)
//     ) {
//       showInputError(emailInput, 'Invalid email format'); // Ensure message is set
//       allValid = false;
//     } else if (emailInput && !emailInput.value.trim()) {
//       // If email field is empty, the general 'required' check above already handles it.
//       // No need for a redundant call unless you want a *different* message for empty email specifically.
//     }

//     const emoneyNumberInput = document.getElementById('emoney-number');
//     const emoneyPinInput = document.getElementById('emoneycode');
//     const emoneyRadio = document.querySelector(
//       'input[name="payment"][value="emoney"]'
//     );

//     // Validate e-Money fields only if e-Money is the selected payment method
//     if (emoneyRadio && emoneyRadio.checked) {
//       if (emoneyNumberInput) {
//         if (!/^\d{9,}$/.test(emoneyNumberInput.value)) {
//           showInputError(
//             emoneyNumberInput,
//             'Invalid e-Money number (min 9 digits)'
//           ); // Ensure message is set
//           allValid = false;
//         } else {
//           clearInputError(emoneyNumberInput);
//         }
//       }

//       if (emoneyPinInput) {
//         if (!/^\d{4}$/.test(emoneyPinInput.value)) {
//           showInputError(emoneyPinInput, 'Invalid PIN (4 digits)'); // Ensure message is set
//           allValid = false;
//         } else {
//           clearInputError(emoneyPinInput);
//         }
//       }
//     } else {
//       // If e-money is not selected, ensure any previous errors are cleared
//       if (emoneyNumberInput) clearInputError(emoneyNumberInput);
//       if (emoneyPinInput) clearInputError(emoneyPinInput);
//     }

//     if (allValid && cartItems.length > 0) {
//       orderConfirmationModal.showModal();
//       cartItems = [];
//       localStorage.removeItem('cart');
//       window.dispatchEvent(new Event('cartUpdated'));
//     } else if (cartItems.length === 0) {
//       alert('Your cart is empty. Please add items before checking out.');
//     } else {
//       // General alert can be removed if specific field errors are sufficient
//       // alert('Please fill in all required fields correctly.');
//     }
//   });

//   // Toggle payment method details
//   const paymentRadios = document.querySelectorAll('input[name="payment"]');
//   const eMoneyDetails = document.querySelector('.e-money');
//   const cashOnDeliveryDetails = document.querySelector(
//     '.checkout__cash-on-delivery'
//   );
//   const emoneyNumber = document.getElementById('emoney-number');
//   const emoneyPin = document.getElementById('emoneycode');

//   paymentRadios.forEach((radio) => {
//     radio.addEventListener('change', () => {
//       if (radio.value === 'emoney' && radio.checked) {
//         eMoneyDetails.classList.remove('hidden');
//         cashOnDeliveryDetails.classList.add('hidden');
//         emoneyNumber.required = true;
//         emoneyPin.required = true;

//         // When switching to e-money, also ensure the fields are validated if not empty
//         // or clear any errors if they are currently valid but were required for cash
//         if (emoneyNumber.value.trim() && !/^\d{9,}$/.test(emoneyNumber.value)) {
//           showInputError(emoneyNumber, 'Invalid e-Money number (min 9 digits)');
//         } else if (emoneyNumber.value.trim()) {
//           // If not empty and valid
//           clearInputError(emoneyNumber);
//         } else {
//           // If empty when switched to, show required error
//           showInputError(emoneyNumber, 'This field is required');
//         }

//         if (emoneyPin.value.trim() && !/^\d{4}$/.test(emoneyPin.value)) {
//           showInputError(emoneyPin, 'Invalid PIN (4 digits)');
//         } else if (emoneyPin.value.trim()) {
//           // If not empty and valid
//           clearInputError(emoneyPin);
//         } else {
//           // If empty when switched to, show required error
//           showInputError(emoneyPin, 'This field is required');
//         }
//       }

//       if (radio.value === 'cash' && radio.checked) {
//         eMoneyDetails.classList.add('hidden');
//         cashOnDeliveryDetails.classList.remove('hidden');
//         emoneyNumber.required = false; // Remove required for hidden fields
//         emoneyPin.required = false; // Remove required for hidden fields

//         // When switching away from e-money, clear any errors on its fields
//         clearInputError(emoneyNumber);
//         clearInputError(emoneyPin);
//       }
//     });
//   });

//   // Set initial payment method UI and required state based on initial checked radio
//   const initialPaymentMethodRadio = document.querySelector(
//     'input[name="payment"]:checked'
//   );
//   if (initialPaymentMethodRadio) {
//     if (initialPaymentMethodRadio.value === 'cash') {
//       eMoneyDetails.classList.add('hidden');
//       cashOnDeliveryDetails.classList.remove('hidden');
//       emoneyNumber.required = false;
//       emoneyPin.required = false;
//     } else {
//       // 'emoney' is default or initially checked
//       eMoneyDetails.classList.remove('hidden');
//       cashOnDeliveryDetails.classList.add('hidden');
//       emoneyNumber.required = true;
//       emoneyPin.required = true;
//     }
//   }

//   if (backToHomeBtn) {
//     backToHomeBtn.addEventListener('click', () => {
//       orderConfirmationModal.close();
//       window.location.href = '/';
//     });
//   }

//   if (goBackLink) {
//     goBackLink.addEventListener('click', (e) => {
//       e.preventDefault();
//       window.history.back();
//     });
//   }

//   window.addEventListener('cartUpdated', renderCheckoutSummary);
// });

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element Selections ---
  const checkoutItemsList = document.querySelector('.checkout__items');
  const totalAmountSpan = document.querySelector('.checkout__total-amount');
  const shippingFeeSpan = document.querySelector('.checkout__shipping-fee');
  const vatAmountSpan = document.querySelector('.checkout__vat-amount');
  const grandTotalAmountSpan = document.querySelector(
    '.checkout__grand-total-amount'
  );
  const orderConfirmationModal = document.getElementById(
    'orderConfirmationModal'
  );
  const confirmationModalItemsList = orderConfirmationModal.querySelector(
    '.confirmation-modal__items'
  );
  const confirmationModalGrandTotalAmount =
    orderConfirmationModal.querySelector(
      '.confirmation-modal__grand-total-amount'
    );
  const backToHomeBtn = orderConfirmationModal.querySelector(
    '.confirmation-modal__back-home-btn'
  );
  const checkoutForm = document.querySelector('.checkout__form');
  const checkoutPayBtn = document.querySelector('.checkoutBtn');
  const goBackLink = document.querySelector('.checkout__back-btn');

  // --- Constants ---
  const SHIPPING_COST = 50;
  const VAT_RATE = 0.2;

  // --- Cart Data ---
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // --- Helper functions for error handling and validation ---
  function showInputError(inputElement, message) {
    const group = inputElement.closest('.checkout__group');
    if (group) {
      group.classList.add('has-error');
      const errorMessageElement = group.querySelector(
        '.checkout__error-message'
      );
      if (errorMessageElement) {
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'inline';
      }
    }
  }

  function clearInputError(inputElement) {
    const group = inputElement.closest('.checkout__group');
    if (group) {
      group.classList.remove('has-error');
      const errorMessageElement = group.querySelector(
        '.checkout__error-message'
      );
      if (errorMessageElement) {
        errorMessageElement.textContent = '';
        errorMessageElement.style.display = 'none';
      }
    }
  }

  function validateRequired(input) {
    if (!input.value.trim()) {
      showInputError(input, 'This field is required');
      return false;
    }
    clearInputError(input);
    return true;
  }

  function validateEmailFormat(input) {
    if (input.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      showInputError(input, 'Invalid email format');
      return false;
    }
    clearInputError(input);
    return true;
  }

  function validateEmoneyNumber(input) {
    const emoneyRadio = document.querySelector(
      'input[name="payment"][value="emoney"]'
    );
    if (emoneyRadio && emoneyRadio.checked) {
      if (!input.value.trim()) {
        showInputError(input, 'This field is required');
        return false;
      }
      if (!/^\d{9,}$/.test(input.value)) {
        showInputError(input, 'Invalid e-Money number (min 9 digits)');
        return false;
      }
    }
    clearInputError(input); // Clear only if it passes or is not applicable
    return true;
  }

  function validateEmoneyPin(input) {
    const emoneyRadio = document.querySelector(
      'input[name="payment"][value="emoney"]'
    );
    if (emoneyRadio && emoneyRadio.checked) {
      if (!input.value.trim()) {
        showInputError(input, 'This field is required');
        return false;
      }
      if (!/^\d{4}$/.test(input.value)) {
        showInputError(input, 'Invalid PIN (4 digits)');
        return false;
      }
    }
    clearInputError(input); // Clear only if it passes or is not applicable
    return true;
  }
  // --- End Helper functions ---

  // --- Render Checkout Summary ---
  function renderCheckoutSummary() {
    checkoutItemsList.innerHTML = '';

    let subtotal = 0;

    if (cartItems.length === 0) {
      checkoutItemsList.innerHTML =
        '<li class="checkout__empty-message">Your cart is empty. Please add items before checking out.</li>';
      totalAmountSpan.textContent = `$0`;
      shippingFeeSpan.textContent = `$0`;
      vatAmountSpan.textContent = `$0`;
      grandTotalAmountSpan.textContent = `$0`;
      checkoutPayBtn.disabled = true;
      return;
    }

    checkoutPayBtn.disabled = false;

    cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      // Render for the main checkout summary (always show all items)
      const li = document.createElement('li');
      li.classList.add('checkout__item');
      li.innerHTML = `
        <img class="checkout__image" src="${item.image}" alt="${item.name}" />
        <div class="checkout__info">
          <p class="checkout__item-name">${item.name}</p>
          <p class="checkout__price">$${item.price.toLocaleString('en-US')}</p>
        </div>
        <span class="checkout__quantity">x${item.quantity}</span>
      `;
      checkoutItemsList.appendChild(li);
    });

    const vat = subtotal * VAT_RATE;
    const grandTotal = subtotal + SHIPPING_COST;

    totalAmountSpan.textContent = `$${subtotal.toLocaleString('en-US')}`;
    shippingFeeSpan.textContent = `$${SHIPPING_COST.toLocaleString('en-US')}`;
    vatAmountSpan.textContent = `$${Math.round(vat).toLocaleString('en-US')}`;
    grandTotalAmountSpan.textContent = `$${grandTotal.toLocaleString('en-US')}`;
  }

  // === NEW: Render the confirmation modal from a cart snapshot
  function renderConfirmationModal(snapshot) {
    confirmationModalItemsList.innerHTML = '';
    let subtotal = 0;
    snapshot.forEach((item, index) => {
      subtotal += item.price * item.quantity;
      if (index === 0) {
        const modalLi = document.createElement('li');
        modalLi.classList.add('confirmation-modal__item');
        modalLi.innerHTML = `
          <img class="confirmation-modal__image" src="${item.image}" alt="${
          item.name
        }" />
          <div class="confirmation-modal__info">
            <p class="confirmation-modal__item-name">${item.name}</p>
            <p class="confirmation-modal__price">$${item.price.toLocaleString(
              'en-US'
            )}</p>
          </div>
          <span class="confirmation-modal__quantity">x${item.quantity}</span>
        `;
        confirmationModalItemsList.appendChild(modalLi);
      }
    });

    if (snapshot.length > 1) {
      const separatorDiv = document.createElement('div');
      separatorDiv.classList.add('confirmation-modal__separator');
      confirmationModalItemsList.appendChild(separatorDiv);

      const othersLi = document.createElement('li');
      othersLi.classList.add('confirmation-modal__other-items-toggle');
      othersLi.innerHTML = `<span class="confirmation-modal__others-text">and ${
        snapshot.length - 1
      } other item(s)</span>`;
      confirmationModalItemsList.appendChild(othersLi);
    }

    // Render total
    const vat = subtotal * VAT_RATE;
    const grandTotal = subtotal + SHIPPING_COST;
    confirmationModalGrandTotalAmount.textContent = `$${grandTotal.toLocaleString(
      'en-US'
    )}`;
  }
  // === END NEW

  // Initial render of the checkout summary
  renderCheckoutSummary();

  // --- Live Validation on Input/Blur ---
  const inputElements = checkoutForm.querySelectorAll(
    'input:not([type="radio"])'
  );

  inputElements.forEach((input) => {
    // Handle readonly attribute removal on focus
    if (input.hasAttribute('readonly')) {
      input.addEventListener('focus', function () {
        this.removeAttribute('readonly');
      });
    }

    input.addEventListener('input', () => {
      // General required check and specific validations
      validateRequired(input);
      if (input.id === 'email') validateEmailFormat(input);
      else if (input.id === 'emoney-number') validateEmoneyNumber(input);
      else if (input.id === 'emoneycode') validateEmoneyPin(input);
    });

    input.addEventListener('blur', () => {
      // Re-run validation on blur to catch any final errors
      validateRequired(input);
      if (input.id === 'email') validateEmailFormat(input);
      else if (input.id === 'emoney-number') validateEmoneyNumber(input);
      else if (input.id === 'emoneycode') validateEmoneyPin(input);
    });
  });

  // --- Form Submission Handler ---
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    let allValid = true;

    // Validate all input fields on submit
    const inputsToValidate = checkoutForm.querySelectorAll(
      'input:not([type="radio"])'
    );
    inputsToValidate.forEach((input) => {
      let fieldIsValid = true;
      if (input.id === 'email') {
        fieldIsValid = validateRequired(input) && validateEmailFormat(input);
      } else if (input.id === 'emoney-number') {
        fieldIsValid = validateEmoneyNumber(input); // This function already includes required check if applicable
      } else if (input.id === 'emoneycode') {
        fieldIsValid = validateEmoneyPin(input); // This function already includes required check if applicable
      } else {
        fieldIsValid = validateRequired(input);
      }
      if (!fieldIsValid) {
        allValid = false;
      }
    });

    // Check if cart is empty before processing
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      allValid = false; // Ensure form doesn't proceed
    }

    if (allValid) {
      // === MODIFIED: Take a snapshot of the cart BEFORE clearing it
      const orderSnapshot = cartItems.slice(); // copy array (shallow is enough)
      renderConfirmationModal(orderSnapshot); // Render modal from the snapshot

      orderConfirmationModal.showModal();

      cartItems = []; // Clear cart
      localStorage.removeItem('cart'); // Clear local storage
      window.dispatchEvent(new Event('cartUpdated')); // Notify other parts of the app
    }
    // No general alert for invalid fields; individual field errors provide better UX
  });

  // --- Payment Method Toggle Logic ---
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const eMoneyDetails = document.querySelector('.e-money');
  const cashOnDeliveryDetails = document.querySelector(
    '.checkout__cash-on-delivery'
  );
  const emoneyNumberInput = document.getElementById('emoney-number');
  const emoneyPinInput = document.getElementById('emoneycode');

  paymentRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.value === 'emoney') {
        eMoneyDetails.classList.remove('hidden');
        cashOnDeliveryDetails.classList.add('hidden');
        // Setting required attributes directly
        emoneyNumberInput.required = true;
        emoneyPinInput.required = true;

        // Re-validate e-money fields when switching to them
        validateEmoneyNumber(emoneyNumberInput);
        validateEmoneyPin(emoneyPinInput);
      } else if (radio.value === 'cash') {
        eMoneyDetails.classList.add('hidden');
        cashOnDeliveryDetails.classList.remove('hidden');
        // Remove required for cash on delivery (hidden) fields
        emoneyNumberInput.required = false;
        emoneyPinInput.required = false;

        // When switching away from e-money, clear any errors on its fields
        clearInputError(emoneyNumberInput);
        clearInputError(emoneyPinInput);
      }
    });
  });

  // Set initial payment method UI and required state based on initial checked radio
  const initialPaymentMethodRadio = document.querySelector(
    'input[name="payment"]:checked'
  );
  if (initialPaymentMethodRadio) {
    if (initialPaymentMethodRadio.value === 'cash') {
      eMoneyDetails.classList.add('hidden');
      cashOnDeliveryDetails.classList.remove('hidden');
      emoneyNumberInput.required = false;
      emoneyPinInput.required = false;
    } else {
      // 'emoney' is default or initially checked
      eMoneyDetails.classList.remove('hidden');
      cashOnDeliveryDetails.classList.add('hidden');
      emoneyNumberInput.required = true;
      emoneyPinInput.required = true;
    }
  }

  // --- Modal and Navigation Button Handlers ---
  if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', () => {
      orderConfirmationModal.close();
      window.location.href = '/'; // Navigate to home page
    });
  }

  if (goBackLink) {
    goBackLink.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior
      window.history.back(); // Go back in browser history
    });
  }

  // --- Custom Event Listener ---
  // Listen for 'cartUpdated' event to re-render summary if cart changes elsewhere
  window.addEventListener('cartUpdated', renderCheckoutSummary);
});
