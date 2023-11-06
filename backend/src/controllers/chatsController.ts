import {VERIFY_USER_ERROR} from '../constants/errors.js'

import {UserModel} from '../db/models/UserModel.js'

// import {getOpenAiApi} from '../utils/index.js'

import type {NextFunction, Request, Response} from 'express'
// import type {ChatCompletionRequestMessage} from 'openai'

const FAKE_RESPONSE_CHAT_MESSAGE = {
  content: "This is a fake response because OpenAI's free tier is horrendously bad. Sorry!",
  role: 'assistant',
}

export const createChatMessage = async (req: Request, res: Response, _next: NextFunction) => {
  const user = await UserModel.findById(res.locals.jwtData.id)

  if (!user) {
    return res.status(401).json({
      error: VERIFY_USER_ERROR,
    })
  }

  const {content} = req.body

  try {
    user.chats.push({
      content,
      role: 'user',
    })

    // const openAiApi = getOpenAiApi()

    // const chatCompletionRes = await openAiApi.createChatCompletion({
    //   messages: user.chats.map(
    //     chat =>
    //       ({
    //         content: chat.content,
    //         role: chat.role,
    //       } as ChatCompletionRequestMessage)
    //   ),
    //   model: 'gpt-3.5-turbo',
    // })

    // user.chats.push(chatCompletionRes.data.choices[0].message!)
    user.chats.push(FAKE_RESPONSE_CHAT_MESSAGE)
    await user.save()

    return res.status(200).json({
      chats: user.chats,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: 'Something went wrong.',
    })
  }
}
