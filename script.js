// Array to store products
let products = [];
let cart = [];


function createProduct() {
    const productName = document.getElementById('productName').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('imageInput');
    const imageFile = imageInput.files[0];
    
    if (!productName || !price || !imageFile) {
        alert("Please fill out all fields and select an image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result;
        const product = {
            name: productName,
            price: parseFloat(price),
            image: imageUrl
        };
        products.push(product);
        displayProducts();
        clearForm(); // Clear the form after creating a product
    };
    
    reader.readAsDataURL(imageFile);
}

function displayProducts() {
    const productDashboard = document.getElementById('productDashboard');
    productDashboard.innerHTML = '<h4>Product Dashboard</h4>'; // Reset product list
    
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <input type="checkbox" id="checkbox-${index}" />
            <img src="${product.image}" alt="${product.name}" width="100" height="100">
            <p>${product.name}</p>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
            
            <button onclick="removeProduct(${index})">Remove</button>
        `;
        productDashboard.appendChild(productDiv);
    });
}


function removeProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

function addToCart(index) {
    const checkbox = document.getElementById(`checkbox-${index}`);
    if (checkbox.checked) {
        const selectedProduct = products[index];
        cart.push(selectedProduct);
        displayCart();
        checkbox.checked = false; // Reset checkbox after adding to cart
    } else {
        alert("Please select the product by checking the box.");
    }
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; // Reset cart list
    
    cart.forEach((item, index) => {
        const cartDiv = document.createElement('div');
        cartDiv.classList.add('cart-item');
        cartDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50" height="50">
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartDiv);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function removeAllFromCart() {
    cart = [];
    displayCart();
}

function calculateFinalPrice() {
    let totalPrice = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById('finalPrice').textContent = totalPrice.toFixed(2);
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('price').value = '';
    document.getElementById('imageInput').value = '';
}
