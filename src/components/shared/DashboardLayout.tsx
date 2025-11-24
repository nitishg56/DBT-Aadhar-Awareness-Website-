import { ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import { LogOut, Menu, X, Bell, User } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  userRole: string;
  userName: string;
  onNavigate: (page: 'landing') => void;
  sidebar: ReactNode;
}

export default function DashboardLayout({ children, title, userRole, userName, onNavigate, sidebar }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-[#002147] text-white shadow-lg sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white hover:bg-white/10 lg:hidden"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  <circle cx="50" cy="50" r="45" fill="#FF9933" />
                  <circle cx="50" cy="50" r="30" fill="#fff" />
                  <circle cx="50" cy="50" r="15" fill="#138808" />
                </svg>
              </div>
              <div>
                <div className="text-sm opacity-90">DBT Portal</div>
                <div className="text-lg">{title}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-2 rounded">
              <User className="w-4 h-4" />
              <div className="text-sm">
                <div className="opacity-75 text-xs">{userRole}</div>
                <div>{userName}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('landing')}
              className="text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:sticky lg:translate-x-0 top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-40 overflow-y-auto`}
        >
          {sidebar}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
