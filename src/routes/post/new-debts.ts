import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function newDebt(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:userId/debts",
    {
      schema: {
        summary: "Add a debt for one user",
        tags: ["debts"],
        body: z.object({
          description: z.string(),
          amount: z.number(),
          status: z.string(),
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
      const { description, amount, status, date } = request.body;

      const debt = await prisma.debt.create({
        data: {
          description,
          amount,
          status,
          date,
          userId,
        },
      });

      return reply.status(201).send({ message: "Debt add successfully" });
      return reply.status(401).send({ message: "Invalid" });
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  );
}
