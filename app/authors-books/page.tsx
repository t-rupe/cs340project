import { getAuthorBooks } from "../utils/AuthorBooks/getAuthorBooks";
import AuthorsBooksPage from "@/components/AuthorsBookUI/AuthorBooksPage";

export default async function Page() {
  const data = await getAuthorBooks();
  console.log(data);

  return <AuthorsBooksPage data={data} />;
}
