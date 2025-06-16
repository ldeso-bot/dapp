import { navItems } from './navbar.utils';
import NavBarItem from './NavBarItem';

export default function NavbarItems() {
  return (
    <div>
      {navItems.map((item) => (
        <NavBarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          href={item.href}
        />
      ))}
    </div>
  );
}
