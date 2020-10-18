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
        private taskRepository: TaskRepository
    ) {
    }

    async getTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    //getTasksWithFilters(searchFilter: GetStatusFilterDto): Promise<Task[]> {
    //    const { status, search } = searchFilter;
    //    if (status) {
    //        return this.taskRepository.find({ status:status});
    //    }
    //    if (search) {
    //        this.tasks = this.tasks.filter(
    //            task =>
    //            task.title.includes(search) || task.description.includes(search),
    //        );
    //    }
    //    return this.tasks;
    //}

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        if (task == null) {
            throw new NotFoundException(`Task with id "${id}" not found`);
        }
        return task;
    }

    async changeTaskStatus(id: number, status: TaskStatus) {
        const taskToUpdate = await this.getTaskById(id);
        taskToUpdate.status = status;
        taskToUpdate.save();
    }

    async createTask(createTask: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTask);
    }

    async deleteTask(id: number) {
        return this.taskRepository.delete(id);
    }
}