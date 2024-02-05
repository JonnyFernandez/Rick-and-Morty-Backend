const { z } = require('zod');

const favSchema = z.object({
    name: z.string({ required_error: 'name is required' }).min(3, { message: 'Name must be at least 3 characters' }),
    status: z.string({ required_error: 'status is required' }).refine(value => ['Vivo', 'Muerto', 'Unknow'].includes(value), {
        message: 'Invalid status value, must be one of: Vivo, Muerto, Unknow'
    }),
    species: z.string({ required_error: 'species is required' }).refine(value => ['Humano', 'Alien', 'Robot'].includes(value), {
        message: 'Invalid species value, must be one of: Humano, Alien, Robot'
    }),
    gender: z.string({ required_error: 'gender is required' }).refine(value => ['Male', 'Female', 'Unknow'].includes(value), {
        message: 'Invalid gender value, must be one of: Male, Female, Unknow'
    }),
    origin: z.string({ required_error: 'origin is required' }).optional(),
    image: z.string({ required_error: 'image is required' }),
    code: z.string({ required_error: 'code is required' }),
});

module.exports = { favSchema };