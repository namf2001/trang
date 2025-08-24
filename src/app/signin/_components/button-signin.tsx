'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

interface ButtonSignInProps {
  icon?: React.ReactNode;
  text: string;
  action: () => Promise<void>;
}

export default function ButtonSignIn({ icon, text, action }: Readonly<ButtonSignInProps>) {
  const { pending } = useFormStatus();

  return (
    <form action={action}>
      <Button
        variant="outline"
        className="group relative w-full overflow-hidden"
        disabled={pending}
        aria-label={text || 'Sign in'}
      >
        <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
        {pending ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {icon}
            <span>{text}</span>
          </>
        )}
      </Button>
    </form>
  );
}