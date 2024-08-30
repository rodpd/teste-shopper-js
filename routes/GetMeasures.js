import { Customer } from '../models/customer.js';
import { Measure } from '../models/measure.js'
import { Op } from 'sequelize'

export class GetMeasures {

    async getAll(req, res) {
        
        let data, tipo = req.query.measure_type
        
        if (tipo !== undefined) {
            tipo = tipo.toUpperCase()
            if ( tipo !== 'WATER' && tipo !== 'GAS' ) {
                return res.status(400).json({error_code: 'INVALID_TYPE', error_description: 'Tipo de medição não permitida'})
            } else {
                data = await Customer.findOne({
                    where: {
                        customer_code: req.params.customer_code,
                    },
                    include: {
                        model: Measure,
                        attributes: [['uuid', 'measure_uuid'], 'measure_datetime', 'measure_type', 'has_confirmed', 'image_url'],
                        where: {
                            measure_type: tipo
                        }
                    }
                })
            }
        } else {
            data = await Customer.findOne({
                where: {
                    customer_code: req.params.customer_code
                },
                include: {
                    model: Measure,
                    attributes: [['uuid', 'measure_uuid'], 'measure_datetime', 'measure_type', 'has_confirmed', 'image_url']
                }
            })
        }

            
        if ( !data ) {
            res.status(404).json({error_code: 'MEASURES_NOT_FOUND', error_description: 'Nenhuma leitura encontrada' })
        } else {
            res.status(200).send(data)
        }

        

    }

    
}
