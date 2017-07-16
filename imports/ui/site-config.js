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

export default SiteConfig;
export { Menus };
