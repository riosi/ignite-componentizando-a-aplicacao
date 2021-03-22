import { MovieCard } from '../components/MovieCard';
import { useEffect, useState } from 'react';
import { api } from '../services/api'
import '../styles/content.scss'

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenre: GenreResponseProps,
}


export function Content({ selectedGenre }: ContentProps) {

  const [movies, setMovies] = useState<MovieProps[]>([]);


  useEffect(() => {


    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenre.id}`).then(response => {
      setMovies(response.data)})
    }, [selectedGenre.id]);


   return (
    <div className="container">
    <header>
      <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    </header>

    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard 
          key ={movie.Title} 
          title={movie.Title} 
          poster={movie.Poster} 
          runtime={movie.Runtime} 
          rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  </div>
   )
}