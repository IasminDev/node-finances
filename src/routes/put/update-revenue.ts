import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function updateRevenue(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:userId/revenues/:revenueId",
    {
      schema: {
        summary: "Update a revenue data",
        tags: ["revenues"],
        params: z.object({
          userId: z.string().uuid(),
          revenueId: z.string(),
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
            saving: z.object({
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
      const { userId, revenueId } = request.params;
      const { description, amount, status, date } = request.body;

      const saving = await prisma.saving.findUnique({
        where: {
          id: parseInt(revenueId),
          userId: userId,
        },
      });
      if (saving === null) {
        return reply.status(400).send({ message: "Revenue not found" });
      }

      const updateSaving = await prisma.saving.update({
        where: {
          id: parseInt(revenueId),
          userId: userId,
        },
        data: {
          description: description ?? saving.description,
          amount: amount ?? saving.amount,
          status: status ?? saving.status,
          date: date ?? saving.date,
        },
      });
      return reply.status(200).send({
        saving: updateSaving,
      });
    }
  );
}
