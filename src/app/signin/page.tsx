import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import ButtonSignIn from "@/app/signin/_components/button-signin";
import { signInWithGithub } from "@/app/_actions/auth";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Đăng nhập</h1>
          <p className="text-gray-600">Quản lý link</p>
        </div>

        {/* GitHub Login */}
        <ButtonSignIn icon={<svg viewBox="0 0 24 24" className="mr-2 h-4 w-4" aria-hidden="true">
          <path
            fill="#1877F2"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>} text="Sign in with Github" action={signInWithGithub} />
      </Card>
    </div>
  );
}