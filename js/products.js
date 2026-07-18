

const CATEGORIES = [
  'Wash Basins',
  'Water Closets',
  'Mirrors',
  'Faucets & Fittings',
  'Shower Sets',
  'Kitchen Sinks',
  'Bidets',
  'Urinals',
  'Accessories'
];

const PRODUCTS = [
  {
    id: 1,
    sku: 'example001',
    name: 'shower',
    category: 'Shower Sets',
    price: 'Rs. 0 (set me)',
    description: 'Vitreous china counter-top basin with a soft oval curve and matte-white glaze.',
    images: [
      'images/products/example001/1.png',
      'images/products/example001/2.jpg'
    
    ]
  },
  {
    id: 2,
    sku: 'example002',
    name: 'Black Basin Mixer',
    category: 'Faucets & Fittings',
    price: 'Rs. 0 (set me)',
    description: 'Rimless flush wall-hung WC with a concealed cistern option and easy-clean glaze.',
    images: [
      'images/products/example002/1.png',
      'images/products/example002/2.jpg'
    ]
  },
  {
    id: 3,
    sku: 'example003',
    name: 'Chrome Basin Mixer',
    category: 'Faucets & Fittings',
    price: 'Rs. 0 (set me)',
    description: 'Acrylic freestanding tub with reinforced base, built for long, quiet soaks.',
    images: [
      'images/products/example003/1.png',
      'images/products/example003/2.jpg'
      
    ]
  },
  {
    id: 4,
    sku: 'example004',
    name: 'Gold-Angel Basin Mixer',
    category: 'Faucets & Fittings',
    price: 'Rs. 0 (set me)',
    description: 'Solid brass single-lever mixer with a brushed chrome finish and ceramic cartridge.',
    images: [
      'images/products/example004/1.jpg',
      'images/products/example004/2.jpg'
    ]
  },
  {
    id: 5,
    sku: 'example005',
    name: 'Gold-Black Angel Basin Mixer',
    category: 'Faucets & Fittings',
    price: 'Rs. 0 (set me)',
    description: '8-inch rainfall shower head paired with a hand shower and 3-way diverter.',
    images: [
      'images/products/example005/1.jpg',
      'images/products/example005/2.jpg'
     
    ]
  },
  {
    id: 6,
    sku: 'example006',
    name: 'Accessories set',
    category: 'Accessories',
    price: 'Rs. 0 (set me)',
    description: 'Double-bowl granite-composite sink, scratch-resistant and heat-safe up to 280°C.',
    images: [
      'images/products/example006/1.jpg',
      'images/products/example006/2.jpg'
    ]
  },
  {
    id: 7,
    sku: 'example007',
    name: 'Gold-Long Floor Waste',
    category: 'Accessories',
    price: 'Rs. 0 (set me)',
    description: 'Floor-mounted ceramic bidet with soft-close fitting and single-lever tap compatibility.',
    images: [
      'images/products/example007/1.jpg',
      'images/products/example007/2.jpg'
    ]
  },
  {
    id: 8,
    sku: 'example008',
    name: 'Gold-Square Floor Waste',
    category: 'Accessories',
    price: 'Rs. 0 (set me)',
    description: 'Space-saving wall-mounted urinal in glossy white vitreous china.',
    images: [
      'images/products/example008/1.jpg',
      'images/products/example008/2.jpg'
    ]
  },
  {
    id: 9,
    sku: 'example009',
    name: 'Golden-Black Bowl',
    category: 'Wash Basins',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example009/1.jpg',
      'images/products/example009/2.jpg'
    ]
  },
    {
    id: 10,
    sku: 'example010',
    name: 'Gold-White Designer Bowl',
    category: 'Wash Basins',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example010/1.jpg',
      'images/products/example010/2.jpg'
    ]
  },

    {
    id: 11,
    sku: 'example011',
    name: 'Gold Floor Waste',
    category: 'Accessories',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example011/1.jpg',
      'images/products/example011/2.jpg'
    ]

  },

    {
    id: 12,
    sku: 'example012',
    name: 'Gold-White Washing Basin',
    category: 'Wash Basins',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example012/1.jpg',
      'images/products/example012/2.jpg'
    ]

  },


    {
    id: 13,
    sku: 'example013',
    name: 'Square Multi-Functional Mirror',
    category: 'Mirrors',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example013/1.jpg',
      'images/products/example013/2.jpg'
    ]

  },

  
    {
    id: 14,
    sku: 'example014',
    name: 'Stylish Toilet',
    category: 'Water Closets',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example014/1.jpg',
      'images/products/example014/2.jpg'
    ]

  },

  
    {
    id: 15,
    sku: 'example015',
    name: 'Round Luxury Light mirror',
    category: 'Mirrors',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example015/1.jpg',
      'images/products/example015/2.jpg'
    ]

  },


    {
    id: 16,
    sku: 'example016',
    name: 'Lucury Basin',
    category: 'Wash Basins',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example016/1.jpg',
      'images/products/example016/2.jpg'
    ]

  },


    {
    id: 17,
    sku: 'example017',
    name: 'Round Multi-Functional mirror',
    category: 'Mirrors',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example017/1.jpg',
      'images/products/example017/2.jpg'
    ]

  },

    {
    id: 18,
    sku: 'example018',
    name: 'Black Washroom Hangar ',
    category: 'Accessories',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example018/1.jpg',
      'images/products/example018/2.jpg'
    ]

  },

    {
    id: 19,
    sku: 'example019',
    name: 'Gold-Black Shower Set',
    category: 'Shower Sets',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example019/1.jpg',
      'images/products/example019/2.jpg'
    ]

  },

    {
    id: 20,
    sku: 'example020',
    name: 'Long Neck Basin mixer',
    category: 'Faucets & Fittings',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example020/1.jpg',
      'images/products/example020/2.jpg'
    ]

  },


    {
    id: 21,
    sku: 'example021',
    name: 'Black Designer Basin Mixer',
    category: 'Faucets & Fittings',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example021/1.jpg',
      'images/products/example021/2.jpg'
    ]

  },


    {
    id: 22,
    sku: 'example022',
    name: 'Kitchen Lucury Basin Mixer',
    category: 'Faucets & Fittings',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example022/1.jpg',
      'images/products/example022/2.jpg'
    ]

  },


    {
    id: 23,
    sku: 'example023',
    name: 'Black Kitchen Sink',
    category: 'Kitchen Sinks',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example023/1.jpg',
      'images/products/example023/2.jpg'
    ]

  },


    {
    id: 24,
    sku: 'example024',
    name: 'Iconic Gold Basin Mixer',
    category: 'Faucets & Fittings',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example024/1.jpg',
      'images/products/example024/2.jpg'
    ]

  },

   {
    id: 25,
    sku: 'example025',
    name: 'White-Gray Tile Basin',
    category: 'Wash Basins',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example025/1.jpg',
      'images/products/example025/2.jpg'
    ]

  },

   {
    id: 26,
    sku: 'example026',
    name: 'Black Shower Face',
    category: 'Shower Sets',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example026/1.jpg',
      'images/products/example026/2.jpg'
    ]

  },


   {
    id: 27,
    sku: 'example027',
    name: 'Gold Shower Set',
    category: 'Shower Sets',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example027/1.jpg',
      'images/products/example027/2.jpg'
    ]

  },


   {
    id: 28,
    sku: 'example028',
    name: 'Luxury Tile Basin',
    category: 'Wash Basins',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example028/1.jpg',
      'images/products/example028/2.jpg'
    ]

  },


   {
    id: 29,
    sku: 'example029',
    name: 'White iconic shower face',
    category: 'Shower Sets',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example029/1.jpg',
      'images/products/example029/2.jpg'
    ]

  },


   {
    id: 30,
    sku: 'example030',
    name: 'Black Mat Basin',
    category: 'Wash Basins',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example030/1.jpg',
      'images/products/example030/2.jpg'
    ]

  },


   {
    id: 31,
    sku: 'example031',
    name: 'Blace Face-Silver Body Shower Set',
    category: 'Shower Sets',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example031/1.jpg',
      'images/products/example031/2.jpg'
    ]

  },


   {
    id: 34,
    sku: 'example034',
    name: 'Black Accessory Set',
    category: 'Accessories',
    price: 'Rs. 0 (set me)',
    description: 'Wall-fixed ceramic soap dish finished to match the Ivory Curve basin range.',
    images: [
      'images/products/example034/1.jpg',
      'images/products/example034/2.jpg'
    ]

  }


  
    










  
    

  
];
