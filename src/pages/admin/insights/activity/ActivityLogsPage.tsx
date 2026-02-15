import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const logs = [
  {
    id: "1",
    user: { name: "Karim Ahmed", email: "karim@example.com", avatar: "" },
    action: "Updated Product Price",
    target: "iPhone 15 Pro",
    timestamp: "2 minutes ago",
    status: "success",
  },
  {
    id: "2",
    user: { name: "System", email: "system@mini-zone.com", avatar: "" },
    action: "Daily Backup",
    target: "Database",
    timestamp: "1 hour ago",
    status: "success",
  },
  {
    Action: "Delete Category",
    id: "3",
    user: { name: "Sarah John", email: "sarah@example.com", avatar: "" },
    target: "Electronics",
    timestamp: "3 hours ago",
    status: "warning",
  },
  {
    id: "4",
    user: { name: "Karim Ahmed", email: "karim@example.com", avatar: "" },
    action: "Login",
    target: "Admin Panel",
    timestamp: "5 hours ago",
    status: "info",
  },
];

export default function ActivityLogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
        <p className="text-muted-foreground">
          Monitor all administrative actions and system events.
        </p>
      </div>

      <div className="bg-card rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={log.user.avatar} />
                    <AvatarFallback>{log.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{log.user.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {log.user.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {log.action ||
                    (log as { action?: string; Action?: string }).Action}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {log.target}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {log.timestamp}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      log.status === "success"
                        ? "default"
                        : log.status === "warning"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {log.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
