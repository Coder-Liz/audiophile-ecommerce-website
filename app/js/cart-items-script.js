document.addEventListener('DOMContentLoaded', () => {
  // Initialize cartItems from localStorage, or as an empty array if nothing is stored
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Get references to DOM elements
  const cartBtn = document.getElementById('cartButton');
  const cartDialog = document.getElementById('cartDialog');
  const cartList = cartDialog.querySelector('.cart-dialog__items');
  const cartCount = cartDialog.querySelector('.cart-dialog__count');
  const cartTotal = cartDialog.querySelector('.cart-dialog__total strong');
  const removeAllBtn = document.getElementById('removeAllBtn');
  const checkoutBtn = cartDialog.querySelector('.cart-dialog__checkout-btn');

  // --- Helper Functions ---

  /**
   * Saves the current cartItems array to localStorage.
   * Dispatches a custom event 'cartUpdated' to notify other parts of the application.
   */
  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated')); // Notify listeners about cart changes
  }

  /**
   * Renders or re-renders the cart dialog content based on the current cartItems.
   */
  function renderCartDialog() {
    cartList.innerHTML = ''; // Clear previous items
    let totalQuantity = 0;
    let totalPrice = 0;

    if (cartItems.length === 0) {
      cartList.innerHTML =
        '<li class="cart-dialog__empty-message">Your cart is empty.</li>';
      removeAllBtn.disabled = true; // Disable "Remove all" if cart is empty
      checkoutBtn.disabled = true; // Disable "Checkout" if cart is empty
    } else {
      removeAllBtn.disabled = false; // Enable "Remove all"
      checkoutBtn.disabled = false; // Enable "Checkout"

      cartItems.forEach((item) => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;

        const li = document.createElement('li');
        li.classList.add('cart-dialog__item');

        li.innerHTML = `
                    <img class="cart-dialog__image" src="${item.image}" alt="${
          item.name
        }" />
                    <div class="cart-dialog__info">
                        <p class="cart-dialog__item-name">${item.name}</p>
                        <p class="cart-dialog__price">$${item.price.toLocaleString(
                          'en-US'
                        )}</p>
                    </div>
                    <div class="cart-dialog__quantity">
                        <button class="cart-dialog__qty-btn" data-id="${
                          item.id
                        }" data-action="decrease">-</button>
                        <span class="cart-dialog__item-qty" >${
                          item.quantity
                        }</span>
                        <button class="cart-dialog__qty-btn" data-id="${
                          item.id
                        }" data-action="increase">+</button>
                    </div>
                `;
        cartList.appendChild(li);
      });
    }

    // Update cart summary
    cartCount.textContent = `(${totalQuantity})`;
    cartTotal.textContent = `$${totalPrice.toLocaleString('en-US')}`;
  }

  // --- Event Listeners ---

  // Open/Close Cart Dialog
  if (cartBtn && cartDialog) {
    cartBtn.addEventListener('click', () => {
      if (!cartDialog.open) {
        renderCartDialog(); // Render items just before opening
        cartDialog.showModal();
      } else {
        cartDialog.close();
      }
    });

    // Close dialog when clicking outside the modal content
    cartDialog.addEventListener('click', (event) => {
      if (event.target === cartDialog) {
        cartDialog.close();
      }
    });
  }

  // Listens for clicks on the cart item list to handle +/- buttons dynamically
  cartList.addEventListener('click', (e) => {
    // Check if the clicked element is a quantity button
    if (!e.target.matches('.cart-dialog__qty-btn')) return;

    const id = e.target.dataset.id;
    const action = e.target.dataset.action;
    const itemIndex = cartItems.findIndex((i) => i.id === id);

    if (itemIndex > -1) {
      // Ensure the item exists in the cart
      if (action === 'increase') {
        cartItems[itemIndex].quantity++;
      } else if (action === 'decrease') {
        cartItems[itemIndex].quantity--;
      }

      // Remove item from cart if its quantity drops to 0 or less
      if (cartItems[itemIndex].quantity < 1) {
        cartItems.splice(itemIndex, 1);
      }
      saveCartToLocalStorage(); // Persist changes
      renderCartDialog(); // Update the displayed cart
    }
  });

  // Handle "Remove All" button click
  if (removeAllBtn) {
    removeAllBtn.addEventListener('click', () => {
      cartItems = []; // Empty the cart array
      saveCartToLocalStorage(); // Save the empty cart to localStorage
      renderCartDialog(); // Update the displayed cart to show it's empty
    });
  }

  // --- Global Function to Add Items to Cart ---
  // This function is exposed globally so other scripts (like product-detail-script.js) can use it.
  window.addToCart = function (product) {
    // Find if the product already exists in the cart
    let existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // If it exists, update its quantity
      existingProduct.quantity += product.quantity;
    } else {
      // If it's a new product, add it to the cart
      cartItems.push(product);
    }
    saveCartToLocalStorage(); // Save the updated cart to localStorage
    // You might want to provide more direct visual feedback here,
    // like a small notification, instead of relying on opening the cart modal immediately.
  };

  // Initial render when the page loads to display any items already in localStorage
  renderCartDialog();

  // Listen for the 'cartUpdated' event dispatched by saveCartToLocalStorage
  // This ensures the cart count in the header updates even if the modal isn't open
  window.addEventListener('cartUpdated', () => {
    const totalItems = cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
    if (cartCount) {
      cartCount.textContent = `(${totalItems})`;
    }
  });
});
