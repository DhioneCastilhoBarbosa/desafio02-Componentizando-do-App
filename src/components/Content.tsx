import { useEffect, useState } from 'react';

import {MovieCard} from "../components/MovieCard";
import { api } from '../services/api';

interface GenreResponseProps{
  id: number,
  name:"action"|"comedy"|"documentary"|"drama"|"horror"|"family",
  title: string,
}

interface MovieProps{
  imdbID: string,
  Title: string,
  Poster: string,
  Ratings: Array<{
    Source: string,
    Value:string,
  }>,

  Runtine: string

}

interface ContentProps{
  GenreID: number,
  
}

export function Content(props: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.GenreID}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${props.GenreID}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [props.GenreID]);

  return (
    <div className="container">
      <main>
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtine} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}
