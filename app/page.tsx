
import { getBooks } from "@/app/utils/Books/getBooks";
import BooksPage from "@/components/BooksPage";

export default async function Page() {
  const data = await getBooks();
  console.log(data);

  return <BooksPage data={data} />;
}
