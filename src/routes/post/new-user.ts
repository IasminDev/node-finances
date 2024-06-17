import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function newUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        summary: "Create a new user",
        tags: ["users"],
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
          password: z.string().min(8),
          plan: z.string(),
        }),
        response: {
          201: z.object({
            userId: z.string().uuid(),
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
      const { name, email, password, plan } = request.body;

      const userEmail = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (userEmail) {
        return reply
          .status(401)
          .send({ message: "User already exists with this email." });
      }
      try {
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hash,
            plan,
          },
        });

        return reply.status(201).send({ userId: user.id });
      } catch (e) {
        return reply.status(500).send({ message: "Internal Server Error" });
      }
    }
  );
}
