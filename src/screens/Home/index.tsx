import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import SwipeableButton from '../../components/SwipeableButton';

import {
  Container,
  Button,
  Separator,
  Title,
  Content,
  Chapter,
  ChapterText,
} from './styles';

import { BOOKS_MAP } from '../../constants';

export interface IBook {
  name: string;
  length: number;
}

const Home = () => {
  const navigation = useNavigation();

  const renderBookItem: ListRenderItem<IBook> = ({ item }) => (
    <SwipeableButton book={item}>
      <Button
        onPress={() => navigation.navigate('Book', { book: item })}
      >
        <Content>
          <Title>{item.name}</Title>

          <Chapter>
            <Entypo name="open-book" size={18} color="#999" />
            <ChapterText> {item.length} Capítulos</ChapterText>
          </Chapter>
        </Content>
      </Button>
    </SwipeableButton>
  );

  return (
    <Container>
      <FlatList
        data={BOOKS_MAP}
        keyExtractor={book => book.name}
        renderItem={renderBookItem}
        ItemSeparatorComponent={() => <Separator />}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      />
    </Container>
  );
};

export default Home;
