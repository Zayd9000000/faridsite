const http = require('http');

const mockData = {
  regions: {
    regions: [
      {
        id: "reg_01",
        name: "United States",
        currency_code: "usd",
        countries: [
          { iso_2: "us", name: "United States" }
        ],
        tax_rate: 0,
        payment_providers: [],
        fulfillment_providers: []
      }
    ]
  },
  collections: {
    collections: [
      {
        id: "pcol_01",
        handle: "featured",
        title: "Featured Products"
      }
    ]
  },
  products: {
    products: [
      {
        id: "prod_01",
        title: "Sample Product",
        handle: "sample-product",
        description: "This is a sample product",
        thumbnail: null,
        variants: [
          {
            id: "variant_01",
            title: "Default",
            calculated_price: {
              calculated_amount: 1999,
              currency_code: "usd"
            }
          }
        ]
      }
    ]
  },
  customer: {
    customer: null
  },
  cart: {
    cart: null
  }
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-publishable-api-key, authorization');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log(`Mock server received: ${req.method} ${req.url}`);

  // Handle different endpoints
  if (req.url.includes('/store/regions')) {
    res.writeHead(200);
    res.end(JSON.stringify(mockData.regions));
  } else if (req.url.includes('/store/collections')) {
    res.writeHead(200);
    res.end(JSON.stringify(mockData.collections));
  } else if (req.url.includes('/store/products')) {
    res.writeHead(200);
    res.end(JSON.stringify(mockData.products));
  } else if (req.url.includes('/store/customers/me')) {
    res.writeHead(200);
    res.end(JSON.stringify(mockData.customer));
  } else if (req.url.includes('/store/carts')) {
    res.writeHead(200);
    res.end(JSON.stringify(mockData.cart));
  } else {
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Mock endpoint" }));
  }
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Mock Medusa backend running on http://localhost:${PORT}`);
  console.log('This is a temporary mock server to get your storefront running.');
  console.log('For production, you should set up a real Medusa backend.');
});