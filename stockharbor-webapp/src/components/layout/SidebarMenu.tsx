"use client";

import {
  Home,
  Package,
  Settings,
  FileText,
  Mail,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Package, label: "Products", href: "/products" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: Mail, label: "Messages", href: "/messages" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 fo shadow-xs bg-(--foreground) lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center h-16 border-b border-gray-200">
          <Image
            src="/stockharbor-logo-dark.svg"
            alt="StockHarbor Logo"
            width={500}
            height={500}
          />
        </div>

        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                >
                  <item.icon size={20} className="mr-3" />
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight
                    size={16}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              {/* <User size={20} className="text-white" /> */}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
