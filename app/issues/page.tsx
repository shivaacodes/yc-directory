"use client";

import React, { useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import Loader from "../components/Loader";

const NewIssue = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <div className="font-extrabold mt-12 p-6 justify-center items-center flex flex-col gap-4">
      <Button onClick={handleClick}>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
      {loading && <Loader />}
    </div>
  );
};

export default NewIssue;
