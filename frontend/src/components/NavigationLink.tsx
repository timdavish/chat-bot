import {Link} from 'react-router-dom'

interface Props {
  backgroundColor: string
  onClick?: () => void
  text: string
  textColor: string
  to: string
}

export const NavigationLink = ({backgroundColor, onClick, text, textColor, to}: Props) => {
  return (
    <Link
      className='nav-link'
      onClick={onClick}
      style={{
        backgroundColor,
        color: textColor,
      }}
      to={to}
    >
      {text}
    </Link>
  )
}
