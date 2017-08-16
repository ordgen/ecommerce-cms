import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import ActionToc from 'material-ui/svg-icons/action/toc';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

const SiteConfig = {
  name: 'Ordgen',
};

const DashboardMenus = [
  {
    text: 'DashBoard',
    icon: <Assessment />,
    link: '/dashboard',
    children: [],
  },
  {
    text: 'Orders',
    icon: <ActionAssignment />,
    link: '/dashboard/orders',
    children: [],
  },
  {
    text: 'Products',
    icon: <ActionAssignment />,
    link: '/dashboard/products',
    children: [],
  },
  {
    text: 'Product Categories',
    icon: <ActionToc />,
    link: '/dashboard/product-categories',
    children: [],
  },
  {
    text: 'Slider',
    icon: <ActionToc />,
    link: '/dashboard/slider-images',
    children: [],
  },
  {
    text: 'Site Info',
    icon: <ActionToc />,
    link: '/dashboard/site-information',
    children: [],
  },
];

const Products = [
  {
    name: ' Art for gifting ',
    id: 'defedsds',
    image: 'http://static.achica.com/Media/Promo/Banner/0717_17_contemporary-art-prints_580.jpg?i10c=img.resize(width:300,height:200)',
    category: 'Wall Art',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  },
  {
    name: 'Rug',
    id: '3434waa344',
    image: 'http://static.achica.com/Media/Promo/Banner/0717_17_the-rug-shop_580.jpg?i10c=img.resize(width:300,height:200)',
    category: 'Rugs',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  },
  {
    name: 'Exy Sofa',
    id: '224444',
    image: 'http://static.achica.com/Media/Promo/Banner/0717_31_midnight-tones-furniture_580.jpg?i10c=img.resize(width:460,height:310)?i10c=img.resize(width:460,height:310)',
    category: 'Sofa',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  },
  {
    name: 'Mattress',
    id: 'hdhhd63663',
    image: 'http://static.achica.com/Media/Promo/Banner/0717_17_eve-mattresses_580.jpg?i10c=img.resize(width:300,height:200)',
    category: 'Sofa',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  },
  {
    name: 'Wofi Lighting',
    id: 'jhfdh144ew',
    image: 'http://static.achica.com/Media/Promo/Banner/0717_17_wofl-lighting_580.jpg?i10c=img.resize(width:300,height:200)',
    category: 'Lighting',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  },
  {
    name: 'Linen',
    id: '09812wqee7664',
    image: 'http://static.achica.com/Media/Promo/Banner/0717_17_sheridan-linens_580.jpg?i10c=img.resize(width:300,height:200)',
    category: 'Lines',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  },
  {
    name: 'Towel',
    id: 'aa1544aa',
    image: 'http://static.achica.com/Media/Promo/Banner/0717_17_sheridan-towels_580.jpg?i10c=img.resize(width:300,height:200)',
    category: 'Towels',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  },
  {
    name: 'Bold Throw Pillow',
    id: 'ddaad4422',
    image: 'http://static.achica.com/Media/Promo/Banner/0717_17_snuggledown-duvets-pillows_580.jpg?i10c=img.resize(width:300,height:200)',
    category: 'Throw Pillows',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  },
  {
    name: 'Wild Throw Pillow',
    id: 'hhh44524524',
    image: 'http://static.achica.com/Media/Promo/Banner/0717_16_orla-kiely-bed-and-bath_580.jpg?i10c=img.resize(width:300,height:200)',
    category: 'Throw Pillows',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  },
  {
    name: 'Exy Throw Pillow',
    id: 'adadda111',
    image: 'http://static.achica.com/Media/Promo/Banner/0717_16_orla-kiely-cushions_580.jpg?i10c=img.resize(width:300,height:200)',
    category: 'Throw Pillows',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  },
  {
    name: 'Framed Prints',
    id: 'hsjds633637',
    image: 'http://static.achica.com/Media/Promo/Banner/0717_28_vettriano-framed-prints_580.jpg?i10c=img.resize(width:460,height:310)?i10c=img.resize(width:460,height:310)',
    category: 'Wall Art',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  },
];

const Currencies = [
  {
    symbol: '$',
    name: 'US Dollar',
    symbol_native: '$',
  },
  {
    symbol: '₵',
    name: 'Ghanaian Cedi',
    symbol_native: 'GH₵',
  },
];

export default SiteConfig;
export { DashboardMenus };
export { Products };
export { Currencies };
