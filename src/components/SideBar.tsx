import { useEffect, useState } from "react";

import { api } from "../services/api";
import { Button } from "./Button";
import { Content } from "./Content";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  handleClick: (id: number) => void,
  GenreId: number,
}

export function SideBar(props: SideBarProps) {
  
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  //const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => props.handleClick(genre.id)}
          selected={props.GenreId === genre.id}
        />
      ))}
      </div>
    </nav>
  )
}