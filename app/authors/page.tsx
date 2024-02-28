import AuthorsPage from '@/components/AuthorsPage'

import { getAuthors} from '@/app/utils/Authors/getAuthors'


type Author = {
  author_id: number;
  first_name: string;
  last_name: string;
}





export default async function Page() {


 const data = await getAuthors()
 console.log(data)



  return (
    <AuthorsPage data={data} />
  )
}