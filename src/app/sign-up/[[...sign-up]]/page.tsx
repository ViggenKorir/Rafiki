import { SignUp } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your Rafiki Partners account',
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Get started with your Rafiki Partners account
          </p>
        </div>

        <div className="mt-8">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white',
                card: 'bg-white shadow-md rounded-lg p-6',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton:
                  'border border-gray-300 text-gray-700 hover:bg-gray-50',
                formFieldInput:
                  'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm',
                footerAction: 'text-sm text-gray-600',
                footerActionLink: 'text-blue-600 hover:text-blue-500',
              },
            }}
            redirectUrl="/admin"
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  );
}
