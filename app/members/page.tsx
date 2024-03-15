export const dynamic = 'force-dynamic'
import { getMembers } from "@/app/utils/Members/getMembers";
import MembersPage from "@/components/MembersUI/MembersPage";

export default async function Page() {
  const data = await getMembers();
  console.log(data);

  return <MembersPage data={data} />;
}
