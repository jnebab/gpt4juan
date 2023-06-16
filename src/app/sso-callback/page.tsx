import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div>
        <h3>Please wait...</h3>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
