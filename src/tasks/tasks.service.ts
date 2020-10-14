import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-taskdto';
import { GetStatusFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(searchFilter: GetStatusFilterDto): Task[] {
    const { status, search } = searchFilter;
    if (status) {
      this.tasks = this.tasks.filter(task => task.status == status);
    }
    if (search) {
      this.tasks = this.tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return this.tasks;
  }
  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (task == null) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return task;
  }

  changeTaskStatus(id: string, status: TaskStatus) {
    const taskToUpdate = this.getTaskById(id);
    taskToUpdate.status = status;
  }

  createTask(createTask: CreateTaskDto): Task {
    const { title, description } = createTask;
    const task: Task = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    const taskTodelete = this.getTaskById(id);
    this.tasks.filter(task => task.id == taskTodelete.id);
  }
}
