import {
  Body,
  Controller,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-taskdto';
import { GetStatusFilterDto } from './dto/get-tasks-filter-dto';
import { TasksStatusValidaionPipe } from './pipes/tasks-status-validtion-pipe';

@Controller('tasks')
export class TasksController {
  /**
   *
   */
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetStatusFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      console.log(filterDto);
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Patch('/:id/inprogress')
  UpdateTaskById(@Param('id', TasksStatusValidaionPipe) id: string): void {
    return this.tasksService.changeTaskStatus(id, TaskStatus.IN_PROGRESS);
  }

  @Patch('/:id/done')
  CompleteTaskById(@Param('id', TasksStatusValidaionPipe) id: string): void {
    this.tasksService.changeTaskStatus(id, TaskStatus.DONE);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTask: CreateTaskDto): Task {
    return this.tasksService.createTask(createTask);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
