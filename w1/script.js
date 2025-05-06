// Sample product data
const products = [ 
  {
      image: "image.png",
      name: "Wireless Headphones",
      price: 7999,
      description: "Noise-cancelling over-ear headphones."
  },
  {
      image: "image.png",
      name: "Smartwatch",
      price: 12999,
      description: "Fitness tracking smartwatch."
  },
  {
      image: "/api/placeholder/200/200",
      name: "Gaming Mouse",
      price: 2499,
      description: "Ergonomic gaming mouse."
  },
  {
      image: "/api/placeholder/200/200",
      name: "Laptop Stand",
      price: 1999,
      description: "Adjustable aluminium stand."
  },
  {
      image: "/api/placeholder/200/200",
      name: "Bluetooth Speaker",
      price: 3999,
      description: "Portable waterproof speaker."
  },
  {
      image: "/api/placeholder/200/200",
      name: "Mechanical Keyboard",
      price: 5499,
      description: "RGB backlit mechanical keyboard."
  },
  {
      image: "/api/placeholder/200/200",
      name: "External SSD",
      price: 8999,
      description: "1TB high-speed external SSD."
  },
  {
      image: "/api/placeholder/200/200",
      name: "Webcam",
      price: 4999,
      description: "1080p HD webcam with microphone."
  },
  {
      image: "/api/placeholder/200/200",
      name: "USB-C Hub",
      price: 2999,
      description: "7-in-1 USB-C dock with HDMI."
  },
  {
      image: "/api/placeholder/200/200",
      name: "Wireless Charger",
      price: 1499,
      description: "Qi-compatible wireless charging pad."
  },
  {
      image: "/api/placeholder/200/200",
      name: "Gaming Headset",
      price: 6499,
      description: "Surround sound gaming headset with mic."
  },
  {
      image: "/api/placeholder/200/200",
      name: "Graphics Tablet",
      price: 9999,
      description: "Digital drawing tablet for artists."
  },
  {
      image: "/api/placeholder/200/200",
      name: "Power Bank",
      price: 3499,
      description: "20000mAh fast-charging power bank."
  },
  {
      image: "/api/placeholder/200/200",
      name: "Portable Monitor",
      price: 14999,
      description: "15.6-inch FHD portable monitor."
  },
  {
      image: "/api/placeholder/200/200",
      name: "Wireless Earbuds",
      price: 5999,
      description: "True wireless earbuds with charging case."
  }
];

// Pagination variables
const productsPerPage = 10;
let currentPage = 1;
const totalPages = Math.ceil(products.length / productsPerPage);

// DOM elements
const productTableBody = document.getElementById('productTableBody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const paginationInfo = document.getElementById('paginationInfo');

// Format currency to INR
function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

// Display products for the current page
function displayProducts() {
  // Clear the current table
  productTableBody.innerHTML = '';
  
  // Calculate start and end indices for pagination
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, products.length);
  
  // Loop through products for the current page
  for (let i = startIndex; i < endIndex; i++) {
      const product = products[i];
      
      // Create table row
      const row = document.createElement('tr');
      
      // Add product data
      row.innerHTML = `
          <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
          <td>${product.name}</td>
          <td class="price">${formatPrice(product.price)}</td>
          <td>${product.description}</td>
      `;
      
      // Append row to table body
      productTableBody.appendChild(row);
  }
  
  // Update pagination info
  paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  
  // Update button states
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Event listeners for pagination buttons
prevBtn.addEventListener('click', function() {
  if (currentPage > 1) {
      currentPage--;
      displayProducts();
  }
});

nextBtn.addEventListener('click', function() {
  if (currentPage < totalPages) {
      currentPage++;
      displayProducts();
  }
});

// Initial display
displayProducts();