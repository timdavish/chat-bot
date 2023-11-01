import {VERIFY_USER_ERROR} from '../constants/errors.js'

import {UserModel} from '../db/models/UserModel.js'

import {getOpenAiApi} from '../utils/index.js'

import type {NextFunction, Request, Response} from 'express'
import type {ChatCompletionRequestMessage} from 'openai'

export const createChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserModel.findById(res.locals.jwtData.id)

  if (!user) {
    return res.status(401).json({
      error: VERIFY_USER_ERROR,
    })
  }

  const {message} = req.body

  try {
    user.chats.push({
      content: message,
      role: 'user',
    })

    const openAiApi = getOpenAiApi()

    const chatResponse = await openAiApi.createChatCompletion({
      messages: user.chats.map(
        chat =>
          ({
            content: chat.content,
            role: chat.content,
          } as ChatCompletionRequestMessage)
      ),
      model: 'gpt-3.5-turbo',
    })

    user.chats.push(chatResponse.data.choices[0].message!)
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
