import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function updateUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/users/:userId",
    {
      schema: {
        summary: "Update a user data",
        tags: ["users"],
        params: z.object({
          userId: z.string().uuid(),
        }),
        headers: z.object({
          token: z.string(),
        }),
        body: z
          .object({
            name: z.string().min(4),
            email: z.string().email(),
            plan: z.string(),
          })
          .partial(),
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
      const { name, email, plan } = request.body;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user === null) {
        return reply.status(400).send({ message: "User not found" });
      }

      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name ?? user.name,
          email: email ?? user.email,
          plan: plan ?? user.plan,
        },
      });
      return reply.status(200).send({
        user: updateUser,
      });
    }
  );
}
