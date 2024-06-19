import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function allDebts(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:userId/debts",
    {
      schema: {
        summary: "Get all debts from one user",
        tags: ["debts"],
        params: z.object({
          userId: z.string().uuid(),
        }),
        headers: z.object({
          token: z.string(),
        }),
        responses: {
          200: z.object({
            debts: z.object({
              id: z.number(),
              description: z.string(),
              amount: z.number(),
              status: z.string(),
              date: z.string().datetime(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId } = request.params;

      const debts = await prisma.debt.findMany({
          select: {
            id: true,
            description: true,
            amount: true,
            status: true,
            date: true,
          },
          where: {
            userId,
          },
        })
      return reply.send({
        debts: debts.map((debt) => {
          return {
            id: debt.id,
            description: debt.description,
            status: debt.status,
            date: debt.date,
            amount: debt.amount,
          };
        }),
      });
    }
  );
}
