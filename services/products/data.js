export const PRODUCTS = [
  {
    id: "1",
    variants: [{ id: "1" }, { id: "2" }],
    title: "Air Jordan 1 Mid",
    description:
      "Air Jordan 1 Mid is a blue, grey and white sneaker from the iconic jordan brand",
    mediaUrl:
      "https://sneakernews.com/wp-content/uploads/2022/06/air-jordan-1-mid-university-blue-grey-dx9276-100-6.jpg",
  },
  {
    id: "2",
    variants: [{ id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }],
    title: "Supreme x Tiffany & Co. Box Logo Tee",
    description:
      "A classic Supreme vbox t-shirt in the signature Tiffany blue.",
    mediaUrl:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQWDHD3SSS98UAVKODaql7nrDTopfL4tcTnEltW8Yqy4hyDu4i5b70Wb3Y8-wACJIo5g-ZdRULPQKUmt7JfwiaSdgiOBz4pvU_YelKHUI4nhoXmMJPeh_tyWQ",
  },
  {
    id: "3",
    variants: [{ id: "8" }],
    title: "THE MACKINAC 40MM",
    description:
      "Established by Detroit’s historic Bayview Yacht club, the days-long Port Huron to Mackinac Island regatta is one of the longest and most grueling freshwater races in the world.\n\nNamed for this legendary competition, the Shinola Mackinac is our first watch with automatic, single-eye chronograph yacht-timer functionality.\n\nIt’s a precision instrument designed to be passed on for generations—just like the tradition that inspires it.",
    mediaUrl:
      "https://shinola-m2.imgix.net/images/Products/20253783-sdt-012455107/S0120253783_F2_MAIN_01.png?h=1500&w=1500&bg=f7f7f7&auto=format,compress&fit=fillmax",
  },
];

export const VARIANTS = [
  {
    id: "1",
    product: { id: "1" },
    colorway: "Red",
    price: 600.25,
    size: "10",
    dimensions: "12inx10inx6in",
  },
  {
    id: "2",
    product: { id: "1" },
    colorway: "Green",
    price: 20.12,
    size: "11",
    dimensions: "12inx10inx6in",
  },
  {
    id: "3",
    product: { id: "2" },
    colorway: "Gold",
    price: 100.0,
    size: "12",
    dimensions: "12inx10inx6in",
  },
  {
    id: "4",
    product: { id: "2" },
    colorway: "Red",
    price: 600.25,
    size: "S",
    dimensions: "36inx36inx1in",
  },
  {
    id: "5",
    product: { id: "2" },
    colorway: "Red",
    price: 600.25,
    size: "M",
    dimensions: "36inx36inx1in",
  },
  {
    id: "6",
    product: { id: "2" },
    colorway: "Red",
    price: 600.25,
    size: "L",
    dimensions: "36inx36inx1in",
  },
  {
    id: "7",
    product: { id: "2" },
    colorway: "Red",
    price: 600.25,
    size: "XL",
    dimensions: "36inx36inx1in",
  },
  {
    id: "8",
    product: { id: "3" },
    colorway: "Gold",
    price: 3499.99,
    size: "40mm",
    dimensions: "8inx8inx8in",
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
