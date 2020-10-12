import { Body, Controller, Param, Query } from '@nestjs/common';
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

@Controller('tasks')
export class TasksController {
  /**
   *
   */
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetStatusFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getTasks();
  }

  @Get('/:id') getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Patch('/:id/inprogress') UpdateTaskById(@Param('id') id: string): void {
    return this.tasksService.changeTaskStatus(id, TaskStatus.IN_PROGRESS);
  }

  @Patch('/:id/done') CompleteTaskById(@Param('id') id: string): void {
    this.tasksService.changeTaskStatus(id, TaskStatus.DONE);
  }

  @Post() createTask(@Body() createTask: CreateTaskDto): Task {
    return this.tasksService.createTask(createTask);
  }
  @Delete('/:id') deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
