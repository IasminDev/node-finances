import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function delRevenue(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:userId/revenues/:revenue",
    {
      schema: {
        summary: "Delete one revenue from one user",
        tags: ["revenues"],
        params: z.object({
          userId: z.string().uuid(),
          revenueId: z.number().int(),
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
      const { userId, revenueId } = request.params;

      const saving = await prisma.saving.findUnique({
        where: {
          userId: userId,
          id: revenueId,
        },
      });
      if (saving === null) {
        return reply.status(400).send({ message: "Revenue not found" });
      }
      await prisma.saving.delete({
        where: {
          id: revenueId,
        },
      });
      reply.code(204).send({ message: "Revenue deleted successfully" });
    }
  );
}
