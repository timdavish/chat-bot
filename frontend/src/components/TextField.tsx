import {TextField as BaseTextField} from '@mui/material'

interface Props {
  label: string
  name: string
  type: string
}

export const TextField = ({label, name, type}: Props) => {
  return (
    <BaseTextField
      InputLabelProps={{
        style: {
          color: '#ffffff',
        },
      }}
      InputProps={{
        style: {
          color: '#ffffff',
          borderRadius: '10px',
          fontSize: '20px',
          width: '400px',
        },
      }}
      label={label}
      margin='normal'
      name={name}
      type={type}
    />
  )
}
