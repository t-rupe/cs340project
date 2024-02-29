import AuthorsPage from "@/components/AuthorsPage";

import { getAuthors } from "@/app/utils/Authors/getAuthors";

export default async function Page() {
  const data = await getAuthors();
  console.log(data);

  return <AuthorsPage data={data} />;
}
