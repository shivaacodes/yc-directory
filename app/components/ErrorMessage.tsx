import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    //otherwise we return error message
    <Text color="red" as="p" className="mt-2>">
      {children}
    </Text>
  );
};

export default ErrorMessage;
