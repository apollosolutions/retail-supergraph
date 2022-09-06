export const users = [
  {
    id: '1',
    username: 'user 1',
    paymentMethods: [
      {id: '1', name: "user 1's first credit car", type: 'CREDIT_CARD'},
      {id: '2', name: "user 1's second credit car", type: 'CREDIT_CARD'},
    ],
    cart: {
      items: [{id: 1}, {id: 1}],
      subtotal: 1200.5,
    },
    orders: [{id: 1}, {id: 2}],
  },
  {
    id: '2',
    username: 'user 2',
    paymentMethods: [
      {id: '3', name: "user 2's first debit car", type: 'DEBIT_CARD'},
    ],
    cart: {
      items: [{id: 1}],
      subtotal: 600.25,
    },
    orders: [{id: 3}],
  },
  {
    id: '3',
    username: 'user 2',
    paymentMethods: [
      {id: '4', name: "user 3's first debit car", type: 'DEBIT_CARD'},
      {id: '5', name: "user 3's first bank account", type: 'BANK_ACCOUNT'},
    ],
    cart: {},
    orders: [{id: 4}, {id: 5}, {id: 6}],
  },
];
