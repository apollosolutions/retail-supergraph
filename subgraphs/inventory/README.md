# Inventory Subgraph

This hold the logic and information about what variants are in stock and the inventory levels of variants.

Additions could be, but are not limited to:

- Square footage of space taken up in warehouse
- Location in warehouse
- Location of warehouse
- Order for more pending
- Back order information    
  - Estimated time of shipment
  - Is my item included in this shipment

## gotchas

### Why is my viewer empty?!

This is based on the header `"x-user-id"`. Pass that header with a number between 1 and 3.

