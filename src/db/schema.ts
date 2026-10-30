import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/** A wandering soul who steps into the Sabha (login identity). */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** A vacancy — one sacred seat in the Vanara Sena. */
export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  sanskritTitle: text("sanskrit_title").notNull(),
  department: text("department").notNull(),
  realm: text("realm").notNull(),
  type: text("type").notNull(),
  experience: text("experience").notNull(),
  salary: text("salary").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  duties: text("duties").array().notNull(),
  requisites: text("requisites").array().notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** An arrow fired at a target — a job application. */
export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  jobId: uuid("job_id")
    .references(() => jobs.id, { onDelete: "cascade" })
    .notNull(),
  years: text("years").notNull(),
  portfolio: text("portfolio"),
  oath: text("oath").notNull(),
  status: text("status").default("Fired").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type Application = typeof applications.$inferSelect;
