import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function delUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/users/:userId",
    {
      schema: {
        summary: "Delete one user",
        tags: ["users"],
        params: z.object({
          userId: z.string().uuid(),
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
      const { userId } = request.params;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user === null) {
        return reply.status(400).send({ message: "User not found" });
      }
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      reply.code(204).send({ message: "User deleted successfully" });
    }
  );
}
