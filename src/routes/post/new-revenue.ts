import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function newRevenue(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:userId/revenues",
    {
      schema: {
        summary: "Add a revenue for one user",
        tags: ["revenues"],
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
          400: z.object({
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

      try {
        const saving = await prisma.saving.create({
          data: {
            description,
            amount,
            status,
            date,
            userId,
          },
        });
        if (!description || !amount || !status || !date || !userId) {
          return reply.status(400).send({ message: "Something invalid" });
        }

        return reply.status(201).send({ message: "Revenue add successfully" });
      } catch {
        return reply.status(500).send({ message: "Internal Server Error" });
      }
    }
  );
}
