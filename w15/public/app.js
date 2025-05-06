document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.getElementById('products');
  
  fetch('/api/products')
      .then(response => response.json())
      .then(products => {
          products.forEach(product => {
              const productCard = document.createElement('div');
              productCard.className = 'product-card';
              
              productCard.innerHTML = `
                  <img src="images/${product.image}" 
                       alt="${product.name}" 
                       class="product-image">
                  <div class="product-info">
                      <h2 class="product-name">${product.name}</h2>
                      <p class="product-price">$${product.price.toFixed(2)}</p>
                      <p class="product-description">${product.description}</p>
                  </div>
              `;
              
              productsContainer.appendChild(productCard);
          });
      })
      .catch(error => {
          console.error('Error fetching products:', error);
          productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
      });
});