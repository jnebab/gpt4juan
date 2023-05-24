import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="pt-20">
      <SignUp afterSignUpUrl="/chat" redirectUrl="/chat" />
    </div>
  );
}
