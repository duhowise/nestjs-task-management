import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-taskdto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  /**
   *
   */

  /**
   *
   */
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetStatusFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     console.log(filterDto);
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   }
  //   return this.tasksService.getTasks();
  // }
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  // @Patch('/:id/inprogress')
  // UpdateTaskById(@Param('id', TasksStatusValidaionPipe) id: string): void {
  //   return this.tasksService.changeTaskStatus(id, TaskStatus.IN_PROGRESS);
  // }
  // @Patch('/:id/done')
  // CompleteTaskById(@Param('id', TasksStatusValidaionPipe) id: string): void {
  //   this.tasksService.changeTaskStatus(id, TaskStatus.DONE);
  // }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTask: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTask);
  }
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string) {
  //   return this.tasksService.deleteTask(id);
  // }
}
