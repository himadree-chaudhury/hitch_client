import VerifyAccount from "@/components/modules/userDashboard/VerifyAccount";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function VerificationPage() {
  const user = await getUserInfo();

  // Handle case where user fetch fails
  if (!user) {
    return (
      <div className="p-10 text-center">Please log in to verify account.</div>
    );
  }

  return (
    <div className="container py-20">
      <VerifyAccount isVerified={user.verification} />
    </div>
  );
}
