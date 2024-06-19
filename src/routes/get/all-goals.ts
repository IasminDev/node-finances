import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function allGoals(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:userId/goals",
    {
      schema: {
        summary: "Get all goals from one user",
        tags: ["goals"],
        params: z.object({
          userId: z.string().uuid(),
        }),
        headers: z.object({
          token: z.string(),
        }),
        responses: {
          200: z.object({
            goals: z.object({
              id: z.number(),
              description: z.string(),
              value: z.number(),
              date: z.string().datetime(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId } = request.params;

      const goals = await prisma.goal.findMany({
          select: {
            id: true,
            description: true,
            value: true,
            date: true,
          },
          where: {
            userId,
          },
        })
      return reply.send({
        goals: goals.map((goal) => {
          return {
            id: goal.id,
            description: goal.description,
            value: goal.value,
            date: goal.date,
          };
        }),
      });
    }
  );
}
