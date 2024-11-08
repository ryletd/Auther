export type Secret = {
  id: string;
  name: string;
  // Secret code
  secret: string;
  // Position for Drag&Drop
  position: number;
  icon: string | null;
  addedDate: number;
};
