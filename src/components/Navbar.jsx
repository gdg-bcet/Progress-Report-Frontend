import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-white shadow p-2 rounded-lg my-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src="/icon_horizontal.png" alt="Logo" className="h-12" />
        </Link>
        <div className="hidden sm:block space-x-4">
          <Link
            to="/"
            className={`text-gray-700 hover:text-blue-500 ${
              location.pathname === '/' ? 'font-bold' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/progress"
            className={`text-gray-700 hover:text-blue-500 ${
              location.pathname === '/progress' ? 'font-bold' : ''
            }`}
          >
            Progress
          </Link>
          <Link
            to="/about"
            className={`text-gray-700 hover:text-blue-500 ${
              location.pathname === '/about' ? 'font-bold' : ''
            }`}
          >
            About
          </Link>
        </div>
        <Drawer>
          <DrawerTrigger className="sm:hidden">
            <Menu className="size-7" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <Link
                to="/"
                className={`block text-gray-700 hover:text-blue-500 ${
                  location.pathname === '/' ? 'font-bold' : ''
                }`}
              >
                Home
              </Link>
              <Link
                to="/progress"
                className={`block text-gray-700 hover:text-blue-500 ${
                  location.pathname === '/progress' ? 'font-bold' : ''
                }`}
              >
                Progress
              </Link>
              <Link
                to="/about"
                className={`block text-gray-700 hover:text-blue-500 ${
                  location.pathname === '/about' ? 'font-bold' : ''
                }`}
              >
                About
              </Link>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}

export default Navbar;
