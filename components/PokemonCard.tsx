import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { useEffect, useState } from 'react';
import { getSinglePokemon } from '@/services/pokemon-service';
import { SinglePokemon } from '@/interfaces/singlePokemon';
import { PokemonDetails } from './PokemonDetails';

export type ThemedViewProps = {
  url: string,
};

export function PokemonCard({url}: ThemedViewProps) {
  const [pokemon, setPokemon] = useState<SinglePokemon>()
  const [openDetails, setOpenDetails] = useState(false)
  useEffect(() => {
    getSinglePokemon(url).then((res) => setPokemon(res))
  }, [])

  const onPress = () => {
    setOpenDetails(!openDetails)
  }
  

  return <>
    {pokemon ? <TouchableOpacity onPressOut={onPress}>
        {openDetails ? <PokemonDetails url={url}></PokemonDetails> :
          <View style={styles.card}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{
              uri: pokemon.sprites.front_default 
            }}></Image>
          </View>
          <View style={styles.attributes}>
            <ThemedText>Id: #{pokemon.id}</ThemedText>
            <ThemedText>Nombre: {pokemon.name}</ThemedText>
            <ThemedText>Peso: {pokemon.weight}g</ThemedText>
          </View>
          <View style={styles.height}>
            <ThemedText>Altura: {pokemon.height}cm</ThemedText>
          </View>
        </View>
        }
          
      </TouchableOpacity>
    : <ThemedText>Loading...</ThemedText>}
  </>;
}

const styles = StyleSheet.create({
  card:{
    padding: 20,
    backgroundColor: '#f2f2f2',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
  },
  imgContainer:{
    flex: 0.3,
  },
  img:{
    width: 80,
    height: 80
  },
  attributes:{
    flex: 0.5
  },
  height:{
    flex: 0.2,
    alignSelf: 'flex-end'
  }
})