import { defineCollection, z } from 'astro:content';

const components = defineCollection({
	type: 'content',
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: z.string(),
			order: z.number()
		})
});

export const collections = { components };
