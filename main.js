 
        document.addEventListener('DOMContentLoaded', function() {
            const productListingPage = document.getElementById('productListingPage');
            const productDetailPage = document.getElementById('productDetailPage');
            const backToCollectionBtn = document.getElementById('backToCollection');

            // Search related elements
            const searchInput = document.getElementById('searchInput');
            const exploreProductGrid1 = document.getElementById('exploreProductGrid1');
            const exploreProductGrid2 = document.getElementById('exploreProductGrid2');
            const menCollectionSection = document.getElementById('menCollectionSection');
            const moreCollectionSection = document.getElementById('moreCollectionSection');
            const noSearchResultsMessage = document.getElementById('noSearchResults');
            const menCollectionTitle = document.getElementById('menCollectionTitle');
            const menCollectionViewAll = document.getElementById('menCollectionViewAll');

            // Function to show a specific page
            function showPage(pageId) {
                if (pageId === 'productListingPage') {
                    productListingPage.style.display = 'block';
                    productDetailPage.style.display = 'none';
                } else if (pageId === 'productDetailPage') {
                    productListingPage.style.display = 'none';
                    productDetailPage.style.display = 'block';
                }
            }

            // Initial page load
            showPage('productListingPage');

            // Event listener for product card clicks
            document.querySelectorAll('.carousel-product-card').forEach(card => {
                card.addEventListener('click', function() {
                    const productId = this.dataset.productId;
                    loadProductDetails(productId);
                    showPage('productDetailPage');
                });
            });

            // Event listener for "Back to Collection" button
            if (backToCollectionBtn) {
                backToCollectionBtn.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default link behavior
                    showPage('productListingPage');
                });
            }

            // Existing JS from both files combined below:

            const hamburgerMenu = document.getElementById('hamburgerMenu');
            const offCanvasMenu = document.getElementById('offCanvasMenu');
            const closeMenu = document.getElementById('closeMenu');
            const subnav = document.getElementById('subnav');
            const shoppingBagIcon = document.querySelector('.subnav .right .fa-shopping-bag');
            const sideCartOverlay = document.getElementById('sideCartOverlay');
            const sideCart = document.getElementById('sideCart');
            const closeSideCart = document.getElementById('closeSideCart');
            const viewCartButton = document.getElementById('viewCartButton');
            const fullCartOverlay = document.getElementById('fullCartOverlay');
            const closeFullCart = document.getElementById('closeFullCart');
            const addToCartButton = document.querySelector('.add-to-cart');
            const fullCartCheckoutButton = document.getElementById('fullCartCheckoutButton');
            // Renamed sideCartBuyNowButton to yourInfoButton
            const yourInfoButton = document.getElementById('yourInfoButton');
            const quantityInput = document.getElementById('quantity');
            const increaseQuantityButton = document.getElementById('increaseQuantity');
            const decreaseQuantityButton = document.getElementById('decreaseQuantity');
            const productImagesContainer = document.getElementById('productImages');
            const productNameElement = document.getElementById('productName');
            const productSkuElement = document.getElementById('productSku');
            const productPriceElement = document.getElementById('productPrice');
            const productDescriptionElement = document.getElementById('productDescription');
            const colorOptionsContainer = document.getElementById('colorOptions');
            const sizeSelect = document.getElementById('sizeSelect'); // This is now the custom select div
            const imageModalOverlay = document.getElementById('imageModalOverlay');
            const zoomedImage = document.getElementById('zoomedImage');
            const closeImageModal = document.getElementById('closeImageModal');

            // New Your Information Modal elements
            const yourInfoModalOverlay = document.getElementById('yourInfoModalOverlay');
            const closeYourInfoModal = document.getElementById('closeYourInfoModal');
            const userNameInput = document.getElementById('userName');
            const userEmailInput = document.getElementById('userEmail');
            const userPhoneInput = document.getElementById('userPhone');
            const userAddressInput = document.getElementById('userAddress');
            const userAgeInput = document.getElementById('userAge');
            const submitYourInfoButton = document.getElementById('submitYourInfo');

            // Delivery Modal elements
            const deliveryModalOverlay = document.getElementById('deliveryModalOverlay');
            const closeDeliveryModal = document.getElementById('closeDeliveryModal');
            const calculateDeliveryButton = document.getElementById('calculateDelivery');
            const fullCartEstimateDeliveryLink = document.getElementById('fullCartEstimateDeliveryLink');
            const countrySelect = document.getElementById('countrySelect');
            const deliveryPlaceInput = document.getElementById('deliveryPlaceInput');
            const zipCodeInput = document.getElementById('zipCodeInput');

            // Online Payments Modal elements
            const onlinePaymentsButton = document.getElementById('onlinePaymentsButton');
            const onlinePaymentModalOverlay = document.getElementById('onlinePaymentModalOverlay');
            const closeOnlinePaymentModal = document.getElementById('closeOnlinePaymentModal');
            const onlinePaymentForm = document.getElementById('onlinePaymentForm');
            const paymentNameInput = document.getElementById('paymentName');
            const accountMobileNumberInput = document.getElementById('accountMobileNumber');
            const paymentPhotoInput = document.getElementById('paymentPhoto');
            const paymentEmailInput = document.getElementById('paymentEmail');
            // Removed submitOnlinePaymentButton as it's no longer directly used for email sending

            // Message Box elements
            const messageBoxOverlay = document.getElementById('messageBoxOverlay');
            const messageBoxTitle = document.getElementById('messageBoxTitle');
            const messageBoxMessage = document.getElementById('messageBoxMessage');
            const closeMessageBoxButton = document.getElementById('closeMessageBox');


            // Global variables to store customer and delivery information
            let customerInfo = {
                name: '',
                email: '',
                phone: '',
                address: '',
                age: ''
            };

            let deliveryDetails = {
                country: '',
                place: '',
                zipCode: ''
            };

            let onlinePaymentInfo = {
                name: '',
                accountMobileNumber: '',
                email: '',
                screenshot: '' // Base64 string
            };

            let cart = [];

            // Function to load data from local storage
            function loadFromLocalStorage() {
                const storedCustomerInfo = localStorage.getItem('customerInfo');
                if (storedCustomerInfo) {
                    customerInfo = JSON.parse(storedCustomerInfo);
                    userNameInput.value = customerInfo.name;
                    userEmailInput.value = customerInfo.email;
                    userPhoneInput.value = customerInfo.phone;
                    userAddressInput.value = customerInfo.address;
                    userAgeInput.value = customerInfo.age;
                }

                const storedDeliveryDetails = localStorage.getItem('deliveryDetails');
                if (storedDeliveryDetails) {
                    deliveryDetails = JSON.parse(storedDeliveryDetails);
                    countrySelect.value = deliveryDetails.country; // Set value for select
                    deliveryPlaceInput.value = deliveryDetails.place;
                    zipCodeInput.value = deliveryDetails.zipCode;
                }

                const storedOnlinePaymentInfo = localStorage.getItem('onlinePaymentInfo');
                if (storedOnlinePaymentInfo) {
                    onlinePaymentInfo = JSON.parse(storedOnlinePaymentInfo);
                    // Optionally populate payment form fields if user returns to modal
                    paymentNameInput.value = onlinePaymentInfo.name;
                    accountMobileNumberInput.value = onlinePaymentInfo.accountMobileNumber;
                    paymentEmailInput.value = onlinePaymentInfo.email;
                    // Note: File input cannot be programmatically set for security reasons
                }
            }

            // Function to save data to local storage
            function saveToLocalStorage(key, data) {
                localStorage.setItem(key, JSON.stringify(data));
            }

            // Function to clear data from local storage
            function clearLocalStorage() {
                localStorage.removeItem('customerInfo');
                localStorage.removeItem('deliveryDetails');
                localStorage.removeItem('onlinePaymentInfo'); // Clear payment info too
            }

            function showMessageBox(title, message, callback = null) {
                messageBoxTitle.textContent = title;
                messageBoxMessage.textContent = message;
                messageBoxOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Remove any existing click listener to prevent multiple calls
                closeMessageBoxButton.removeEventListener('click', hideMessageBoxAndExecuteCallback);
                // Add new listener that includes the callback
                closeMessageBoxButton.addEventListener('click', hideMessageBoxAndExecuteCallback);

                function hideMessageBoxAndExecuteCallback() {
                    hideMessageBox(); // Hide the message box
                    if (callback) {
                        callback(); // Execute the callback function
                    }
                    // Remove this specific listener after execution to clean up
                    closeMessageBoxButton.removeEventListener('click', hideMessageBoxAndExecuteCallback);
                }
            }

            function hideMessageBox() {
                messageBoxOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }

            // Initial setup for message box close button (for cases without a specific callback)
            if (closeMessageBoxButton) {
                closeMessageBoxButton.addEventListener('click', hideMessageBox);
            }

            if (hamburgerMenu) {
                hamburgerMenu.addEventListener('click', function() {
                    offCanvasMenu.classList.add('open');
                    document.body.style.overflow = 'hidden';
                });
            }

            if (closeMenu) {
                closeMenu.addEventListener('click', function() {
                    offCanvasMenu.classList.remove('open');
                    document.body.style.overflow = '';
                });
            }

            document.addEventListener('click', function(event) {
                if (offCanvasMenu && offCanvasMenu.classList.contains('open') &&
                    !offCanvasMenu.contains(event.target) &&
                    (!hamburgerMenu || !hamburgerMenu.contains(event.target))) {
                    offCanvasMenu.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });

            let lastScrollTop = 0;

            window.addEventListener('scroll', function() {
                let currentScrollTop = window.scrollY || document.documentElement.scrollTop;
                const headerHeight = document.querySelector('header').offsetHeight;
                const subnavHeight = subnav.offsetHeight;

                if (currentScrollTop > lastScrollTop && currentScrollTop > (headerHeight + subnavHeight)) {
                    subnav.style.top = `-${subnavHeight + 10}px`;
                } else if (currentScrollTop < lastScrollTop || currentScrollTop <= headerHeight) {
                    subnav.style.top = `${headerHeight}px`;
                }
                lastScrollTop = currentScrollTop;
            });

            if (shoppingBagIcon) {
                shoppingBagIcon.addEventListener('click', function() {
                    sideCartOverlay.classList.add('active');
                    sideCart.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    renderCartItems();
                });
            }

            if (closeSideCart) {
                closeSideCart.addEventListener('click', function() {
                    sideCartOverlay.classList.remove('active');
                    sideCart.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }

            if (sideCartOverlay) {
                sideCartOverlay.addEventListener('click', function(event) {
                    if (event.target === sideCartOverlay) {
                        sideCartOverlay.classList.remove('active');
                        sideCart.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }

            if (viewCartButton) {
                viewCartButton.addEventListener('click', function() {
                    sideCartOverlay.classList.remove('active');
                    sideCart.classList.remove('active');
                    fullCartOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    renderFullCartItems();
                });
            }

            if (closeFullCart) {
                closeFullCart.addEventListener('click', function() {
                    fullCartOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }

            if (increaseQuantityButton) {
                increaseQuantityButton.addEventListener('click', function() {
                    quantityInput.value = parseInt(quantityInput.value) + 1;
                });
            }

            if (decreaseQuantityButton) {
                decreaseQuantityButton.addEventListener('click', function() {
                    const currentValue = parseInt(quantityInput.value);
                    if (currentValue > 1) {
                        quantityInput.value = currentValue - 1;
                    }
                });
            }

            if (addToCartButton) {
                addToCartButton.addEventListener('click', function() {
                    // Get the current product ID from the currently displayed product details
                    const currentProductId = productDetailPage.dataset.currentProductId;
                    const selectedProduct = products[currentProductId];
                    
                    // Get selected size from custom dropdown
                    const selectedSizeElement = sizeSelect.querySelector('.select-selected');
                    const selectedSize = selectedSizeElement.dataset.value || ''; // Get the value from data-value

                    const selectedColorSwatch = document.querySelector('#productDetailPage .color-swatch.selected');
                    const selectedColor = selectedColorSwatch ? selectedColorSwatch.dataset.color : null;
                    const quantity = parseInt(quantityInput.value);

                    if (!selectedSize || selectedSize === "Select Size") { // Check for default text or empty value
                        showMessageBox('Selection Required', 'Please select a size before adding to cart.');
                        return;
                    }
                    if (!selectedColor) {
                        showMessageBox('Selection Required', 'Please select a color before adding to cart.');
                        return;
                    }

                    const item = {
                        id: selectedProduct.sku + '-' + selectedColor + '-' + selectedSize,
                        productId: currentProductId,
                        name: selectedProduct.name,
                        price: selectedProduct.price,
                        image: selectedProduct.images[0], // Use the first image from the product's image array
                        color: selectedColor,
                        size: selectedSize,
                        quantity: quantity
                    };

                    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
                    if (existingItemIndex > -1) {
                        cart[existingItemIndex].quantity += quantity;
                    } else {
                        cart.push(item);
                    }

                    // Show message box, then open side cart after message is dismissed
                    showMessageBox('Item Added', `${quantity} x ${selectedProduct.name} (${selectedColor}, ${selectedSize}) added to cart!`, () => {
                        sideCartOverlay.classList.add('active');
                        sideCart.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        renderCartItems();
                    });
                    updateCartTotal();
                });
            }

            // Event listener for the new "Your Information" button in side cart
            if (yourInfoButton) {
                yourInfoButton.addEventListener('click', function() {
                    if (cart.length === 0) {
                        showMessageBox('Cart Empty', 'Your cart is empty. Please add items before proceeding.');
                        return;
                    }
                    sideCartOverlay.classList.remove('active'); // Close side cart
                    yourInfoModalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }

            // Function to send order email
            async function sendOrderEmail() {
                let orderMessage = `Customer Information:\n`;
                orderMessage += `  Name: ${customerInfo.name}\n`;
                orderMessage += `  Email: ${customerInfo.email}\n`;
                orderMessage += `  Phone: ${customerInfo.phone}\n`;
                orderMessage += `  Address: ${customerInfo.address}\n`;
                orderMessage += `  Age: ${customerInfo.age}\n\n`;

                orderMessage += `Delivery Details:\n`;
                orderMessage += `  Country: ${deliveryDetails.country}\n`;
                orderMessage += `  Place: ${deliveryDetails.place}\n`;
                orderMessage += `  Zip Code: ${deliveryDetails.zipCode}\n\n`;

                orderMessage += "Order Details:\n\n";
                cart.forEach((item, index) => {
                    orderMessage += `Item ${index + 1}:\n`;
                    orderMessage += `  Product: ${item.name}\n`;
                    orderMessage += `  Color: ${item.color}\n`;
                    orderMessage += `  Size: ${item.size}\n`;
                    orderMessage += `  Quantity: ${item.quantity}\n`;
                    orderMessage += `  Price: $${item.price.toFixed(2)} each\n`;
                    orderMessage += `  Total for item: $${(item.price * item.quantity).toFixed(2)}\n\n`;
                });
                orderMessage += `Order Subtotal: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}\n\n`;

                const promoCode = document.getElementById('promo-code-input').value.trim();
                if (promoCode) {
                    orderMessage += `Promo Code Applied: ${promoCode}\n`;
                }
                const addNote = document.getElementById('add-note-textarea').value.trim();
                if (addNote) {
                    orderMessage += `Customer Note: ${addNote}\n`;
                }

                // Add online payment details if available
                if (onlinePaymentInfo.screenshot) {
                    orderMessage += `Online Payment Confirmation:\n`;
                    orderMessage += `  Account Holder Name: ${onlinePaymentInfo.name}\n`;
                    orderMessage += `  Account/Mobile Number: ${onlinePaymentInfo.accountMobileNumber}\n`;
                    orderMessage += `  Confirmation Email: ${onlinePaymentInfo.email}\n`;
                    orderMessage += `  Payment Screenshot (Base64): ${onlinePaymentInfo.screenshot}\n\n`;
                }


                // Create FormData object
                const formData = new FormData();
                formData.append('access_key', 'b9e6b897-be95-4103-be83-0f1ddca45c35');
                formData.append('subject', `New Order from ${customerInfo.name}`);
                formData.append('email', 'abhiaaa1230@gmail.com'); // Your target email
                formData.append('message', orderMessage);

                try {
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (result.success) {
                        showMessageBox('Order Placed!', 'Thank you for your purchase! Your order details have been sent to your email.', () => {
                            cart = []; // Clear the cart after successful submission
                            customerInfo = { name: '', email: '', phone: '', address: '', age: '' }; // Clear customer info
                            deliveryDetails = { country: '', place: '', zipCode: '' }; // Clear delivery info
                            onlinePaymentInfo = { name: '', accountMobileNumber: '', email: '', screenshot: '' }; // Clear payment info
                            clearLocalStorage(); // Clear local storage
                            renderCartItems();
                            renderFullCartItems();
                            fullCartOverlay.classList.remove('active'); // Ensure full cart is closed
                            document.body.style.overflow = '';
                            showPage('productListingPage'); // Go back to product listing page
                        });
                    } else {
                        showMessageBox('Order Failed', 'There was an error placing your order. Please try again later.');
                        console.error('Web3Forms error:', result.message);
                    }
                } catch (error) {
                    showMessageBox('Order Failed', 'There was a network error. Please check your internet connection and try again.');
                    console.error('Fetch error:', error);
                }
            }


            // Event listener for "Proceed to Checkout" button in full cart
            if (fullCartCheckoutButton) {
                fullCartCheckoutButton.addEventListener('click', function() {
                    if (cart.length === 0) {
                        showMessageBox('Cart Empty', 'Your cart is empty. Please add items before checking out.');
                        return;
                    }

                    // Validate if customer information is filled
                    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.age) {
                        fullCartOverlay.classList.remove('active'); // Close full cart
                        yourInfoModalOverlay.classList.add('active');
                        showMessageBox('Information Required', 'Please fill in your personal information before proceeding to checkout.');
                        return;
                    }

                    // Validate if delivery information is filled
                    if (!deliveryDetails.country || deliveryDetails.country === "" || !deliveryDetails.place || !deliveryDetails.zipCode) {
                        fullCartOverlay.classList.remove('active'); // Close full cart
                        deliveryModalOverlay.classList.add('active');
                        showMessageBox('Delivery Details Required', 'Please provide delivery details before proceeding to checkout.');
                        return;
                    }

                    // If all information is filled, proceed with sending the email
                    sendOrderEmail();
                });
            }

            // Event listener for "Submit Information" button in Your Information modal
            if (submitYourInfoButton) {
                submitYourInfoButton.addEventListener('click', function() {
                    const name = userNameInput.value.trim();
                    const email = userEmailInput.value.trim();
                    const phone = userPhoneInput.value.trim();
                    const address = userAddressInput.value.trim();
                    const age = userAgeInput.value.trim();

                    if (!name || !email || !phone || !address || !age) {
                        showMessageBox('Input Required', 'Please fill in all your personal information fields.');
                        return;
                    }
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        showMessageBox('Invalid Email', 'Please enter a valid email address.');
                        return;
                    }
                    if (isNaN(age) || parseInt(age) < 1 || parseInt(age) > 120) {
                        showMessageBox('Invalid Age', 'Please enter a valid age (1-120).');
                        return;
                    }

                    customerInfo = { name, email, phone, address, age };
                    saveToLocalStorage('customerInfo', customerInfo); // Save to local storage

                    yourInfoModalOverlay.classList.remove('active'); // Close personal info modal
                    deliveryModalOverlay.classList.add('active'); // Open delivery modal
                });
            }

            // Event listener for "Calculate" button in Estimate Delivery modal
            if (calculateDeliveryButton) {
                calculateDeliveryButton.addEventListener('click', function() {
                    const country = countrySelect.options[countrySelect.selectedIndex].text;
                    const deliveryPlace = deliveryPlaceInput.value.trim();
                    const zipCode = zipCodeInput.value.trim();

                    if (country === "Select Country" || !deliveryPlace || !zipCode) {
                        showMessageBox('Input Required', 'Please select a country, enter a delivery place, and enter a zip code.');
                        return;
                    }

                    deliveryDetails = { country, place: deliveryPlace, zipCode };
                    saveToLocalStorage('deliveryDetails', deliveryDetails); // Save to local storage

                    deliveryModalOverlay.classList.remove('active'); // Close delivery modal
                    fullCartOverlay.classList.add('active'); // Re-open full cart
                    showMessageBox('Delivery Details Saved', 'Delivery information has been saved. You can now proceed to checkout.');
                });
            }

            // Event listener for the "Estimate Delivery" link on the full cart page
            if (fullCartEstimateDeliveryLink) {
                fullCartEstimateDeliveryLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    if (cart.length === 0) {
                        showMessageBox('Cart Empty', 'Your cart is empty. Cannot estimate delivery.');
                        return;
                    }
                    fullCartOverlay.classList.remove('active'); // Close full cart
                    yourInfoModalOverlay.classList.add('active'); // Always start with personal info if not filled
                    document.body.style.overflow = 'hidden';
                });
            }

            // Close Your Information Modal
            if (closeYourInfoModal) {
                closeYourInfoModal.addEventListener('click', function() {
                    yourInfoModalOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    // Do NOT clear customerInfo here, as it might be needed for checkout later
                });
            }

            // Close Delivery Modal
            if (closeDeliveryModal) {
                closeDeliveryModal.addEventListener('click', function() {
                    deliveryModalOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    // Do NOT clear deliveryDetails here, as it might be needed for checkout later
                });
            }

            // Close modals on overlay click
            if (yourInfoModalOverlay) {
                yourInfoModalOverlay.addEventListener('click', function(event) {
                    if (event.target === yourInfoModalOverlay) {
                        yourInfoModalOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                        // Do NOT clear customerInfo here
                    }
                });
            }

            if (deliveryModalOverlay) {
                deliveryModalOverlay.addEventListener('click', function(event) {
                    if (event.target === deliveryModalOverlay) {
                        deliveryModalOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                        // Do NOT clear deliveryDetails here
                    }
                });
            }

            // Online Payments Modal Logic
            if (onlinePaymentsButton) {
                onlinePaymentsButton.addEventListener('click', function() {
                    if (cart.length === 0) {
                        showMessageBox('Cart Empty', 'Your cart is empty. Please add items before proceeding with online payment.');
                        return;
                    }
                    fullCartOverlay.classList.remove('active'); // Close full cart
                    onlinePaymentModalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }

            if (closeOnlinePaymentModal) {
                closeOnlinePaymentModal.addEventListener('click', function() {
                    onlinePaymentModalOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    fullCartOverlay.classList.add('active'); // Re-open full cart after closing online payment modal
                });
            }

            if (onlinePaymentModalOverlay) {
                onlinePaymentModalOverlay.addEventListener('click', function(event) {
                    if (event.target === onlinePaymentModalOverlay) {
                        onlinePaymentModalOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                        fullCartOverlay.classList.add('active'); // Re-open full cart after closing online payment modal
                    }
                });
            }

            if (onlinePaymentForm) { // Use the new form ID
                onlinePaymentForm.addEventListener('submit', async function(e) {
                    e.preventDefault();

                    const paymentName = paymentNameInput.value.trim();
                    const accountMobileNumber = accountMobileNumberInput.value.trim();
                    const paymentEmail = paymentEmailInput.value.trim();
                    const paymentPhoto = paymentPhotoInput.files[0];

                    if (!paymentName || !accountMobileNumber || !paymentEmail) {
                        showMessageBox('Input Required', 'Please fill in all required payment details (Name, Account/Mobile Number, Email).');
                        return;
                    }
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentEmail)) {
                        showMessageBox('Invalid Email', 'Please enter a valid email address for confirmation.');
                        return;
                    }
                    if (!paymentPhoto) {
                        showMessageBox('Payment Proof Required', 'Please upload a screenshot of your payment for verification.');
                        return;
                    }

                    const reader = new FileReader();
                    reader.readAsDataURL(paymentPhoto);
                    reader.onloadend = async function() {
                        const base64Image = reader.result;

                        // Store payment info in global variable and local storage
                        onlinePaymentInfo = {
                            name: paymentName,
                            accountMobileNumber: accountMobileNumber,
                            email: paymentEmail,
                            screenshot: base64Image
                        };
                        saveToLocalStorage('onlinePaymentInfo', onlinePaymentInfo);

                        showMessageBox('Payment Details Saved!', 'Your online payment details have been saved. You can now proceed to checkout to finalize your order.', () => {
                            onlinePaymentForm.reset(); // Reset the form fields
                            onlinePaymentModalOverlay.classList.remove('active'); // Close online payment modal
                            document.body.style.overflow = '';
                            fullCartOverlay.classList.add('active'); // Re-open full cart
                        });
                    };
                    reader.onerror = function(error) {
                        showMessageBox('File Read Error', 'Could not read the payment proof file. Please try again.');
                        console.error('FileReader error:', error);
                    };
                });
            }


            function updateCartTotal() {
                const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2);
                document.getElementById('fullCartSubtotal').textContent = subtotal.toFixed(2);
                document.getElementById('fullCartTotal').textContent = subtotal.toFixed(2);
            }

            function renderCartItems() {
                const cartItemsContainer = document.getElementById('cartItems');
                cartItemsContainer.innerHTML = '';
                if (cart.length === 0) {
                    cartItemsContainer.innerHTML = '<p id="emptyCartMessage">Your cart is empty.</p>';
                } else {
                    cart.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('cart-item');
                        itemDiv.innerHTML = `
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                            <div class="cart-item-details">
                                <h4>${item.name}</h4>
                                <p>Color: ${item.color}</p>
                                <p>Size: ${item.size}</p>
                                <p>Qty: ${item.quantity}</p>
                            </div>
                            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                            <button class="cart-item-remove" data-item-id="${item.id}">&times;</button>
                        `;
                        cartItemsContainer.appendChild(itemDiv);
                    });
                    cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(button => {
                        button.addEventListener('click', function() {
                            const itemIdToRemove = this.dataset.itemId;
                            removeFromCart(itemIdToRemove);
                        });
                    });
                }
                updateCartTotal();
            }

            function removeFromCart(itemId) {
                cart = cart.filter(item => item.id !== itemId);
                renderCartItems();
                renderFullCartItems();
            }

            function renderFullCartItems() {
                const fullCartItemsContainer = document.getElementById('fullCartItems');
                fullCartItemsContainer.innerHTML = '';

                if (cart.length === 0) {
                    fullCartItemsContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Your cart is empty.</p>';
                } else {
                    cart.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('full-cart-item');
                        itemDiv.innerHTML = `
                            <img src="${item.image}" alt="${item.name}" class="full-cart-item-image">
                            <div class="full-cart-item-details">
                                <h4>${item.name}</h4>
                                <p>Color: ${item.color}</p>
                                <p>Size: ${item.size}</p>
                                <div class="full-cart-item-quantity-control">
                                    <button class="decrease-quantity-full" data-item-id="${item.id}">-</button>
                                    <input type="number" value="${item.quantity}" min="1" readonly>
                                    <button class="increase-quantity-full" data-item-id="${item.id}">+</button>
                                </div>
                            </div>
                            <div class="full-cart-item-price-remove">
                                <span class="full-cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                                <button class="full-cart-item-remove" data-item-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        `;
                        fullCartItemsContainer.appendChild(itemDiv);
                    });

                    fullCartItemsContainer.querySelectorAll('.decrease-quantity-full').forEach(button => {
                        button.addEventListener('click', function() {
                            const itemId = this.dataset.itemId;
                            updateItemQuantity(itemId, -1);
                        });
                    });
                    fullCartItemsContainer.querySelectorAll('.increase-quantity-full').forEach(button => {
                        button.addEventListener('click', function() {
                            const itemId = this.dataset.itemId;
                            updateItemQuantity(itemId, 1);
                        });
                    });
                    fullCartItemsContainer.querySelectorAll('.full-cart-item-remove').forEach(button => {
                        button.addEventListener('click', function() {
                            const itemId = this.dataset.itemId;
                            removeFromCart(itemId);
                        });
                    });
                }
                updateCartTotal();
            }

            function updateItemQuantity(itemId, change) {
                const itemIndex = cart.findIndex(item => item.id === itemId);
                if (itemIndex > -1) {
                    cart[itemIndex].quantity += change;
                    if (cart[itemIndex].quantity <= 0) {
                        removeFromCart(itemId);
                    } else {
                        renderFullCartItems();
                        renderCartItems();
                    }
                }
            }

            document.querySelectorAll('.accordion-title').forEach(title => {
                title.addEventListener('click', function() {
                    const parent = this.closest('.accordion-item');
                    parent.classList.toggle('active');
                });
            });

            if (productImagesContainer) {
                productImagesContainer.addEventListener('click', function(event) {
                    if (event.target.tagName === 'IMG') {
                        zoomedImage.src = event.target.src;
                        imageModalOverlay.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            }

            if (closeImageModal) {
                closeImageModal.addEventListener('click', function() {
                    imageModalOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }

            if (imageModalOverlay) {
                imageModalOverlay.addEventListener('click', function(event) {
                    if (event.target === imageModalOverlay) {
                        imageModalOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }

            if (document.getElementById('checkoutButton')) {
                document.getElementById('checkoutButton').addEventListener('click', function() {
                    fullCartOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    renderFullCartItems();
                });
            }

            // Carousel auto-scroll and navigation for Product Listing Page
            const exploreLeftBtn1 = document.getElementById('exploreLeftBtn1');
            const exploreRightBtn1 = document.getElementById('exploreRightBtn1');
            const exploreLeftBtn2 = document.getElementById('exploreLeftBtn2');
            const exploreRightBtn2 = document.getElementById('exploreRightBtn2');

            let scrollInterval1;
            let scrollInterval2;
            const scrollAmount = 250 + 25; // Card width (250px) + gap (25px)

            function startAutoScroll(gridElement, intervalId) {
                clearInterval(intervalId); // Clear any existing interval
                intervalId = setInterval(() => {
                    if (gridElement.scrollLeft + gridElement.clientWidth >= gridElement.scrollWidth) {
                        gridElement.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        gridElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }
                }, 3000);
                return intervalId;
            }

            function stopAutoScroll(intervalId) {
                clearInterval(intervalId);
            }

            function renderProducts(searchTerm = '') {
                const filteredProducts = Object.keys(products).filter(key => {
                    const product = products[key];
                    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
                });

                exploreProductGrid1.innerHTML = '';
                exploreProductGrid2.innerHTML = '';

                if (filteredProducts.length === 0) {
                    noSearchResultsMessage.style.display = 'block';
                    menCollectionSection.style.display = 'none';
                    moreCollectionSection.style.display = 'none';
                    stopAutoScroll(scrollInterval1);
                    stopAutoScroll(scrollInterval2);
                } else {
                    noSearchResultsMessage.style.display = 'none';
                    menCollectionSection.style.display = 'block';
                    moreCollectionSection.style.display = 'block';

                    // Distribute filtered products into the two carousels
                    filteredProducts.forEach((productId, index) => {
                        const product = products[productId];
                        const productCard = document.createElement('div');
                        productCard.classList.add('carousel-product-card');
                        productCard.dataset.productId = productId;

                        let priceHtml = `<span>$${product.price.toFixed(2)}</span>`;
                        if (product.originalPrice) {
                            priceHtml = `<span class="original-price">$${product.originalPrice.toFixed(2)}</span> <span class="sale-price">$${product.price.toFixed(2)}</span>`;
                        }

                        let badgeHtml = '';
                        if (product.badge) {
                            badgeHtml = `<span class="badge">${product.badge}</span>`;
                        }

                        productCard.innerHTML = `
                            ${badgeHtml}
                            <div class="image-container">
                                <img class="primary-image" src="${product.images[0]}" alt="${product.name}">
                                <img class="hover-image" src="${product.images[1] || product.images[0]}" alt="${product.name} Hover">
                            </div>
                            <div class="info">
                                <h3>${product.name}</h3>
                                <div class="prices">
                                    ${priceHtml}
                                </div>
                            </div>
                        `;

                        // Add click listener to the product card
                        productCard.addEventListener('click', function() {
                            loadProductDetails(this.dataset.productId);
                            showPage('productDetailPage');
                        });

                        // Distribute products between the two grids
                        if (index % 2 === 0) {
                            exploreProductGrid1.appendChild(productCard);
                        } else {
                            exploreProductGrid2.appendChild(productCard);
                        }
                    });

                    // Re-enable/start auto-scroll if search term is empty
                    if (searchTerm === '') {
                        scrollInterval1 = startAutoScroll(exploreProductGrid1, scrollInterval1);
                        scrollInterval2 = startAutoScroll(exploreProductGrid2, scrollInterval2);
                    } else {
                        stopAutoScroll(scrollInterval1);
                        stopAutoScroll(scrollInterval2);
                    }
                }
            }

            // Initial render of products
            renderProducts();

            // Event listener for search input
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    renderProducts(this.value);
                });
            }

            // Carousel navigation buttons logic
            if (exploreLeftBtn1) {
                exploreLeftBtn1.addEventListener('click', function() {
                    stopAutoScroll(scrollInterval1);
                    exploreProductGrid1.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                    if (searchInput.value === '') { // Only restart if not actively searching
                        scrollInterval1 = startAutoScroll(exploreProductGrid1, scrollInterval1);
                    }
                });
            }

            if (exploreRightBtn1) {
                exploreRightBtn1.addEventListener('click', function() {
                    stopAutoScroll(scrollInterval1);
                    exploreProductGrid1.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    if (searchInput.value === '') { // Only restart if not actively searching
                        scrollInterval1 = startAutoScroll(exploreProductGrid1, scrollInterval1);
                    }
                });
            }

            if (exploreLeftBtn2) {
                exploreLeftBtn2.addEventListener('click', function() {
                    stopAutoScroll(scrollInterval2);
                    exploreProductGrid2.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                    if (searchInput.value === '') { // Only restart if not actively searching
                        scrollInterval2 = startAutoScroll(exploreProductGrid2, scrollInterval2);
                    }
                });
            }

            if (exploreRightBtn2) {
                exploreRightBtn2.addEventListener('click', function() {
                    stopAutoScroll(scrollInterval2);
                    exploreProductGrid2.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    if (searchInput.value === '') { // Only restart if not actively searching
                        scrollInterval2 = startAutoScroll(exploreProductGrid2, scrollInterval2);
                    }
                });
            }

            // Pause/Resume auto-scroll on mouse enter/leave for carousels
            if (exploreProductGrid1) {
                exploreProductGrid1.addEventListener('mouseenter', () => stopAutoScroll(scrollInterval1));
                exploreProductGrid1.addEventListener('mouseleave', () => {
                    if (searchInput.value === '') { // Only restart if not actively searching
                        scrollInterval1 = startAutoScroll(exploreProductGrid1, scrollInterval1);
                    }
                });
            }
            if (exploreProductGrid2) {
                exploreProductGrid2.addEventListener('mouseenter', () => stopAutoScroll(scrollInterval2));
                exploreProductGrid2.addEventListener('mouseleave', () => {
                    if (searchInput.value === '') { // Only restart if not actively searching
                        scrollInterval2 = startAutoScroll(exploreProductGrid2, scrollInterval2);
                    }
                });
            }


            function loadProductDetails(productId) {
                const product = products[productId];

                if (product) {
                    productDetailPage.dataset.currentProductId = productId; // Store current product ID
                    productNameElement.textContent = product.name;
                    productSkuElement.textContent = `SKU: ${product.sku}`;
                    if (product.originalPrice) {
                        productPriceElement.innerHTML = `<span style="text-decoration: line-through; color: #888; font-size: 1.4rem;">$${product.originalPrice.toFixed(2)}</span> <span style="color: #d9534f;">$${product.price.toFixed(2)}</span>`;
                    } else {
                        productPriceElement.textContent = `$${product.price.toFixed(2)}`;
                    }
                    productDescriptionElement.textContent = product.description;

                    productImagesContainer.innerHTML = '';
                    product.images.forEach(imageSrc => {
                        const img = document.createElement('img');
                        img.src = imageSrc;
                        img.alt = product.name;
                        productImagesContainer.appendChild(img);
                    });

                    colorOptionsContainer.innerHTML = '';
                    product.colors.forEach((color, index) => {
                        const swatch = document.createElement('div');
                        swatch.classList.add('color-swatch');
                        swatch.dataset.color = color.name;
                        swatch.style.backgroundColor = color.hex;
                        if (index === 0) {
                            swatch.classList.add('selected');
                        }
                        swatch.addEventListener('click', () => {
                            document.querySelectorAll('#productDetailPage .color-swatch').forEach(s => s.classList.remove('selected'));
                            swatch.classList.add('selected');
                        });
                        colorOptionsContainer.appendChild(swatch);
                    });

                    // Populate custom size dropdown
                    const selectSelected = sizeSelect.querySelector('.select-selected');
                    const selectItems = sizeSelect.querySelector('.select-items');
                    selectItems.innerHTML = ''; // Clear existing items

                    selectSelected.textContent = "Select Size"; // Reset selected text
                    selectSelected.dataset.value = ""; // Reset selected value

                    product.sizes.forEach(size => {
                        const optionDiv = document.createElement('div');
                        optionDiv.textContent = size;
                        optionDiv.dataset.value = size; // Store the actual value
                        optionDiv.addEventListener('click', function() {
                            selectSelected.textContent = this.textContent;
                            selectSelected.dataset.value = this.dataset.value;
                            selectSelected.classList.remove('select-arrow-active');
                            selectItems.classList.add('select-hide');
                            // Remove "same-as-selected" from all and add to the clicked one
                            const currentSelected = selectItems.querySelector('.same-as-selected');
                            if (currentSelected) {
                                currentSelected.classList.remove('same-as-selected');
                            }
                            this.classList.add('same-as-selected');
                        });
                        selectItems.appendChild(optionDiv);
                    });

                    // Toggle custom select dropdown
                    selectSelected.addEventListener('click', function(e) {
                        e.stopPropagation(); // Prevent document click from closing immediately
                        closeAllSelect(this); // Close other open selects
                        this.classList.toggle('select-arrow-active');
                        selectItems.classList.toggle('select-hide');
                    });

                    // Close custom select when clicking outside
                    document.addEventListener('click', closeAllSelect);

                    function closeAllSelect(elmnt) {
                        const arrNo = [];
                        const x = document.getElementsByClassName("select-items");
                        const y = document.getElementsByClassName("select-selected");
                        for (let i = 0; i < y.length; i++) {
                            if (elmnt == y[i]) {
                                arrNo.push(i)
                            } else {
                                y[i].classList.remove("select-arrow-active");
                            }
                        }
                        for (let i = 0; i < x.length; i++) {
                            if (arrNo.indexOf(i)) {
                                x[i].classList.add("select-hide");
                            }
                        }
                    }

                    document.querySelector('#productDetailPage .buttons').style.display = 'flex'; // Ensure buttons are visible
                } else {
                    productNameElement.textContent = "Product Not Found";
                    productSkuElement.textContent = "";
                    productPriceElement.textContent = "";
                    productDescriptionElement.textContent = "The requested product could not be found.";
                    productImagesContainer.innerHTML = '';
                    colorOptionsContainer.innerHTML = '';
                    sizeSelect.querySelector('.select-selected').textContent = "N/A";
                    sizeSelect.querySelector('.select-selected').dataset.value = "";
                    sizeSelect.querySelector('.select-items').innerHTML = '';
                    document.querySelector('#productDetailPage .buttons').style.display = 'none';
                }
            }

            // Load saved data when the DOM is ready
            loadFromLocalStorage();
            updateCartTotal(); // Initialize cart total on page load
        });
    