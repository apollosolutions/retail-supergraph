# Loyalty Programs

Loyalty programs are a part of most retail graphs. The most common place to add this section of schema is onto the user, more specifically the viewer pattern. This allows for a very ergonmic way of getting the users rewards. 

The following is a basic addition to the users schema to add a loyalty program:

```graphql
type User @key(fields: "id") {
  id: ID!

  loyalty:LoyaltyProgram
}

type LoyaltyProgram {
    activeDiscounts: [Discount]
    joinedDate: Date
    points: Int
}

union Discount = FeeDiscount | Credit

type FeeDiscount {
    feeId: ID!
    name: String
    discount: float
}

type Credit {
    creditId: ID!
    name: String!
    description: String
    value: Float!
}
```

Lets walk though a few examples that this schema enables.

### Anniversary gifts

A common way to say thank you to customers is giving some small discount or credit to a customer when its their anniversary with your application. An easy way to do this is request the `joinedDate` on the user. Something like:

```GraphqL
query getMyJoinDate {
  viewer {
    loyalty {
      joinedDate
    }
  }
}
```

This will allow you to quickly check the date against the current date on the device to display a banner or something similar.

### Checkout discounts

Its normal to have some type of credits or discounted fees based on the loyalty program. The following will fetch all the credits for a given user:

```GraphqL
query getCredits {
  viewer {
    loyalty {
      activeDiscounts {
        __typename
        ... on Credit {
          creditId
          name
          description
          value
        }
      }
    }
  }
}
```

This small query allows us to show the user at checkout what credits they have access to.  

Something similar can be done for fees. If a fee is 10% and a users has a 2% discount to that fee, we could easily grab that with almost the exact same query.

```grpahql
query getFeeDiscount {
  viewer {
    loyalty {
      activeDiscounts {
        __typename
        ... on FeeDiscount {
          feeId
          name
          discount
        }
      }
    }
  }
}
```

These two ideas could happen in the same query. 