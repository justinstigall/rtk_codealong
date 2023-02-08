import fastify from 'fastify';
import cors from '@fastify/cors';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { nanoid } from 'nanoid';
import { TodoItemSchema, TodoList, TodoListSchema } from '@bp/shared';

const app = fastify({
    logger: {
        level: "debug",
    }
});

app.register(cors);
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const database: TodoList = [
    {
        id: nanoid(10),
        title: "todo 1",
        notes: "todo 1 notes",
        completed: false,
        category: "Personal",
        tags: ["😍", "👍"]
    },
    {
        id: nanoid(10),
        title: "todo 2",
        notes: "todo 2 notes",
        completed: true,
        category: "Work",
        tags: ["💰", "👍"]
    }
]

app.get('/', async (request, reply) => {
    reply.send("hello world");
});

app.route({
    method: 'GET',
    url: '/api/todolist',
    preHandler: async (request, reply) => {
        const parseResult = await TodoListSchema.safeParseAsync(database);
        if (!parseResult.success) reply.code(500).send({ error: "bad database info" });
    },
    handler: async (request, reply) => {
        reply.send(database);
    }
});

// Create new Todo Item
app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/api/todoitem',
    schema: {
        body: TodoItemSchema,
    },
    handler: async (request, reply) => {
        const index = database.findIndex(a => a.id === request.body.id);
        if (index === -1) {
            database.push(request.body)
            reply.status(200).send("item added");
        } else {
            reply.status(500).send("duplicate item");
        }
    }
});

// Update Todo Item
app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PUT',
    url: '/api/todoitem',
    schema: {
        body: TodoItemSchema,
    },
    handler: async (request, reply) => {
        const index = database.findIndex(a => a.id === request.body.id);
        if (index === -1) {
            reply.status(404).send("item not found")
        } else {
            database[index] = request.body;
            reply.status(200).send(`item ${request.body.id} updated`);
        }
    }
})

// Delete Todo Item
app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/api/todoitem',
    schema: {
        body: TodoItemSchema,
    },
    handler: async (request, reply) => {
        const index = database.findIndex(a => a.id === request.body.id);
        if (index === -1) {
            reply.status(404).send("item not found")
        } else {
            database.splice(index, 1);
            reply.status(200).send(`item ${request.body.id} deleted`);
        }
    }
})

const startServer = async () => {
    try {
        await app.listen({ port: 8888 });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

startServer();