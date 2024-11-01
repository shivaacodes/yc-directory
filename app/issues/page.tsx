import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const NewIssue = () => {
  return (
    <div className="font-extrabold mt-12 p-6 justify-center items-center flex flex-col gap-4">
      <Button>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
    </div>
  );
};

export default NewIssue;
