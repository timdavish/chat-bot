import {Configuration, OpenAIApi} from 'openai'

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY
const OPEN_AI_ORGANIZATION_ID = process.env.OPEN_AI_ORGANIZATION_ID

export const getOpenAiApi = () => {
  if (!OPEN_AI_API_KEY) {
    throw new Error('OPEN_AI_API_KEY not set.')
  }

  if (!OPEN_AI_ORGANIZATION_ID) {
    throw new Error('OPEN_AI_ORGANIZATION_ID not set.')
  }

  console.log(OPEN_AI_API_KEY, OPEN_AI_ORGANIZATION_ID)

  const openAiConfiguration = new Configuration({
    apiKey: OPEN_AI_API_KEY,
    organization: OPEN_AI_ORGANIZATION_ID,
  })

  return new OpenAIApi(openAiConfiguration)
}
