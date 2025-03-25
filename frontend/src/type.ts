export interface iEmployee {
  id: number;
  name: string;
}

export interface iTaskDetails {
  id: number;
  employee_name: string;
  task_description: string;
  employee_id: number;
  hours_spent: number;
  date: string;
  hourly_rate: number;
  additional_charges?: number;
  total_remuneration: number;
  employee?: iEmployee;
}

export interface Task {
  id: number;
  description: string;
  taskDetails: iTaskDetails;
}