import {Avatar, Box, Typography} from '@mui/material'

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

import {coldarkDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

import {useAuthContext} from '../context/AuthContext'

const getBlocksFromContent = (content: string) => {
  if (content.includes('```')) {
    return content.split('```')
  }

  return []
}

const getIsCodeBlock = (content: string) => {
  return (
    content.includes('=') ||
    content.includes(';') ||
    content.includes('[') ||
    content.includes(']') ||
    content.includes('{') ||
    content.includes('}') ||
    content.includes('#') ||
    content.includes('//')
  )
}

interface Props {
  content: string
  role: 'assistant' | 'user'
}

export const ChatItem = ({content, role}: Props) => {
  const authContext = useAuthContext()

  const isAssistant = role === 'assistant'
  const blocks = getBlocksFromContent(content)

  return isAssistant ? (
    <Box
      sx={{
        backgroundColor: '#004d5612',
        display: 'flex',
        gap: 2,
        marginY: 2,
        padding: 2,
      }}
    >
      <Avatar
        sx={{
          marginLeft: 0,
        }}
      >
        <img alt='Open AI' src='openai.png' width='30px' />
      </Avatar>

      <Box>
        {blocks.length > 0 ? (
          blocks.map((block, index) => {
            if (getIsCodeBlock(block)) {
              const [language, ...restBlock] = block.split('\n')
              const correctedBlock = restBlock.join('\n')

              return (
                <SyntaxHighlighter key={index} language={language} style={coldarkDark}>
                  {correctedBlock}
                </SyntaxHighlighter>
              )
            }

            return (
              <Typography fontSize={20} key={index}>
                {block}
              </Typography>
            )
          })
        ) : (
          <Typography fontSize={20}>{content}</Typography>
        )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        backgroundColor: '#004d56',
        display: 'flex',
        gap: 2,
        marginY: 0,
        padding: 2,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: '#000000',
          color: '#ffffff',
          marginLeft: 0,
        }}
      >
        {authContext?.user?.name[0]}
        {authContext?.user?.name.split(' ')?.[1]?.[0]}
      </Avatar>

      <Box>
        <Typography fontSize={20}>{content}</Typography>
      </Box>
    </Box>
  )
}
