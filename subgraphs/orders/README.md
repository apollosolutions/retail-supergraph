# Orders Subgraph

This hold the logic and information about Orders of variants. 

Additions could be, but are not limited to:

- Where is the order (not shipped yet, in transit, deliver, etc)
- Linking orders and payment
- Metadata around purchase 
  - Seller and buyer information
  - Shipping links to 3rd parties (UPS, FEDEX, DHL, etc.)
  

## gotchas

### Why is my viewer empty?!

This is based on the header `"x-user-id"`. Pass that header with a number between 1 and 3.

