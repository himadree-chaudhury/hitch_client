"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toggleUserStatus } from "@/services/dashboard/user";
import { IUser } from "@/types/user.type";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UserTable({ users }: { users: IUser[] }) {
  // Track which user is currently being updated to show a spinner
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (userId: string, currentStatus: string) => {
    setUpdatingId(userId);

    const result = await toggleUserStatus(userId, currentStatus);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setUpdatingId(null);
  };

  return (
    <div className="bg-background rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Verification</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline">{user.role}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {user.provider}
              </TableCell>
              <TableCell>
                {user.verification ? (
                  <span className="text-xs font-semibold text-green-600">
                    Verified
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-yellow-600">
                    Pending
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  className={`${
                    user.status === "ACTIVE"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-red-100 text-red-700 hover:bg-red-100"
                  }`}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant={user.status === "ACTIVE" ? "destructive" : "default"}
                  onClick={() => handleStatusChange(user.id, user.status)}
                  disabled={updatingId === user.id}
                  className="w-24"
                >
                  {updatingId === user.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : user.status === "ACTIVE" ? (
                    <>
                      <ShieldAlert className="mr-2 h-4 w-4" /> Block
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="mr-2 h-4 w-4" /> Activate
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
