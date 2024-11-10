import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable, DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { reorderSecretPosition } from "@/shared";

import { ListItem } from "../../list-item";

import "./draggable-list.sass";

import { type Dispatch, type SetStateAction, type CSSProperties, type ReactNode, act } from "react";
import type { DraggableAttributes, DragEndEvent } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { Secret } from "@/shared";

type DraggableListProps = {
  id: string;
  secrets: Secret[];
  progress: number;
  setActiveEditSecret?: Dispatch<SetStateAction<Secret | null>>;
  setActiveDeleteSecret?: Dispatch<SetStateAction<Secret | null>>;
};

type DraggableProps = {
  id: string;
  children: (
    ref: (element: HTMLElement | null) => void,
    dragHandleProps: DraggableAttributes | SyntheticListenerMap,
    style: CSSProperties
  ) => ReactNode;
};

const Draggable = ({ id, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return children(
    setNodeRef,
    { ...attributes, ...listeners },
    { transition, transform: CSS.Transform.toString(transform), zIndex: transform ? 1000 : "auto" }
  );
};

export const DraggableList = ({
  id,
  secrets,
  progress,
  setActiveDeleteSecret,
  setActiveEditSecret,
}: DraggableListProps) => {
  const { setNodeRef } = useDroppable({ id });

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over) {
      reorderSecretPosition(String(active.id), String(over.id));
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext items={secrets.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
        <div className="draggable-wrapper" ref={setNodeRef}>
          {secrets.map((secret) => (
            <Draggable id={secret.id} key={secret.id}>
              {(ref, dragHandleProps, style) => (
                <div ref={ref} style={style}>
                  <ListItem
                    secret={secret}
                    progress={progress}
                    onEdit={setActiveEditSecret}
                    onDelete={setActiveDeleteSecret}
                    dragHandleProps={dragHandleProps}
                  />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
