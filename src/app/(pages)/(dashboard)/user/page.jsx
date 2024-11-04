
import { auth } from "@/auth";

const page = async () => {

  const session = await auth();
  // console.log(session)

  return (

    <div>
      progress
    </div>

  );
}

export default page
