import { Body, Controller, Get, Post, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // 📋 Obtener todas las tareas
    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    // 🔍 Obtener tarea por ID
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    // ➕ Crear tarea
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    // ❌ Eliminar tarea
    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id);
    }
    
    // ✏️ UPDATE
    @Patch('/:id')
    updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto
    ): Task {
        return this.tasksService.updateTask(id, updateTaskDto);
    }
}