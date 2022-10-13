# Time Gating Products

There are two different places to put in a gate for displaying products that are released at a specific time.

- The backend service behind GraphQL
- The GraphQL resolvers

These two places have a similar way to get the way to get the information in is roughly the same. There can be an implicit or explicit way to handle this though the graph.

If you are heading down the implicit way of doing filtering out products then there are no schema additions needed. The logic for determining the list of product ids to show will be returned to us from the domain service and that team will be responsilbe for filtering out any invalid or un-purchasable items. 

If we want to write the logic ourselves in the GraphQL layer it will require that your data source starts returning the `releaseDate` for all products, and based off the current time, either filter out the product or not. It is recommended that release dates be available to all users globally at the same time so using UTC time on both the `releaseDate` and server code make the logic much easier. 

There may be some cases where you want to show unreleased products or a countdown to their release in the UI. In this case you can return the release date as part of the product info but have separate logic in the cart and checkout flow that also disables adding unreleased products.

A general resolver may look something like:

```typescript
import { productAPI } from "../APIs";

async function getProduct(productId: String): Product {
    return productAPI.getProductById(productId);
}
```

With the additions it should look something like the following:

```typescript
import { productAPI } from "../APIs";

async function getProduct(productId: String): Product {
    return productAPI.getProductById(productId).then(product => {
        // Date comparison is tricky. DO NOT USE THIS IN PRODUCTION. For example only.
        
        if (product.releaseDate) {
            const now = Date.now();
            const release = new Date(product.releaseDate).getTime();
            if (release > now) {
                return null;
            }
        }
        
        return product;
    });
}
```

As mentioned above, this logic could go into either the resolver or the services behind the graph.

### Impacts of Gating Products

With adding the functionality to have gated releases of products there are a few things that we need to keep in mind. Mainly the potential increase in errors, the implications on linking and the implementations on lists.

- The update to remove products that are not released yet could cause a potential null value. This would cause problems and errors when coupled with non-null fields. So keep in mind that this filtering could lead to an increase in errors
- When linking entities from multiple subgraphs, we could run into similar problems. The two buckets of problems we have are: extending an entity that is expired but still returning data; and leaking IDs that should not be removed. Both of these problems can be resolved by checking to see if a product is released before returning the ID. If an ID was returned then partial data could be returned when it should not be. This is also how IDs can leak, if one subgraph returns an ID and another returns null, the ID will still be returned by the Router.

Query:

```GraphQL
query getProduct {
  product(id: "unreleased-product:1") {
    id
    releaseDate
    variants {
      id
    }
  }
}
```

Response:

```JSON
{
    "data":{
        "product": {
            "id":"unreleased-product:1",
            "releaseDate": null,
            "variants": null
        }
    }
}
```

or

```JSON
{
  "data": {
    "product": null
  },
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Product.id.",
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "stacktrace": [
          "GraphQLError: Cannot return null for non-nullable field Product.id."
        ],
        "serviceName": "products"
      }
    }
  ]
}
```

\*\*The difference between the two is depended on if a non-null field is returned as null.

- The other note to take into account is the effect on lists. The same thing that applies above about linking entities together applies here. The one addition is some graphs draw a line between an empty list and null. This could cause problems when it comes to empty lists, by removing a non released item from the list potentially making it an empty list.

