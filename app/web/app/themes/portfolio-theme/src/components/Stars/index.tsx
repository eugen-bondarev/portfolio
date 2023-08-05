import Star, { StarVariant } from '../../icons/Star'

const MAX_STARS = 5

const valueToStarVariants = (value: number): StarVariant[] => {
  const numFullStars = Math.floor(value)
  const numEmptyStars = MAX_STARS - Math.ceil(value)
  const numHalfStars = MAX_STARS - (numFullStars + numEmptyStars)
  return [
    ...Array(numFullStars).fill('full'),
    ...Array(numHalfStars).fill('half'),
    ...Array(numEmptyStars).fill('empty'),
  ]
}

interface StarsProps {
  value: number
  starSize: number
}

const Stars = ({ value, starSize }: StarsProps) => (
  <div className="flex gap-2 items-center">
    {valueToStarVariants(value).map((variant: StarVariant, i) => (
      <Star variant={variant} width={starSize} height={starSize} key={i} />
    ))}
  </div>
)

export default Stars
