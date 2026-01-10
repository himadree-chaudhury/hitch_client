"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateHostStatus } from "@/services/dashboard/host";
import { Host } from "@/types/host.type";
import {
  CheckCircle,
  ChevronDown,
  Clock,
  Loader2,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function HostTable({ hosts }: { hosts: Host[] }) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (hostId: string, newStatus: string) => {
    setUpdatingId(hostId);
    const result = await updateHostStatus(hostId, newStatus);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setUpdatingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "REJECTED":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      default:
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
    }
  };

  return (
    <div className="bg-background rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Host ID</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hosts.map((host) => (
            <TableRow key={host.id}>
              <TableCell className="font-mono text-xs">{host.id}</TableCell>

              <TableCell>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{host.rating}</span>
                  <span className="text-muted-foreground text-xs">
                    ({host.ratingCount} reviews)
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <Badge className={getStatusColor(host.hostStatus)}>
                  {host.hostStatus}
                </Badge>
              </TableCell>

              <TableCell className="text-muted-foreground text-sm">
                {new Date(host.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={updatingId === host.id}
                      className="h-8 w-8 p-0"
                    >
                      {updatingId === host.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MoreHorizontal className="h-4 w-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(host.id, "APPROVED")}
                      disabled={host.hostStatus === "APPROVED"}
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(host.id, "PENDING")}
                      disabled={host.hostStatus === "PENDING"}
                    >
                      <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                      Mark Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(host.id, "REJECTED")}
                      disabled={host.hostStatus === "REJECTED"}
                    >
                      <XCircle className="mr-2 h-4 w-4 text-red-600" />
                      Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
