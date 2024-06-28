import { TSidebarLinks } from '@/types/general.type';
import { Link, useLocation } from 'react-router-dom';
import { sidebarLinks } from '@/constants/general.const';

const Sidebar = () => {
  const router = useLocation();
  const { pathname } = router;
  return (
    <div className='px-4 py-6 bg-[#FCFCFC]'>
      {sidebarLinks.map((link) => (
        <SidebarLink
          isActive={pathname === link.path}
          key={link.title}
          link={link}
        ></SidebarLink>
      ))}
    </div>
  );
};
interface ISidebarLinkProps {
  link: TSidebarLinks;
  isActive: boolean;
}
function SidebarLink({ link, isActive }: ISidebarLinkProps) {
  return (
    <Link
      to={link.path}
      className={`px-6 py-4 flex items-center gap-4 font-bold text-base rounded-xl  ${
        isActive ? 'bg-purple-400 text-white' : 'hover:text-blue-400'
      }`}
    >
      <span>{link.icon}</span>
      <span className=''>{link.title}</span>
    </Link>
  );
}

export default Sidebar;
