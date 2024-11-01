"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueSchema>; //integrated react hook form with zod

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data); // returns a promise, send data to the api
      router.push("/issues"); //then send the user to the issues page
    } catch (error) {
      console.log("Error:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mt-6 mb-4 mr-52 ml-52">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="mt-12 p-12 flex flex-col gap-4 max-w-xl space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root
          placeholder="title..." // radix-ui component
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description" //react-hook form component
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="description" /> //for drop-down
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
