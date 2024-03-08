import LoansPage from "@/components/LoansPage";
import { getLoans } from "@/app/utils/Loans/getLoans";

export default async function Page() {
  const data = await getLoans();
  console.log(data);

  return <LoansPage data={data} />;
}
