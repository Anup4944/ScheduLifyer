"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserNameFormValues, userNameSchema } from "@/lib/validators";
import { useFetch } from "@/hooks/useFetch";
import { updateUserName } from "@/actions/users";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [origin, setOrigin] = useState<string>("");
  const { isLoaded, user } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver<UserNameFormValues>(userNameSchema),
  });

  useEffect(() => {
    setOrigin(window.location.origin);
    setValue("username", user?.username);
  }, [isLoaded]);

  const { loading, error, updateUserNameFn } = useFetch(updateUserName);

  const onSubmit = async (data) => {
    updateUserNameFn(data.username);
  };
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName}</CardTitle>
        </CardHeader>
        {/* Latest Updates below */}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your unique name</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex items-center gap-2">
                <span>{origin}/</span>
                <Input {...register("username")} placeholder="Username" />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.username?.message}
                </p>
              )}
              {error && (
                <p className="text-red-500 text-sm mt-1">{error?.message}</p>
              )}
            </div>
            {loading && (
              <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}
            <Button type="submit">Update Username</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
