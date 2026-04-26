import { z } from 'zod';
import nowJson from '../content/now.json';
import experienceJson from '../content/experience.json';
import writingJson from '../content/writing.json';
import projectsJson from '../content/projects.json';
import speakingJson from '../content/speaking.json';
import customersJson from '../content/customers.json';

export const NowSchema = z.object({
  date: z.string(),
  bullets: z.array(z.string()).min(1),
});

export const ExperienceCardSchema = z.object({
  company: z.string(),
  role: z.string(),
  start: z.string(),
  end: z.string(),
  location: z.string().optional(),
  scope: z.string(),
  outcome: z.string(),
  depth: z.string(),
  customers: z.array(z.string()).optional(),
});

export const ExperienceSchema = z.array(ExperienceCardSchema);

export const WritingCardSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  date: z.string(),
  hook: z.string(),
  impressions: z.number().int().nonnegative(),
  tag: z.enum(['strategy', 'builder', 'leader']),
  featured: z.boolean(),
});
export const WritingSchema = z.array(WritingCardSchema);

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  blurb: z.string(),
  cta: z.object({ label: z.string(), url: z.string() }),
  detailPage: z.string().optional(),
});
export const ProjectsSchema = z.array(ProjectSchema);

export const SpeakingSchema = z.object({
  workshop: z.object({
    title: z.string(),
    url: z.string().url(),
    nextSession: z.string().nullable(),
  }),
  past: z.array(z.object({
    title: z.string(),
    venue: z.string(),
    year: z.number().int(),
    url: z.string().url().optional(),
  })),
});

export const CustomerSchema = z.object({
  name: z.string(),
  logoSlug: z.string(),
});
export const CustomersSchema = z.record(z.string(), z.array(CustomerSchema));

export const now = NowSchema.parse(nowJson);
export const experience = ExperienceSchema.parse(experienceJson);
export const writing = WritingSchema.parse(writingJson);
export const projects = ProjectsSchema.parse(projectsJson);
export const speaking = SpeakingSchema.parse(speakingJson);
export const customers = CustomersSchema.parse(customersJson);
