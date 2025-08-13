'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from './login';
import Register from './register';

export default function AuthLayout() {
  return (
    <div className="mx-auto my-10 flex max-w-6xl items-center justify-center">
      <div className="mx-auto h-[500px] w-[450px] rounded-2xl bg-white p-4">
        <h1 className="my-3 text-center text-2xl font-semibold text-black">
          Welcome!
        </h1>

        <Tabs defaultValue="login" className="text-black">
          <TabsList className="w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="register">
            <Register />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
