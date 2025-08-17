fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    // 1. Get the slug from the URL (e.g. "zx9-speaker" from "zx9-speaker.html")
    const slug = window.location.pathname.split('/').pop().replace('.html', '');

    // 2. Find the product with this slug
    const product = data.find((item) => item.slug === slug);

    if (!product) {
      // Handle missing product gracefully, e.g., redirect or show an error message
      document.body.innerHTML = '<h1>Product not found</h1>';
      return;
    }

    // --- Populate Product Information Section ---
    const productInfoWrapper = document.getElementById('productInfoWrapper');
    if (productInfoWrapper) {
      let newProductTag = '';
      if (product.new) {
        newProductTag = `<span class="new product-detail__title-span">New product</span>`;
      }

      const productHTML = `
        <picture class="product-detail__picture">
          <source media="(min-width: 68.75rem)" srcset="${
            product.image.desktop
          }" />
          <source media="(min-width: 43.75rem)" srcset="${
            product.image.tablet
          }" />
          <img
            class="image product-detail__image"
            src="${product.image.mobile}"
            alt="${product.name}"
            width="654"
            height="654"
          />
        </picture>
        <div class="product-detail__info">
          <h2 class="small product-detail__title">
            ${newProductTag}
            ${product.name}
          </h2>
          <p class="product-detail__description">${product.description}</p>
          <p class="product-detail__price">$${product.price.toLocaleString(
            'en-US'
          )}</p>
          <div class="product-detail__buttons">
            <div class="product-detail__quantity-btns">
              <button id="minusBtn" class="product-detail__minus">-</button>
              <p class="product-detail__quantity">1</p>
              <button id="plusBtn" class="product-detail__plus">+</button>
            </div>
            <button class="button btn-one product-detail__add-btn">Add to cart</button>
          </div>
        </div>
      `;
      productInfoWrapper.innerHTML = productHTML;

      // Update the page title
      document.title = `Frontend Mentor | Audiophile e-commerce website | ${product.name}`;

      // Update go back link
      const goBackLink = document.getElementById('goBackLink');
      if (goBackLink) {
        // Correctly set the href to the category page for "Go Back"
        goBackLink.href = `/${product.category}.html`;
      }
    }

    // --- Populate Features and In the Box ---
    const productFeaturesSection = document.getElementById('productFeatures');
    if (productFeaturesSection) {
      const featuresHtml = `
        <div class="product-detail__text-wrapper">
          <h3 class="small">Features</h3>
          ${product.features
            .split('\n\n')
            .map(
              (paragraph) =>
                `<p class="product-detail__features-description">${paragraph}</p>`
            )
            .join('')}
        </div>
        <div class="product-detail__freebies">
          <h3 class="small">In the box</h3>
          <ul class="product-detail__freebies-lists">
            ${product.includes
              .map(
                (item) => `
                <li class="product-detail__freebies-item">
                  <span>${item.quantity}x</span> ${item.item}
                </li>
              `
              )
              .join('')}
          </ul>
        </div>
      `;
      productFeaturesSection.innerHTML = featuresHtml;
    }

    // --- Populate Image Gallery ---
    const imageGallery = document.getElementById('imageGallery');
    if (imageGallery) {
      const galleryImages = [
        product.gallery.first,
        product.gallery.second,
        product.gallery.third,
      ];
      const galleryHtml = galleryImages
        .map(
          (imgData, index) => `
            <picture class="product-detail__pic">
              <source media="(min-width: 68.75rem)" srcset="${
                imgData.desktop
              }" />
              <source media="(min-width: 43.75rem)" srcset="${
                imgData.tablet
              }" />
              <img
                class="image product-detail__gallery-image product-detail__gallery-image--${
                  index + 1
                }"
                src="${imgData.mobile}"
                alt="${product.name} gallery image ${index + 1}"
                width="654"
                height="${index === 2 ? '736' : '348'}" />
            </picture>
          `
        )
        .join('');
      imageGallery.innerHTML = galleryHtml;
    }

    // --- Populate Recommended Products ---
    const recommendedProductsContainer = document.getElementById(
      'recommendedProducts'
    );
    if (recommendedProductsContainer) {
      const recommendedHtml = `
        <h3 class="small">You may also like</h3>
        <div class="product-detail__card-wrapper">
          ${product.others
            .map(
              (otherProduct) => `
                <div class="product-detail__card">
                  <picture class="product-detail__recommended-pic">
                    <source media="(min-width: 68.75rem)" srcset="${otherProduct.image.desktop}" />
                    <source media="(min-width: 43.75rem)" srcset="${otherProduct.image.tablet}" />
                    <img
                      class="image product-detail__recommended-product-image"
                      src="${otherProduct.image.mobile}"
                      alt="${otherProduct.name}"
                      width="654"
                      height="240"
                    />
                  </picture>
                  <h4>${otherProduct.name}</h4>
                  <a href="${otherProduct.slug}.html" class="button btn-one product-detail__cta-btn">See product</a>
                </div>
              `
            )
            .join('')}
        </div>
      `;
      recommendedProductsContainer.innerHTML = recommendedHtml;
    }

    // --- Quantity Buttons Functionality ---
    const quantityElement = document.querySelector('.product-detail__quantity');
    let currentQuantity = 1; // Initialize quantity for the current product view
    if (quantityElement) {
      const minusBtn = document.getElementById('minusBtn');
      const plusBtn = document.getElementById('plusBtn');

      minusBtn.addEventListener('click', () => {
        if (currentQuantity > 1) {
          currentQuantity--;
          quantityElement.textContent = currentQuantity;
        }
      });

      plusBtn.addEventListener('click', () => {
        currentQuantity++;
        quantityElement.textContent = currentQuantity;
      });
    }

    // --- Add to Cart Button Functionality ---
    const addToCartButton = document.querySelector('.product-detail__add-btn');

    if (addToCartButton) {
      addToCartButton.addEventListener('click', () => {
        // Object mapping slugs to short display names
        const shortNames = {
          'xx99-mark-two-headphones': 'XX99 MK II',
          'xx99-mark-one-headphones': 'XX99 MK I',
          'xx59-headphones': 'XX59',
          'yx1-earphones': 'YX1',
          'zx9-speaker': 'ZX9',
          'zx7-speaker': 'ZX7',
        };

        // Function to get the short cart product name
        function getShortProductName(slug, fallbackName) {
          return shortNames[slug] || fallbackName;
        }

        // Use the function to get the cleaned name
        const cleanedProductName = getShortProductName(
          product.slug,
          product.name
        );

        // Create the item for the cart
        const itemToAdd = {
          id: product.slug,
          name: cleanedProductName,
          price: product.price,
          quantity: currentQuantity,
          image: product.cartImage || product.image.mobile,
        };

        // Add to cart using your existing function
        if (window.addToCart) {
          window.addToCart(itemToAdd);
          console.log(
            `Added ${itemToAdd.quantity} of ${itemToAdd.name} to cart.`
          );
          alert(`${itemToAdd.quantity} ${itemToAdd.name}(s) added to cart!`);
        } else {
          console.error(
            'addToCart function is not defined. Ensure cart-items-script.js is loaded correctly.'
          );
        }
      });
    }

    // --- Initial setup for quantities when page loads ---
    // Make sure the quantity display starts at 1
    if (quantityElement) {
      quantityElement.textContent = currentQuantity;
    }
  })
  .catch((error) => {
    console.error('Error fetching or parsing data:', error);
    // Display a user-friendly error message on the page if data fails to load
    document.body.innerHTML =
      '<h1>Failed to load product details. Please try again later.</h1>';
  });

// Go back link functionality (outside of fetch to ensure it works even if product data fails to load,
// though its href is set within the fetch success for specific category)
document.addEventListener('DOMContentLoaded', () => {
  const goBackLink = document.getElementById('goBackLink');
  if (goBackLink && !goBackLink.href.includes('.html')) {
    // Only set generic back if not already set by product data
    goBackLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.back();
    });
  }
});
