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