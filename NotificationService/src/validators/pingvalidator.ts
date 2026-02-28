import * as z from 'zod'
const pingschema=z.object({
    message:z.string().min(1)
})
export default pingschema