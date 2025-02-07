export type Task = {
  id: number;
  title: string;
  description: string;
  status_id: number;
  create_by: number;
  update_by: number | null;
  delete_by: number | null;
  assigned_to: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type TaskList = {
  id: number;
  title: string;
  description: string;
  status: string;
  status_id: number;
  assigned_to: number;
  created_by_name: string;
  create_by: number;
  update_by: number | null;
  delete_by: number | null;
  assigned_to_name: string;
  created_at: string;
  updated_at: string;
};

export type Team = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  role_id: number;
};

export interface TaskPayload {
  id: string;
  title: string;
  description: string;
  status_id: string;
  assigned_to: string;
}

export interface TaskDataCarier {
  id: string;
  title: string;
  description: string;
  status: string;
  assigned_to_name: string;
}

export type AddTaskState = {
  title: string;
  team: Team[];
  description: string;
  assignedTo: string;
  selectedStatusId: string;
  status: string;
};

export type AddTaskActions = {
  type:
    | "SET_TITLE"
    | "SET_Team"
    | "SET_DESCRIPTION"
    | "SET_ASSIGNED_TO"
    | "SET_STATUS"
    | "SET_SELECTED_STATUS_ID";
  payload?: string | TaskList | Team | [];
};
