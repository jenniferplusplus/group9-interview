import React from 'react';

function Movie(data: {title: string, id: number}) {
  return <article>{data.title}</article>
}

export default Movie;
