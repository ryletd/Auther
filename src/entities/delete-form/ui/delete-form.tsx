import { Button } from "@/shared";

import "./delete-form.sass";

type DeleteFormProps = {
  name: string;
  onCancel: () => void;
  onDelete: () => void;
};

export const DeleteForm = ({ name, onCancel, onDelete }: DeleteFormProps) => (
  <div className="delete-form">
    <h2 className="title">
      Delete <span>{name}</span> secret code
    </h2>
    <div className="buttons">
      <Button className="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button className="button" onClick={onDelete}>
        Delete
      </Button>
    </div>
  </div>
);
