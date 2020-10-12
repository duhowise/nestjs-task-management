import { TaskStatus } from '../task.model';
export class GetStatusFilterDto {
  status: TaskStatus;
  search: string;
}
