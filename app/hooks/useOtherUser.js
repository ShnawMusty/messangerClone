import { useSession } from "next-auth/react"
import { useMemo } from "react";

const useOtherUser = (conversation) => {
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const otherUserFiltered = conversation.users.filter(user => user.email !== currentUserEmail );

    return otherUserFiltered[0];

  }, [session?.data?.user?.email, conversation.users]);

  return otherUser;
}


export default useOtherUser;