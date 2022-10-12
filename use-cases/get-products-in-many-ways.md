## Showing a product in multiple ways

For the code examples, see the [products subgraph](../subgraphs/products).

The first thing users see on a retail application is a home page. Home pages on most retail stores are rows and/or columns of products that users can view.

A sample query that could power a row in the home screen is the following:

query:

```graphql
query HomeScreenRow($searchInput: ProductSearchInput) {
  searchProducts(searchInput: $searchInput) {
    id
    title
    description
  }
}
```

with variables of:

```JSON
{
  "searchInput": {
    "titleStartsWith": "Supreme"
  }
}
```

response:

```JSON
{
  "data": {
    "searchProducts": [
      {
        "id": "product:2",
        "title": "Supreme x Tiffany & Co. Box Logo Tee",
        "mediaUrl": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQWDHD3SSS98UAVKODaql7nrDTopfL4tcTnEltW8Yqy4hyDu4i5b70Wb3Y8-wACJIo5g-ZdRULPQKUmt7JfwiaSdgiOBz4pvU_YelKHUI4nhoXmMJPeh_tyWQ"
      }
    ]
  }
}
```

This simple approach gives us the least amount of data needed to render a row on the home page and give a link to a product page. With the id you can link to a product page with a relative URL of something like `/p/{res.data.searchProducts[0].id}` or, in this case `/p/product%3A2` ("%3A" is the encoded value for ":").

When clicked, we would go to a PDP (product details page). Using the id in the URL, we can then make a query like the following to supply all the bulk of the PDPs information:

query:

```graphql
query ProductDetailsPage($productId: String) {
  product(id: $productId) {
    title
    description
    mediaUrl
    variants {
      colorway
      price
      size
    }
  }
}
```

with variables of:

```JSON
{
  "productId": "product:2"
}
```

response:

```JSON
{
  "data": {
    "product": {
      "title": "Supreme x Tiffany & Co. Box Logo Tee",
      "description": "A classic Supreme vbox t-shirt in the signature Tiffany blue.",
      "mediaUrl": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQWDHD3SSS98UAVKODaql7nrDTopfL4tcTnEltW8Yqy4hyDu4i5b70Wb3Y8-wACJIo5g-ZdRULPQKUmt7JfwiaSdgiOBz4pvU_YelKHUI4nhoXmMJPeh_tyWQ",
      "variants": [
        {
          "colorway": "Tiffany blue",
          "price": 600.25,
          "size": "S"
        },
        {
          "colorway": "Tiffany blue",
          "price": 600.25,
          "size": "M"
        },
        {
          "colorway": "Tiffany blue",
          "price": 600.25,
          "size": "L"
        },
        {
          "colorway": "Tiffany blue",
          "price": 600.25,
          "size": "XL"
        },
        {
          "colorway": "Tiffany blue",
          "price": 600.25,
          "size": "XS"
        }
      ]
    }
  }
}
```

This data is enough to render the page with a description, images, what sizes are available, and the price of each size. One of the great things about GraphQL is what the schema empowers clients to do. With no changes to the schema, we can display some of this shipping information and if it's in stock.

To get the shipping information, we can use the following:

query:

```graphql
query GetVariantShippingInformation($variantId: String) {
  variant(id: $variantId) {
    dimensions
    weight
  }
}
```

variables:

```JSON
{
  "variantId": "variant:4"
}
```

results:

```JSON
{
  "data": {
    "variant": {
      "dimensions": "36inx36inx1in",
      "weight": 30
    }
  }
}
```

This gives us the dimensions for the size small shirt. The following will tell us if there are any in stock and how many:

```graphql
query GetVariantInventoryInformation($variantId: String) {
  variant(id: $variantId) {
    inventory {
      inStock
      inventory
    }
  }
}
```

variables:

```JSON
{
  "variantId": "variant:4"
}
```

results:

```JSON
{
  "data": {
    "variant": {
      "inventory": {
        "inStock": true,
        "inventory": 2
      }
    }
  }
}
```

As you can see from the examples, the schema in this graph can answer multiple questions and support many different iterations of search and details pages without the service teams needing to create unique APIs for each.
