import { useState } from 'react';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';


import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        handleClick={handleClickButton}
        GenreId={selectedGenreId}
      />
      <Content
        GenreID={selectedGenreId}
      />
    </div>
  )
}