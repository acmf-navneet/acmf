import * as React from 'react';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PasswordRecovery() {
  const [userName, setUserName] = useState('');

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[480px] h-[551px] bg-white p-6 rounded-lg opacity-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Password Recovery</h1>
          <p className="mt-2 text-gray-600">
            Enter the email address associated with your account and we'll send you a link to reset your password.
          </p>
        </div>
        <form className="space-y-6" noValidate>
          <div>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md py-4 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setUserName(e.target.value)}
              autoFocus
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#004C7B] text-white rounded-lg py-2 hover:bg-[#003a6e]"
          >
            Send password reset instructions
          </Button>
        </form>
      </div>
    </div>
  );
}
