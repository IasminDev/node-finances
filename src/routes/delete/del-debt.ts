import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function delDebt(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:userId/debts/:debtId",
    {
      schema: {
        summary: "Delete one debt from one user",
        tags: ["debts"],
        params: z.object({
          userId: z.string().uuid(),
          debtId: z.number().int(),
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
      const { userId, debtId } = request.params;

      const debt = await prisma.debt.findUnique({
        where: {
          userId: userId,
          id: debtId,
        },
      });
      if (debt === null) {
        return reply.status(400).send({ message: "Debt not found" });
      }
      await prisma.debt.delete({
        where: {
          id: debtId,
        },
      });
      reply.code(204).send({ message: "Debt deleted successfully" });
    }
  );
}
