export interface Employee {
    id: number;
    name: string;
  }
  
  export interface Task {
    id: number;
    description: string;
    employee_id: number;
    hours_spent: number;
    hourly_rate: number;
    additional_charges?: number;
    total_remuneration: number;
    employee?: Employee;
  }