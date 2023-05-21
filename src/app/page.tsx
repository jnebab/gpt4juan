import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="pt-20">
      <SignIn />
    </div>
  );
}
