export type ActionResult = {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
};

export const initialActionState: ActionResult = {
  success: false,
  message: "",
  errors: {},
};