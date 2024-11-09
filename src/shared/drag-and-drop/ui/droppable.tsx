import { useDroppable } from "@dnd-kit/core";

import type { ReactNode } from "react";

type DroppableType = {
  id: string;
  children: ReactNode;
  className?: string;
};

export const Droppable = ({ id, children, className }: DroppableType) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className={className} ref={setNodeRef}>
      {children}
    </div>
  );
};
