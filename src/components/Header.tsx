import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/about', label: 'about' },
  { to: '/story', label: 'story' },
  { to: '/info', label: 'info' },
  { to: '/join', label: 'join us' },
];

export default function Header() {
  return (
    <header className="px-6 pt-10 relative z-[10]">
      <div className="flex items-center justify-between max-w-[1100px] mx-auto flex-wrap gap-4">
        <Link to="/" className="flex items-baseline gap-3 no-underline">
          <span className="font-display font-extrabold text-[32px] tracking-tighter text-forest">
            EST
          </span>
          <span className="font-mono text-[12px] text-forest opacity-70">
            since 2003 · 早稲田大学公認
          </span>
        </Link>
        <nav className="flex gap-2 flex-wrap">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `anchor-pill${isActive ? ' is-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
