const Products = [
  {
    id: "1",
    variants: [0, 1, 2],
    title: "Air Jordan 1 Mid", //String
    description:
      "Air Jordan 1 Mid is a blue, grey and white sneaker from the iconic jordan brand", //String
    mediaUrl:
      "https://sneakernews.com/wp-content/uploads/2022/06/air-jordan-1-mid-university-blue-grey-dx9276-100-6.jpg", //String
  },
  {
    id: "2",
    variants: [3, 4, 5, 6],
    title: "Supreme x Tiffany & Co. Box Logo Tee", //String
    description:
      "A classic Supreme vbox t-shirt in the signature Tiffany blue.", //String
    mediaUrl:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQWDHD3SSS98UAVKODaql7nrDTopfL4tcTnEltW8Yqy4hyDu4i5b70Wb3Y8-wACJIo5g-ZdRULPQKUmt7JfwiaSdgiOBz4pvU_YelKHUI4nhoXmMJPeh_tyWQ", //String
  },
  {
    id: "3",
    variants: [7],
    title: "THE MACKINAC 40MM", //String
    description:
      "Established by Detroit’s historic Bayview Yacht club, the days-long Port Huron to Mackinac Island regatta is one of the longest and most grueling freshwater races in the world.\n\nNamed for this legendary competition, the Shinola Mackinac is our first watch with automatic, single-eye chronograph yacht-timer functionality.\n\nIt’s a precision instrument designed to be passed on for generations—just like the tradition that inspires it.", //String
    mediaUrl:
      "https://shinola-m2.imgix.net/images/Products/20253783-sdt-012455107/S0120253783_F2_MAIN_01.png?h=1500&w=1500&bg=f7f7f7&auto=format,compress&fit=fillmax", //String
  },
];

const Variants = [
  {
    id: "1",
    product: 0, // Product
    colorway: "Red", // String
    price: 600.25, // Float
    size: "10", // String
    dimensions: "12inx10inx6in", // String
  },
  {
    id: "2",
    product: 0, // Product
    colorway: "Green", // String
    price: 20.12, // Float
    size: "11", // String
    dimensions: "12inx10inx6in", // String
  },
  {
    id: "3",
    product: 0, // Product
    colorway: "Gold", // String
    price: 100.0, // Float
    size: "12", // String
    dimensions: "12inx10inx6in", // String
  },
  {
    id: "4",
    product: 1, // Product
    colorway: "Red", // String
    price: 600.25, // Float
    size: "S", // String
    dimensions: "36inx36inx1in", // String
  },
  {
    id: "5",
    product: 1, // Product
    colorway: "Red", // String
    price: 600.25, // Float
    size: "M", // String
    dimensions: "36inx36inx1in", // String
  },
  {
    id: "6",
    product: 1, // Product
    colorway: "Red", // String
    price: 600.25, // Float
    size: "L", // String
    dimensions: "36inx36inx1in", // String
  },
  {
    id: "7",
    product: 1, // Product
    colorway: "Red", // String
    price: 600.25, // Float
    size: "XL", // String
    dimensions: "36inx36inx1in", // String
  },
  {
    id: "8",
    product: 2, // Product
    colorway: "Gold", // String
    price: 3499.99, // Float
    size: "40mm", // String
    dimensions: "8inx8inx8in", // String
  },
];

export const getItems = () => {
  const products = Products.map((p) => {
    const variants = p.variants.map((index) => Variants[index]);

    return { ...p, variants };
  });

  const variants = Variants.map((v) => {
    return {
      ...v,
      product: products[v.product],
    };
  });
  return { products, variants };
};
