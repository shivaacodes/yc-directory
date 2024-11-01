"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
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
        <Callout.Root color="red">
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

        <Controller
          name="description" //react-hook form component
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="description" /> //for drop-down
          )}
        />

        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
