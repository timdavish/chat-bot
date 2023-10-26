import {app} from './app.js'
import {connectToDatabase} from './db/utils/index.js'

const PORT = process.env.PORT || 5100

const run = async () => {
  try {
    await connectToDatabase()

    app.listen(PORT, () => {
      console.log(`Server listening on port "${PORT}".`)
    })
  } catch (error) {
    console.error(error)
  }
}

run()
