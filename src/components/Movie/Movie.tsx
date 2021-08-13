import React, { Component } from 'react';

function Movie(data: {title: string}) {
  return <article>{data.title}</article>
}

export default Movie;
