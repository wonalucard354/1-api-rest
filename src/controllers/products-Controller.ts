import { Request, Response } from "express"
import { AppError } from "../utils/app-Error"
import { z } from "zod"
class ProductsController {

index(request: Request, response: Response) {
    const {page, limit} = request.query
    
    response.send(`Página ${page} de ${limit}`)
}

create(request: Request, response: Response) {
    const bodySchema = z.object({
        name: z.string({required_error:"Name is required"})
        .trim()
        .min(6,{ message: "Name must be 6 or more characters"}),
        price: z.number({required_error:"Price is required"})
        .positive({message: "Price must be positive"}),
        //.nullish(), é opcional se voce colocar ele na api por conta dele fazer a informação ser opcional
        //gte(numero escolhido)falar que o valor do produto nao pode ser menor do que o recomendado
    })
    
    const {name, price} = bodySchema.parse(request.body)
   /* if(!name) {
        throw new AppError("O nome do produto é obrigatório!")
    }
    if(name.trim().length < 6) {
        throw new AppError("O nome do produto deve ter pelo menos 6 caracteres!")
    }
    if(!price) {
        throw new AppError("Preço do produto é obrigatório!")
    }
    if(price < 0) {
        throw new AppError("Preço do produto não pode ser negativo!")
    }
    //throw new AppError("erro de exemplo")
*/
    response.status(201).json({ name, price, user_id: request.user_id })
}
}

export { ProductsController }