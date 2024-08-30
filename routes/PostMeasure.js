import { Measure } from '../models/measure.js'
import { Op } from 'sequelize'
import * as yup from 'yup'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Buffer } from 'buffer'
import { Customer } from '../models/customer.js';
import request from 'request'

export class PostMeasure {

  async create(req, res) {
    
    let schema = yup.object().shape({
      measure_datetime: yup.string().matches(/^\d{4}-(0[1-9]|1[0-2])$/, 'Data invalida - formato aceito: yyyy-mm - ex: 2024-08').required('campo measure_datetime deve ser definido'),
      measure_type: yup.string().oneOf(['WATER', 'GAS'], 'measure_type deve ser WATER ou GAS').required('campo measure_type deve ser definido'),
      customer_code: yup.string().typeError('customer_code invalido').required('campo customer_code deve ser definido'),
      image: yup.string().matches(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/, 'imagem deve estar em base64').required('campo image deve ser definido')
    });
    
    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (err) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: err.errors[0], 
      })
    }
    
    
    const { measure_datetime, measure_type, customer_code, image } = req.body    
    
    const measure_mes = await Measure.findOne(
      {
        where: {
          measure_datetime: {
            [Op.like]: measure_datetime
          }
        }
      }
    )
    
    if (measure_mes) {
      return res.status(409).json({error_code: 'DOUBLE_REPORT', error_description: 'Leitura do mês já realizada'})
    } else {
      try {

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
          // Choose a Gemini model.
          model: "gemini-1.5-pro",
        });
        
        // Generate content using text and the URI reference for the uploaded file.
        const result = await model.generateContent([
          {
            inlineData: {
              mimeType: 'image/png',
              data: image
            }
          },
          { text: "Transcript only the numbers on the image." },
        ]);

        // criar link temporario
        const fileUri = 'https://filebin.net/geminishopper/' + measure_datetime
        const requestSettings = {
          method: 'POST',
          url: fileUri,
          headers: {
            'Content-Type': 'application/octet-stream'
          },
          body: Buffer.from(image, 'base64')
        };
        requestSettings.encoding = null;
        request(requestSettings)
        

        // adicionar customer se nao existir
        const customer = await Customer.findOne({
          where: {
            customer_code: customer_code
          }
        })
        if ( !customer ) {
          Customer.create({customer_code: customer_code})
        }


        const response = await Measure.create({measure_datetime: measure_datetime, measure_type: measure_type, measure_value: parseInt(result.response.text()), image_url: fileUri, CustomerId: customer_code  })
        return res.status(200).json({image_url: fileUri, measure_value: parseInt(result.response.text()), measure_uuid:response.uuid});
        
      } catch (e) {
        return res.status(e.statusCode || 500).json({ error: e.message });
      }
    }
  }
}



    

