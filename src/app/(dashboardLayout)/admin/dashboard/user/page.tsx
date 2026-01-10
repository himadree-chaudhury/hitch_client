import UserTable from "@/components/modules/adminDashboard/UserTable";
import { UsersResponse } from "@/types/user.type";


async function getAllUsers() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  
  try {
    // Ensure you fetch with 'no-store' so you always see the latest status
    const res = await fetch(`${baseUrl}/users`, {
      cache: "no-store", 
    });

    if (!res.ok) throw new Error("Failed to fetch users");
    return (await res.json()) as UsersResponse;
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
}

export default async function AdminUsersPage() {
    const response = await getAllUsers();
    const users = response.data || [];
    return (
     <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage user access and view system accounts.
          </p>
        </div>
        <div className="bg-muted px-4 py-2 rounded-lg text-sm font-medium">
          Total Users: {users.length}
        </div>
      </div>

      <UserTable users={users} />
    </div>
)}