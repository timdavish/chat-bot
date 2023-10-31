import 'dotenv/config'

import {createApp} from './app.js'
import {connectToDatabase} from './db/utils/index.js'

const PORT = process.env.PORT

const run = async () => {
  try {
    await connectToDatabase()

    const app = createApp()

    app.listen(PORT, () => {
      console.log(`Server listening on port "${PORT}".`)
    })
  } catch (error) {
    console.error(error)
  }
}

run()
