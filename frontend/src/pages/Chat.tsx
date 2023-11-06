import {useCallback, useRef, useState} from 'react'

import {Avatar, Box, Button, IconButton, Typography} from '@mui/material'
import {IoMdSend} from 'react-icons/io'

import {red} from '@mui/material/colors'
import {api} from '../helpers'

import {useAuthContext} from '../context/AuthContext'

import {ChatItem} from '../components/ChatItem'

import type {ChatMessage} from '../types'

const CHAT_MESSAGES: ChatMessage[] = [
  {
    content: 'Give me some JavaScript.',
    role: 'user',
  },
  {
    content:
      "Certainly! Here's a plain string of an example JavaScript code block that calculates the factorial of a number:\n\n```javascript\nfunction factorial(n) {\n  if (n === 0 || n === 1) {\n    return 1;\n  } else {\n    return n * factorial(n - 1);\n  }\n}\n\nconst result = factorial(5);\nconsole.log(`Factorial of 5 is ${result}`);\n```\n\nYou can copy and paste this code into a JavaScript environment to calculate the factorial of a number. This code defines a recursive function to calculate the factorial and then calculates the factorial of 5, printing the result to the console.",
    role: 'assistant',
  },
]

export const Chat = () => {
  const authContext = useAuthContext()
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(CHAT_MESSAGES)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = useCallback(async () => {
    const content = inputRef.current?.value

    if (content) {
      if (inputRef.current) {
        inputRef.current.value = ''
      }

      const newMessage: ChatMessage = {
        content,
        role: 'user',
      }

      setChatMessages(chatMessages => [...chatMessages, newMessage])
      const {chats} = await api.createChatMessage(content)
      setChatMessages(chats as ChatMessage[])
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        gap: 3,
        height: '100%',
        marginTop: 3,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: {
            md: 'flex',
            sm: 'none',
            xs: 'none',
          },
          flex: 0.3,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgb(17, 29, 39)',
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'column',
            height: '60vh',
            marginX: 3,
            width: '100%',
          }}
        >
          <Avatar
            sx={{
              backgroundColor: '#ffffff',
              color: '#000000',
              fontWeight: 700,
              marginX: 'auto',
              marginY: 2,
            }}
          >
            {authContext?.user?.name[0]}
            {authContext?.user?.name.split(' ')?.[1]?.[0]}
          </Avatar>

          <Typography
            sx={{
              fontFamily: 'work sans',
              marginX: 'auto',
            }}
          >
            You are talking to MERN-GPT bot.
          </Typography>

          <Typography
            sx={{
              fontFamily: 'work sans',
              marginX: 'auto',
              marginY: 4,
              padding: 3,
            }}
          >
            You can ask any question related to knowledge, business, advice, education, etc. Try to
            avoid sharing personal information!
          </Typography>

          <Button
            sx={{
              backgroundColor: red[300],
              borderRadius: 3,
              color: '#ffffff',
              fontWeight: 700,
              marginX: 'auto',
              marginY: 'auto',
              width: '200px',

              ':hover': {
                backgroundColor: red.A400,
              },
            }}
          >
            {' '}
            Clear Conversation
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: {
            md: 0.7,
            sm: 1,
            xs: 1,
          },
          flexDirection: 'column',
          paddingX: 3,
        }}
      >
        <Typography
          sx={{
            color: '#ffffff',
            fontSize: '40px',
            fontWeight: 600,
            marginBottom: 2,
            marginX: 'auto',
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>

        <Box
          sx={{
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '60vh',
            marginX: 'auto',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            width: '100%',
          }}
        >
          {chatMessages.map((chatMessage, index) => {
            const {content, role} = chatMessage

            return <ChatItem content={content} key={index} role={role} />
          })}
        </Box>

        <div
          style={{
            backgroundColor: 'rgb(17, 27, 39)',
            borderRadius: '8px',
            display: 'flex',
            margin: 'auto',
            padding: '20px',
            width: '100%',
          }}
        >
          <input
            ref={inputRef}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '20px',
              outline: 'none',
              padding: '10px',
              width: '100%',
            }}
            type='text'
          />

          <IconButton
            onClick={handleSubmit}
            sx={{
              color: '#ffffff',
              marginLeft: 'auto',
            }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  )
}
