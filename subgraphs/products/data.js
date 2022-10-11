export const PRODUCTS = [
  {
    id: "product:1",
    variants: [{ id: "variant:1" }, { id: "variant:2" }],
    title: "Air Jordan 1 Mid",
    description:
      "Air Jordan 1 Mid is a blue, grey and white sneaker from the iconic jordan brand",
    mediaUrl:
      "https://sneakernews.com/wp-content/uploads/2022/06/air-jordan-1-mid-university-blue-grey-dx9276-100-6.jpg",
  },
  {
    id: "product:2",
    variants: [
      { id: "variant:4" },
      { id: "variant:5" },
      { id: "variant:6" },
      { id: "variant:7" },
      { id: "variant:8" },
    ],
    title: "Supreme x Tiffany & Co. Box Logo Tee",
    description:
      "A classic Supreme vbox t-shirt in the signature Tiffany blue.",
    mediaUrl:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQWDHD3SSS98UAVKODaql7nrDTopfL4tcTnEltW8Yqy4hyDu4i5b70Wb3Y8-wACJIo5g-ZdRULPQKUmt7JfwiaSdgiOBz4pvU_YelKHUI4nhoXmMJPeh_tyWQ",
  },
  {
    id: "product:3",
    variants: [{ id: "variant:9" }],
    title: "THE MACKINAC 40MM",
    description:
      "Established by Detroit’s historic Bayview Yacht club, the days-long Port Huron to Mackinac Island regatta is one of the longest and most grueling freshwater races in the world.\n\nNamed for this legendary competition, the Shinola Mackinac is our first watch with automatic, single-eye chronograph yacht-timer functionality.\n\nIt’s a precision instrument designed to be passed on for generations—just like the tradition that inspires it.",
    mediaUrl:
      "https://shinola-m2.imgix.net/images/Products/20253783-sdt-012455107/S0120253783_F2_MAIN_01.png?h=1500&w=1500&bg=f7f7f7&auto=format,compress&fit=fillmax",
  },
  {
    id: "product:4",
    variants: [{ id: "variant:10" }, { id: "variant:11" }],
    title: "Air Jordan 4 Retro",
    description:
      "Jordan 4 Retro is a black sneaker with red accents from the iconic jordan brand",
    mediaUrl:
      "https://cdn.flightclub.com/750/TEMPLATE/274477/3.jpg",
  },
  {
    id: "product:5",
    variants: [{ id: "variant:12" }, { id: "variant:13" }],
    title: "Air Jordan 3 Retro Black Gold",
    description:
      "Jordan 3 Retro is a black and gold sneaker with cement accents from the iconic jordan brand",
    mediaUrl:
      "https://cdn.flightclub.com/750/TEMPLATE/317410/1.jpg",
  },
];

export const VARIANTS = [
  {
    id: "variant:1",
    product: { id: "product:1" },
    colorway: "Red",
    price: 600.25,
    size: "10",
    dimensions: "12inx10inx6in",
    weight: 10.0,
  },
  {
    id: "variant:2",
    product: { id: "product:1" },
    colorway: "Green",
    price: 20.12,
    size: "11",
    dimensions: "12inx10inx6in",
    weight: 10.0,
  },
  {
    id: "variant:3",
    product: { id: "product:1" },
    colorway: "Gold",
    price: 100.0,
    size: "12",
    dimensions: "12inx10inx6in",
    weight: 10.0,
  },
  {
    id: "variant:4",
    product: { id: "product:2" },
    colorway: "Tiffany blue",
    price: 600.25,
    size: "S",
    dimensions: "36inx36inx1in",
    weight: 30.0,
  },
  {
    id: "variant:5",
    product: { id: "product:2" },
    colorway: "Tiffany blue",
    price: 600.25,
    size: "M",
    dimensions: "36inx36inx1in",
    weight: 30.0,
  },
  {
    id: "variant:6",
    product: { id: "product:2" },
    colorway: "Tiffany blue",
    price: 600.25,
    size: "L",
    dimensions: "36inx36inx1in",
    weight: 30.0,
  },
  {
    id: "variant:7",
    product: { id: "product:2" },
    colorway: "Tiffany blue",
    price: 600.25,
    size: "XL",
    dimensions: "36inx36inx1in",
    weight: 30.0,
  },
  {
    id: "variant:8",
    product: { id: "product:2" },
    colorway: "Tiffany blue",
    price: 600.25,
    size: "XS",
    dimensions: "36inx36inx1in",
    weight: 30.0,
  },
  {
    id: "variant:9",
    product: { id: "product:3" },
    colorway: "Gold",
    price: 3499.99,
    size: "40mm",
    dimensions: "8inx8inx8in",
    weight: 5.0,
  },
  {
    id: "variant:10",
    product: { id: "product:4" },
    colorway: "Red",
    price: 225,
    size: "8",
    dimensions: "12inx10inx6in",
    weight: 10.0,
  },
  {
    id: "variant:11",
    product: { id: "product:4" },
    colorway: "Red",
    price: 225,
    size: "10",
    dimensions: "12inx10inx6in",
    weight: 10.0,
  },
  {
    id: "variant:12",
    product: { id: "product:5" },
    colorway: "Black and gold",
    price: 150,
    size: "8",
    dimensions: "12inx10inx6in",
    weight: 10.0,
  },
  {
    id: "variant:13",
    product: { id: "product:5" },
    colorway: "Black and gold",
    price: 150,
    size: "10",
    dimensions: "12inx10inx6in",
    weight: 10.0,
  },
];
