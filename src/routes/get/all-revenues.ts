import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function allRevenues(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:userId/revenues",
    {
      schema: {
        summary: "Get all revenues from one user",
        tags: ["revenues"],
        params: z.object({
          userId: z.string().uuid(),
        }),
        headers: z.object({
          token: z.string(),
        }),
        responses: {
          200: z.object({
            savings: z.object({
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

      const savings = await prisma.saving.findMany({
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
        savings: savings.map((saving) => {
          return {
            id: saving.id,
            description: saving.description,
            amount: saving.amount,
            status: saving.status,
            date: saving.date,
          };
        }),
      });
    }
  );
}
