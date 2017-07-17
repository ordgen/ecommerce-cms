import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import ActionToc from 'material-ui/svg-icons/action/toc';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

const SiteConfig = {
  name: 'Ordgen',
};

const Menus = [
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
        link: '/dashboard/products/list',
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

export default SiteConfig;
export { Menus };
export { PrimaryMenus };
