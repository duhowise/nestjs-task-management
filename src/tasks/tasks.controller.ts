import { Body, Controller, Param } from '@nestjs/common';
import {
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
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

  @Get('/:id') getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  } 
  
  @Patch('/:id/inprogress') UpdateTaskById(@Param('id') id: string): void {
    return this.tasksService.changeTaskStatus(id,TaskStatus.IN_PROGRESS);
  }
  
  @Patch('/:id/done') CompleteTaskById(@Param('id') id: string): void {
     this.tasksService.changeTaskStatus(id,TaskStatus.DONE);
  }

  @Post() createTask(@Body() createTask: CreateTaskDto): Task {
    return this.tasksService.createTask(createTask);
  }
  @Delete('/:id') deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
