
import { NavLink } from "react-router-dom";
import {
  House,
  Search,
  Compass,
  Clapperboard,
  Send,
  Heart,
  PlusSquare,
  Menu,
  UserRound
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/auth.context.jsx";

const Navbar = () => {
 const { user } = useContext(AuthContext)
 const profileImage = user?.profileImage;

  const navItems = [
    { name: "Home", path: "/", icon: House },
    { name: "Search", path: "/search", icon: Search },
    { name: "Explore", path: "/explore", icon: Compass },
    { name: "Reels", path: "/reels", icon: Clapperboard },
    { name: "Messages", path: "/messages", icon: Send },
    { name: "Notifications", path: "/notifications", icon: Heart },
    { name: "Create", path: "/create-post", icon: PlusSquare },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-3 py-3 rounded-lg transition-all
    hover:bg-gray-100 ${
      isActive ? "font-bold text-black" : "text-gray-700"
    }`;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[245px] bg-white border-r border-gray-200 flex-col px-4 py-8 z-50">

        {/* Logo */}
        <NavLink to="/" className="text-3xl font-bold font-serif px-3 mb-10">
          Instagram
        </NavLink>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={linkClass}
              >
                <Icon size={25} strokeWidth={1.8} />
                <span className="text-base">
                  {item.name}
                </span>
              </NavLink>
            );
          })}

          {/* Profile */}
          <NavLink to="/profile" className={linkClass}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <UserRound size={25} strokeWidth={1.8} />
            )}
            <span>Profile</span>
          </NavLink>

        </nav>

        {/* More */}
        <button className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <Menu size={25} />
          <span>More</span>
        </button>

      </aside>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex items-center justify-around py-3 z-50">

        <NavLink to="/">
          {({ isActive }) => (
            <House size={25} fill={isActive ? "black" : "none"} />
          )}
        </NavLink>

        <NavLink to="/explore">
          <Compass size={25} />
        </NavLink>

        <NavLink to="/reels">
          <Clapperboard size={25} />
        </NavLink>

        <NavLink to="/create">
          <PlusSquare size={25} />
        </NavLink>

        <NavLink to="/notifications">
          <Heart size={25} />
        </NavLink>

        <NavLink to="/profile">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <UserRound size={25} strokeWidth={1.8} />
          )}
        </NavLink>

      </nav>
    </>
  );
};

export default Navbar;
