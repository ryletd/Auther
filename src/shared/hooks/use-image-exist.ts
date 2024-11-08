import { useEffect, useState } from "react";
import { checkImageExists } from "../utils";

export const useImageExists = (url: string | null) => {
  const [exists, setExists] = useState<boolean>(false);

  useEffect(() => {
    if (url) {
      checkImageExists(url).then((result) => setExists(result));
    } else {
      setExists(false);
    }
  }, [url]);

  return exists;
};
