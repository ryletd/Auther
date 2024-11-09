import { cloneElement } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { ReactElement } from "react";

type DraggableProps = {
  id: string;
  children: ReactElement;
};

export const Draggable = ({ id, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 1000 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {cloneElement(children, {
        dragHandleProps: { ...attributes, ...listeners },
      })}
    </div>
  );
};
