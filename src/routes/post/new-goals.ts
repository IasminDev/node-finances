import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function newGoal(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:userId/goals",
    {
      schema: {
        summary: "Add a goal for one user",
        tags: ["goals"],
        body: z.object({
          description: z.string(),
          value: z.number(),
          date: z.string().datetime(),
        }),
        params: z.object({
          userId: z.string().uuid(),
        }),
        headers: z.object({
          token: z.string(),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId } = request.params;
      const { description, value, date } = request.body;

      const goal = await prisma.goal.create({
        data: {
          description,
          value,
          date,
          userId,
        },
      });

      return reply.status(201).send({ message: "Goal add successfully" });
      return reply.status(401).send({ message: "Invalid" });
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  );
}
