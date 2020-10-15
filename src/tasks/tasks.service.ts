import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-taskdto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
  /**
   *
   */
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // private tasks: Task[] = [];
  // getTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(searchFilter: GetStatusFilterDto): Task[] {
  //   const { status, search } = searchFilter;
  //   if (status) {
  //     this.tasks = this.tasks.filter(task => task.status == status);
  //   }
  //   if (search) {
  //     this.tasks = this.tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return this.tasks;
  // }
  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (task == null) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return task;
  }
  // changeTaskStatus(id: string, status: TaskStatus) {
  //   const taskToUpdate = this.getTaskById(id);
  //   taskToUpdate.status = status;
  // }
  async createTask(createTask: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTask);
  }
  // deleteTask(id: string) {
  //   const taskTodelete = this.getTaskById(id);
  //   this.tasks.filter(task => task.id == taskTodelete.id);
  // }
}
