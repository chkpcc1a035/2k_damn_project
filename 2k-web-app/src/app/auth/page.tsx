import { auth } from "@/auth";
import { SignIn } from "@/components/auth/signin-button";
import { SignOut } from "@/components/auth/signout-button";

export default async function Page() {
  const session = await auth();
  console.log(session);
  if (!session?.user)
    return (
      <>
        <SignIn />
      </>
    );

  return (
    <>
      <SignOut />
    </>
  );
}
