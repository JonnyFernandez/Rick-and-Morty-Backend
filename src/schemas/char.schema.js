const { z } = require('zod')

const postCharSchema = z.object({
    name: z.string({ required_error: 'name is required' }).min(3, { message: 'Name must be at least 3 characters' }),
    status: z.string({ required_error: 'status is required' }),
    species: z.string({ required_error: 'species is required' }),
    // species: z.array(z.string({ required_error: 'each species must be a string' })),
    gender: z.string({ required_error: 'gender is required' }),
    origin: z.string({ required_error: 'origin is required' }),
    image: z.string({ required_error: 'image is required' }),
});

module.exports = { postCharSchema }