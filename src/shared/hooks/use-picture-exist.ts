import { useEffect, useState } from "react";
import { checkPictureExists } from "../utils";

export const usePictureExists = (url: string | null) => {
  const [exists, setExists] = useState<boolean>(false);

  useEffect(() => {
    url ? checkPictureExists(url).then(setExists) : setExists(false);
  }, [url]);

  return exists;
};
