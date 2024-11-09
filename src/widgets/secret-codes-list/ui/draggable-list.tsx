import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable, DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import type { HTMLAttributes, ReactNode } from "react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { Secret } from "@/shared";

type DraggableListProps = {
  id: string;
  secrets: Secret[];
  children: ReactNode;
};

type DraggableProps = {
  id: string;
  children: (
    ref: (element: HTMLElement | null) => void,
    dragHandleProps: DraggableAttributes | SyntheticListenerMap,
    style: any
  ) => ReactNode;
};

export const DraggableList = ({ id, secrets, children }: DraggableListProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <DndContext>
      <SortableContext items={secrets.map(({ secret }) => secret)} strategy={verticalListSortingStrategy}>
        <div className="drop-wrapper" ref={setNodeRef}>
          {children}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export const Draggable = ({ id, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return children(
    setNodeRef,
    { ...attributes, ...listeners },
    { transition, transform: CSS.Transform.toString(transform), zIndex: transform ? 1000 : "auto" }
  );
};
