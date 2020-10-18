import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-taskdto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { GetStatusFilterDto } from './dto/get-tasks-filter-dto';

@Controller('tasks')
export class TasksController {
  /**
   *
   */

  /**
   *
   */
  constructor(private tasksService: TasksService) {}

   @Get()
   async getTasks(@Query(ValidationPipe) filterDto: GetStatusFilterDto): Promise<Task[]> {
     //if (Object.keys(filterDto).length) {
     //  console.log(filterDto);
     //  return this.tasksService.getTasksWithFilters(filterDto);
     //}
     return await this.tasksService.getTasks();
   }
  @Get('/:id')
 async getTaskById(@Param('id',ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id);
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
