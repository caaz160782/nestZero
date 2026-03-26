import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  // 🔍 Buscar por ID
  getTaskById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  // ❌ Eliminar por ID
  deleteTask(id: string): void {
    const found = this.getTaskById(id); // reutilizamos lógica
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.getTaskById(id);

    const { title, description, status } = updateTaskDto;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    return task;
  }
}
