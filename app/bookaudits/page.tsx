import BookAuditsPage from "@/components/BookAuditsUI/BookAuditsPage";
import { getBookAudits } from "../utils/BookAudits/getBookAudits";

export default async function Page() {
  const data = await getBookAudits();
  console.log(data);

  return <BookAuditsPage data={data} />;
}
