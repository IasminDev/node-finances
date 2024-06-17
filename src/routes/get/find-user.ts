import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function findUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/users/:userId",
    {
      schema: {
        summary: "Get a user data",
        tags: ["users"],
        params: z.object({
          userId: z.string().uuid(),
        }),
        headers: z.object({
          token: z.string(),
        }),
        responses: {
          200: z.object({
            user: z.object({
              name: z.string().min(4),
              email: z.string().email(),
              plan: z.string(),
              registrationDate: z.string().datetime(),
            }),
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
        select: {
          name: true,
          email: true,
          plan: true,
          registrationDate: true,
        },
        where: {
          id: userId,
        },
      });
      if (user === null) {
        return reply.status(400).send({ message: "User not found" });
      }
      return reply.status(200).send({
        user: {
          name: user.name,
          email: user.email,
          plan: user.plan,
          registrationDate: user.registrationDate,
        },
      });
    }
  );
}
