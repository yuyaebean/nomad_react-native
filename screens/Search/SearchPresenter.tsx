import React from 'react'
import styled from 'styled-components/native'
import Input from '../../components/Search/Input'
import HorizontalSlider from '../../components/HorizontalSlider'
import Vertical from '../../components/Vertical'
import ScrollContainer from '../../components/ScrollContainer'

interface Props {
  keyword: string
  movies: Array<any>
  shows: Array<any>
  onChange(e: any): void
  onSubmit(e: any): void
}

export default function SearchPresenter(props: Props) {
  const { keyword, movies, shows, onChange, onSubmit } = props

  return (
    <ScrollContainer refreshFn={onSubmit} loading={false}>
      <>
        <Input
          placeholder='Write a keyword'
          value={keyword}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        {movies.length !== 0 && (
          <HorizontalSlider title={'Movie results'}>
            {movies.map(movie => (
              <Vertical
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                votes={movie.vote_average}
              />
            ))}
          </HorizontalSlider>
        )}
        {shows.length !== 0 && (
          <HorizontalSlider title={'TV results'}>
            {shows.map(show => (
              <Vertical
                key={show.id}
                id={show.id}
                votes={show.vote_average}
                title={show.name}
                poster={show.poster_path}
              />
            ))}
          </HorizontalSlider>
        )}
      </>
    </ScrollContainer>
  )
}
