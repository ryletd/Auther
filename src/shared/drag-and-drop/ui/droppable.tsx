import { useDroppable } from "@dnd-kit/core";

import type { ReactNode } from "react";

type DroppableType = {
  id: string;
  children: ReactNode;
  className?: string;
};

export const Droppable = ({ id, children, className }: DroppableType) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  console.log(isOver);
  return (
    <div className={className} ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
