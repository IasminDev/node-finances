import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function updateGoal(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:userId/goals/:goalId",
    {
      schema: {
        summary: "Update a goal data",
        tags: ["goals"],
        params: z.object({
          userId: z.string().uuid(),
          goalId: z.string(),
        }),
        headers: z.object({
          token: z.string(),
        }),
        body: z
          .object({
            description: z.string(),
            value: z.number(),
            date: z.string().datetime(),
          })
          .partial(),
        responses: {
          200: z.object({
            goal: z.object({
              id: z.number(),
              description: z.string(),
              value: z.number(),
              date: z.string().datetime(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId, goalId } = request.params;
      const { description, value, date } = request.body;

      const goal = await prisma.goal.findUnique({
        where: {
          id:parseInt(goalId),
          userId: userId,
        },
      });
      if (goal === null) {
        return reply.status(400).send({ message: "goal not found" });
      }

      const updateGoal = await prisma.goal.update({
        where: {
          id:parseInt(goalId),
          userId: userId,
        },
        data: {
          description: description ?? goal.description,
          value: value ?? goal.value,
          date: date ?? goal.date,
        },
      });
      return reply.status(200).send({
        goal: updateGoal,
      });
    }
  );
}
