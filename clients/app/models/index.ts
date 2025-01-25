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
