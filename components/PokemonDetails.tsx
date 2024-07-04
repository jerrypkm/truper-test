import { View, Image, StyleSheet, FlatList, Text } from 'react-native';
import { ThemedText } from './ThemedText';
import { useEffect, useState } from 'react';
import { getSinglePokemon } from '@/services/pokemon-service';
import { SinglePokemon } from '@/interfaces/singlePokemon';

export type ThemedViewProps = {
  url: string,
};

export function PokemonDetails({url}: ThemedViewProps) {
  const [pokemon, setPokemon] = useState<SinglePokemon>()
  useEffect(() => {
    getSinglePokemon(url).then((res) => setPokemon(res))
  }, [])
  

  return <>
    {pokemon ? <View style={styles.card}>
      <View style={styles.attributes}>
          <ThemedText>Id: #{pokemon.id}</ThemedText>
          <ThemedText>{pokemon.name}</ThemedText>
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{
            uri: pokemon.sprites.front_default 
          }}></Image>
        <Image style={styles.img} source={{
          uri: pokemon.sprites.back_default 
        }}></Image>
      </View>
      <ThemedText>Peso: {pokemon.weight}g</ThemedText>
      <ThemedText>Altura: {pokemon.height}cm</ThemedText>

      <View style={styles.movements}>
        <ThemedText style={{fontSize: 20, marginBottom: 10,}}>Movimientos</ThemedText>
        <FlatList
          data={pokemon.abilities}
          renderItem={({item, index}) => <ThemedText style={styles.item}>#{index} {item.ability.name}</ThemedText>}
        />
      </View>
    </View>
    : <ThemedText>Loading...</ThemedText>}
  </>;
}

const styles = StyleSheet.create({
  card:{
    padding: 20,
    backgroundColor: '#f2f2f2',
    flex: 1,
    borderRadius: 10,
  },
  imgContainer:{
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  img:{
    width: 80,
    height: 80
  },
  attributes:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  height:{
    flex: 1,
    alignSelf: 'flex-end'
  },
  movements:{
    marginTop:30,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
  },
  item:{

  }
})