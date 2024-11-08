import { useEffect, useState } from "react";

import { checkPictureExists } from "@/shared";

export const usePictureExists = (url: string | null) => {
  const [exists, setExists] = useState<boolean>(false);

  useEffect(() => {
    if (url) {
      checkPictureExists(url).then(setExists);
      return;
    }

    setExists(false);
  }, [url]);

  return exists;
};
