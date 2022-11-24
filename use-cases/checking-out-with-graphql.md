## Working with a Cart

For the code examples, see the [users subgraph](../subgraphs/users) and [checkout subgraph](../subgraphs/checkout).

### Checking out with GraphQL

A large part of working in the retail domain is buying something. Many retail sites implement the concept of a cart which can hold products in a temporary location to purchase later, and allow you to purchase more that on item at once.
Once you have selected the products you want, you will then need to pay for it. The complexity of implementing a purchasing system tends to land outside the schema and is implemented by calling other services to process credit cards, send invoice orders to warehouses, and start creating shipping labels.

GraphQL can help our clients by giving them focused operations to perform, so they don't have to all implement the logic to call the various services and can instead just focus on creating the best UX flow.

The schema we have for a viewers cart and payments right now looks something like the following:

```graphql
type Query {
  viewer: User
}

type User @key(fields: "id") {
  id: ID!

  """
  Saved payment methods that can be used to submit orders
  """
  paymentMethods: [PaymentMethod]

  """
  The user's active cart session. Once the cart items have been purchases, they transition to an Order
  """
  cart: Cart
}

"""
An user's saved cart session. Only one cart can be active at a time
"""
type Cart {
  """
  Items saved in the cart session
  """
  items: [Variant]

  """
  The current total of all the items in the cart, before taxes and shipping
  """
  subtotal: Float
}

"""
A saved payment option for an user
"""
type PaymentMethod {
  id: ID!
  name: String
  description: String
  type: PaymentType!
}

"""
A fix set of payment types that we accept
"""
enum PaymentType {
  CREDIT_CARD
  DEBIT_CARD
  BANK_ACCOUNT
}
```

This is a great start, and with the flowing few enhancements, we can start describing a basic checkout workflow.

schema additions:

```graphql
type Mutation {
  viewer: ViewerMutaitons
}

type ViewerMutaitons {
  checkout(paymentMethodId: ID!): CheckoutResult
  addVariantToCart(variantId: ID!, quantity: Int = 1): ResultWithMessage
  removeVariantFromCart(variantId: ID!, quantity: Int = 1): ResultWithMessage
}

type ResultWithMessage {
  successful: Boolean
  message: String
}

type CheckoutResult {
  successful: Boolean
  orderID: ID
}
```

Lucky for us, the cart is already set up for a few users. If you look at the schema, the user id is not supplied as a query variable.
That is by design. The user is pulled from a header. In the real world, this would come from your auth provider and be pulled out of a JWT or something similar.
In our case, for this demo, the user id is pulled from the header `x-user-id`. Using the following queries, we are able to fetch what is currently in our cart:

query:

```graphql
query GetCart {
  viewer {
    id
    username
    cart {
      items {
        product {
          title
          description
        }
        inventory {
          inStock
        }
        size
      }
      subtotal
    }
  }
}
```

headers:

```JSON
{
  "x-user-id": "user:2"
}
```

results:

```JSON
{
  "data": {
    "viewer": {
      "id": "user:2",
      "username": "User Two",
      "cart": {
        "items": [
          {
            "price": 600.25,
            "product": {
              "title": "Air Jordan 1 Mid",
              "description": "Air Jordan 1 Mid is a blue, grey and white sneaker from the iconic jordan brand"
            },
            "inventory": {
              "inStock": false
            },
            "size": "10"
          }
        ],
        "subtotal": 600.25
      }
    }
  }
}
```

The following query shows the payment methods for user 2. This query grabs all the necessary data to display the page before hitting the checkout button. Once the checkout button is hit, we will go to a page where we can select our payment method.

query:

```graphql
query GetViewersPaymentMethods {
  viewer {
    paymentMethods {
      name
      description
      type
      id
    }
  }
}
```

headers:

```JSON
{
  "x-user-id": "user:2"
}
```

results:

```JSON
{
  "data": {
    "viewer": {
      "paymentMethods": [
        {
          "name": "User Two's first debit car",
          "description": null,
          "type": "DEBIT_CARD",
          "id": "paymentMethod:3"
        }
      ]
    }
  }
}
```

With this data, we should be able to present the user with all of their payment methods or prompt them to add one. Once a selection is made, we can execute the next mutation to complete the checkout and create an order.

mutation:

```graphql
mutation checkout($paymentMethodId: String!) {
  viewer {
    checkout(paymentMethodId: $paymentMethodId) {
      successful
      orderID
  }
}
```

headers:

```JSON
{
  "x-user-id": "user:2"
}
```

variables:

```JSON
{
  "paymentMethodId": "paymentMethod:3"
}
```

results:

```JSON
{
  "data": {
    "viewer": {
      "checkout": [
        {
          "successful": true,
          "orderID": "order:7"
        }
      ]
    }
  }
}
```

**Note that this mutation can be made but the example server does not store any state, so it just returns a mock response**

This small return gives us enough information to tell the viewer that their checkout request was successful and send them to an order page or give them an "oops something went wrong" error message.

### Adding and removing from cart

Before we check out, we need to set up our cart. This includes adding and removing items to our cart. This should be a small mutation to add or remove something from the cart. The following is an example of adding an item to the cart:

```graphql
mutation addVariantToCart($variantId: String!, $quantity: Int!) {
  viewer {
    addVariantToCart(variantId: $variantId, quantity: $quantity) {
      successful
      message
  }
}
```

headers:

```JSON
{
  "x-user-id": "user:2"
}
```

variables:

```JSON
{
  "variantId": "variant:1",
  "quantity": 1
}
```

results:

```JSON
{
  "data": {
    "viewer": {
      "checkout": [
        {
          "successful": true,
          "message": null
        }
      ]
    }
  }
}
```

This small mutation should give us enough information to display a banner saying the addition happened or what went wrong. If the message was a present, that could indicate something went wrong and show that message in the banner. There is also the option to add more than one of the same variant through the quantity variable. Now that we have added something let's look at how to remove something. In this case, we will cause an error by removing too many items. This would look something like:

mutation:

```graphql
mutation removeVariantFromCart($variantId: String!, $quantity: Int!) {
  viewer {
    removeVariantFromCart(variantId: $variantId, quantity: $quantity) {
      successful
      message
  }
}
```

headers:

```JSON
{
  "x-user-id": "user:2"
}
```

variables:

```JSON
{
  "variantId": "variant:1",
  "quantity": 3
}
```

results:

```JSON
{
  "data": {
    "viewer": {
      "checkout": [
        {
          "successful": false,
          "message": "Removed to many items. Only 1 item was present"
        }
      ]
    }
  }
}
```

As we can see above, a failure state can be returned using the same schema by changing the `successful` field and a message of why.
