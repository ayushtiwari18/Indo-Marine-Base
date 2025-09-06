import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Bell, User } from "lucide-react";

export function TopNav() {
  return (
    <header className="flex h-16 items-center gap-4 border-b px-6">
      <SidebarTrigger />

      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search datasets, species..." className="pl-9" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Avatar>
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
