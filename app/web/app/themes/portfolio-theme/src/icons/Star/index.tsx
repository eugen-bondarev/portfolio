import { ReactNode } from 'react'
import SvgProps from 'types/svg-props'
import StarEmpty from '../StarEmpty'
import StarHalf from '../StarHalf'
import StarFull from '../StarFull'

export type StarVariant = 'full' | 'half' | 'empty'

interface StarProps extends SvgProps {
  variant: StarVariant
}

const Star = ({ variant, ...props }: StarProps) =>
  ((
    {
      empty: StarEmpty,
      half: StarHalf,
      full: StarFull,
    } as Record<StarVariant, (_: SvgProps) => JSX.Element>
  )[variant](props))

export default Star
