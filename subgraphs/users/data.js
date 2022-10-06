export const users = [
  {
    id: "user:1",
    username: "User One",
    paymentMethods: [
      {
        id: "paymentMethod:1",
        name: "User One's first credit card",
        type: "CREDIT_CARD",
      },
      {
        id: "paymentMethod:2",
        name: "User One's second credit card",
        type: "CREDIT_CARD",
      },
    ],
    cart: {
      items: [{ id: "variant:1" }, { id: "variant:2" }],
      subtotal: 1200.5,
    },
    orders: [{ id: "order:1" }, { id: "order:2" }],
    shippingAddress: "123 Main St",
  },
  {
    id: "user:2",
    username: "User Two",
    paymentMethods: [
      {
        id: "paymentMethod:3",
        name: "User Two's first debit card",
        type: "DEBIT_CARD",
      },
    ],
    cart: {
      items: [{ id: "variant:1" }],
      subtotal: 600.25,
    },
    orders: [{ id: "order:3" }],
    shippingAddress: "123 Main St",
  },
  {
    id: "user:3",
    username: "User Three",
    paymentMethods: [
      {
        id: "paymentMethod:4",
        name: "User Three's first debit card",
        type: "DEBIT_CARD",
      },
      {
        id: "paymentMethod:5",
        name: "User Three's first bank account",
        type: "BANK_ACCOUNT",
      },
    ],
    cart: {},
    orders: [{ id: "order:4" }, { id: "order:5" }, { id: "order:6" }],
    shippingAddress: "123 Main St",
  },
];
