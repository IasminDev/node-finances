import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function login(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        summary: "User login",
        tags: ["auth"],
        body: z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
        response: {
          200: z.object({
            accessToken: z.string(),
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
      const { email, password } = request.body;

      try {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          return reply
            .status(401)
            .send({ message: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return reply
            .status(401)
            .send({ message: "Invalid email or password." });
        }

        // Create JWT token
        const token = app.jwt.sign({
          id: user.id,
          email: user.email,
          name: user.name,
        });

        // Set cookie with token
        reply.setCookie("access_token", token, {
          path: "/",
          httpOnly: true,
          secure: true,
        });

        return { accessToken: token, message: "Login make successfully" };
      } catch (error) {
        console.error("Login error:", error);
        return reply.status(500).send({ message: "Internal Server Error" });
      }
    }
  );
}
