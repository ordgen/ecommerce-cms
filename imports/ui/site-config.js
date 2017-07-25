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
    link: '/dashboard/home',
    children: [],
  },
  {
    text: 'Products',
    icon: <ActionToc />,
    link: '',
    children: [
      {
        text: 'All Products',
        icon: <ActionAssignment />,
        link: '/dashboard/products',
      },
    ],
  },
  {
    text: 'Product Categories',
    icon: <ActionToc />,
    link: '',
    children: [
      {
        text: 'All Categories',
        icon: <ActionAssignment />,
        link: '/dashboard/product-categories',
      },
    ],
  },
];

const PrimaryMenus = [
  {
    name: 'Pillows',
    id: '212215454',
    children: [
      {
        name: 'Throw Pillows',
        id: '212122222',
        children: [],
      },
      {
        name: 'Arm Rest Pillow',
        id: '444551111',
        children: [],
      },
    ],
  },
  {
    name: 'Sensor Bins',
    id: '24333333',
    children: [],
  },
  {
    name: 'Furniture',
    id: '22122111',
    children: [
      {
        name: 'Sofa',
        id: '33t3yt113',
        children: [],
      },
      {
        name: 'Living Room Set',
        id: '373371113',
        children: [],
      },
      {
        name: 'Dinning Room Set ',
        id: '6276476',
      },
      {
        name: 'Arm Rest Pillow',
        id: '444551111',
        children: [],
      },
    ],
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
];

export default SiteConfig;
export { DashboardMenus };
export { PrimaryMenus };
export { Products };
