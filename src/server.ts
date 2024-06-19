import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { login } from "./routes/post/login";

import { newUser } from "./routes/post/new-user";
import { newDebt } from "./routes/post/new-debts";
import { newGoal } from "./routes/post/new-goals";
import { newRevenue } from "./routes/post/new-revenue";

import { findUser } from "./routes/get/find-user";
import { allDebts } from "./routes/get/all-debts";
import { allGoals } from "./routes/get/all-goals";
import { allRevenues } from "./routes/get/all-revenues";

import { updateUser } from "./routes/put/update-user";
import { updateDebt } from "./routes/put/update-debt";
import { updateGoal } from "./routes/put/update-goal";
import { updateRevenue } from "./routes/put/update-revenue";

import { delUser } from "./routes/delete/del-user";
import { delDebt } from "./routes/delete/del-debt";
import { delGoal } from "./routes/delete/del-goal";
import { delRevenue } from "./routes/delete/del-revenue";
import fastifyCors from "@fastify/cors";
require("dotenv").config();

const app = fastify({ logger: true });
app.register(fastifyCors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'token'],
})

const SECRET = process.env.JWT_SECRET;

// Register the Zod compiler
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyJwt, {
  secret: SECRET as string,
});

app.register(fastifyCookie);

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "finances.api",
      description: "API specifications for the Finances application back-end.",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.get("/", () => {
  return "Finances API";
});

// Register routes
app.register(login);
app.register(newUser);
app.register(newRevenue);
app.register(newGoal);
app.register(newDebt);

app.register(findUser);
app.register(allRevenues);
app.register(allGoals);
app.register(allDebts);

app.register(updateUser);
app.register(updateRevenue);
app.register(updateGoal);
app.register(updateDebt);

app.register(delUser);
app.register(delRevenue);
app.register(delGoal);
app.register(delDebt);


app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running on http://localhost:3333");
});
