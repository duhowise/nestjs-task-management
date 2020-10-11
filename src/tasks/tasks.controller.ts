import { Body, Controller } from '@nestjs/common';
import {
  Get,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-taskdto';

@Controller('tasks')
export class TasksController {
  /**
   *
   */
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post() createTask(@Body() createTask: CreateTaskDto): Task {
    return this.tasksService.createTask(createTask);
  }
}
