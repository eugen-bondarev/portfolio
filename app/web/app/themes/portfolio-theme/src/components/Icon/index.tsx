import { LineAwesomeIcon } from 'types/line-awesome'

interface IconProps {
  name: LineAwesomeIcon
}

const Icon = ({ name }: IconProps) => <i className={`las la-${name}`} />

export default Icon
