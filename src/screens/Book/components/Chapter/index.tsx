import React from 'react'

import ListHeader from '../../components/ListHeader'
import Verse from '../../components/Verse'

type ChapterProps = {
  item: string[]
  chapterIndex: number
}

const Chapter = ({ item, chapterIndex }: ChapterProps) => {
  return (
    <>
      {chapterIndex !== 0 && <ListHeader text={String(chapterIndex + 1)} />}

      {item.map((verse, verseIndex) => {
        return (
          <Verse
            key={`${chapterIndex}-${verseIndex}`}
            chapter={chapterIndex + 1}
            number={verseIndex + 1}
            text={verse}
          />
        )
      })}
    </>
  )
}

export default Chapter
