import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function updateDebt(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:userId/debts/:debtId",
    {
      schema: {
        summary: "Update a debt data",
        tags: ["debts"],
        params: z.object({
          userId: z.string().uuid(),
          debtId: z.number().int(),
        }),
        headers: z.object({
          token: z.string(),
        }),
        body: z
          .object({
            description: z.string(),
            amount: z.number(),
            status: z.string(),
            date: z.string().datetime(),
          })
          .partial(),
        responses: {
          200: z.object({
            debt: z.object({
              id: z.number(),
              description: z.string(),
              amount: z.number(),
              status: z.string(),
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
      const { userId, debtId } = request.params;
      const { description, amount, status, date } = request.body;

      const debt = await prisma.debt.findUnique({
        where: {
          id: debtId,
          userId: userId,
        },
      });
      if (debt === null) {
        return reply.status(400).send({ message: "debt not found" });
      }

      const updateDebt = await prisma.debt.update({
        where: {
          id: debtId,
          userId: userId,
        },
        data: {
          description: description ?? debt.description,
          amount: amount ?? debt.amount,
          status: status ?? debt.status,
          date: date ?? debt.date,
        },
      });
      return reply.status(200).send({
        debt: updateDebt,
      });
    }
  );
}
