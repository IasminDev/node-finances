import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function delGoal(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:userId/goals/:goalId",
    {
      schema: {
        summary: "Delete one goal from one user",
        tags: ["goals"],
        params: z.object({
          userId: z.string().uuid(),
          goalId: z.number().int(),
        }),
        headers: z.object({
          token: z.string(),
        }),
        responses: {
          204: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId, goalId } = request.params;

      const goal = await prisma.goal.findUnique({
        where: {
          userId: userId,
          id: goalId,
        },
      });
      if (goal === null) {
        return reply.status(400).send({ message: "Goal not found" });
      }
      await prisma.goal.delete({
        where: {
          id: goalId,
        },
      });
      reply.code(204).send({ message: "Goal deleted successfully" });
    }
  );
}
