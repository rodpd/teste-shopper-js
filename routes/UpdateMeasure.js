import { Measure } from '../models/measure.js'
import { Op } from 'sequelize'
import * as yup from 'yup'

export class UpdateMeasure {


  async update (req, res) {

    const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    
    let schema = yup.object().shape({
      measure_uuid: yup.string().matches(uuidRegex, 'uuid invalido').required('campo measure_uuid deve ser definido'),
      confirmed_value: yup.number().typeError('confirmed_value deve ser um numero').required('campo confirmed_value deve ser definido')
    });
  
    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (err) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: err.errors[0], 
      })
    }
  
    const { measure_uuid, confirmed_value } = req.body
  
    const measure = await Measure.findOne({
      where: {
        uuid: {
          [Op.eq]: measure_uuid
        }
      }
    })
  
    if ( !measure ) {
      return res.status(404).json({error_code: "MEASURE_NOT_FOUND", error_description: "Leitura do mês já realizada"})
  
    } else {
  
      if ( measure.has_confirmed ) {
        return res.status(409).json({error_code: "CONFIRMATION_DUPLICATE", error_description: "Leitura do mês já realizada"})
      } else {
        measure.measure_value = confirmed_value
        measure.has_confirmed = true
      
        await measure.save()
      
        try {
          const response = await measure.save()
          return res.status(200).json({success: true});
        } catch (e) {
          return res.status(e.statusCode || 500).json({ error: e.message });
        }
      
      }
    }
  }
  
}
