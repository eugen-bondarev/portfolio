import Stars from '../Stars'

interface RatingProps {
  average: number
  count: number
}

const Rating = ({ average, count }: RatingProps) => (
  <div className="flex gap-2">
    <Stars value={average} starSize={24} />
    <span>
      {average} ({count} Reviews)
    </span>
  </div>
)

export default Rating
