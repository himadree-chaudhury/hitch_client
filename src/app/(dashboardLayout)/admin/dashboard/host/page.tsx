import HostTable from "@/components/modules/adminDashboard/HostTable";
import { HostsResponse } from "@/types/host.type";


async function getAllHosts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  
  try {
    const res = await fetch(`${baseUrl}/hosts`, {
      cache: "no-store", 
    });

    if (!res.ok) {
        console.error("Fetch failed:", res.status);
        return { success: false, data: [] };
    }
    return (await res.json()) as HostsResponse;
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
}

export default async function AdminHostsPage() {
  const response = await getAllHosts();
  const hosts = response?.data || [];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Host Requests</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage host applications.
          </p>
        </div>
        <div className="bg-muted px-4 py-2 rounded-lg text-sm font-medium">
          Total Hosts: {hosts.length}
        </div>
      </div>

      <HostTable hosts={hosts} />
    </div>
  );
}