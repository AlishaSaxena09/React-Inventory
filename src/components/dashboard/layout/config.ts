import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'purchase', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'products', title: 'Products', href: paths.dashboard.products, icon: 'plugs-connected' },
] satisfies NavItemConfig[];
