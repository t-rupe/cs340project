import BookAuditsPage from "@/components/BookAuditsUI/BookAuditsPage";
import { getBookById } from "@/app/utils/BookAudits/getBookById";

export default async function Page({ params }: { params: { id: number } }) {
  const data = await getBookById(params.id);

  return <BookAuditsPage data={data} />;
}
