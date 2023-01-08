import { messages } from './messages'
import axios from 'axios'

async function main() {
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i]
        let endpoint = 'shipment'
        if (message.type === 'ORGANIZATION') {
            endpoint = 'organization'
        }

        try {
            await axios.post(`http://localhost:3000/${endpoint}`, message).then(res => {
                console.log(res.data);
            })
        } catch (error) {
            console.error(error.code)
        }

    }

    try {
        await axios.get(`http://localhost:3000/organizations/381f5cc5-dfe4-4f58-98ad-116666855ca3`).then(res => {
            console.log(res.data);
        })
    } catch (error) {
        console.error(error.code)
    }

    try {
        await axios.get(`http://localhost:3000/shipments/S00001175`).then(res => {
            console.log(res.data);
        })
    } catch (error) {
        console.error(error.code)
    }

    try {
      await axios.get(`http://localhost:3000/weights/total/tonne`).then(res => {
          console.log(res.data);
      })
  } catch (error) {
      console.error(error.code)
  }

}

main()
