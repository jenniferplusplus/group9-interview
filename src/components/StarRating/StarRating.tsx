function StarRating (props: {average: number, count: number}) {
  const normalizedAverage = Math.round(props.average / 2);
  let starString = '';

  // TODO: Use a symbol font for consistent star appearances
  for(let i = 1; i <= 5; i++)
  {
    starString += i <= normalizedAverage ? '⭐' : '★';
  }
  return <span>{starString} <small>({props.count} votes)</small></span>;
}

export default StarRating;
