import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.status.enum';

export class TasksStatusValidaionPipe implements PipeTransform {
  readonly allowedStates = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: any) {
    if (!this.IsStatusValid(value)) {
      throw new BadRequestException(`${value} is not a valid status`);
    }
  }

  private IsStatusValid(status: any): boolean {
    return this.allowedStates.indexOf(status) !== -1;
  }
}
