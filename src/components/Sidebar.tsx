import { LayoutDashboard, Users, FileText, DollarSign, BarChart3, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Loans", url: "/loans", icon: FileText },
  { title: "Repayments", url: "/repayments", icon: DollarSign },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-border px-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MLMS
          </h1>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              end={item.url === "/"}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              activeClassName="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="text-sm font-semibold text-primary">LO</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Loan Officer</p>
              <p className="text-xs text-muted-foreground">officer@mfi.pk</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
