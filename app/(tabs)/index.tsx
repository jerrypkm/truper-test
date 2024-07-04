import { Image, StyleSheet, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { getPokemons } from '@/services/pokemon-service';
import { View } from 'react-native';
import { PokemonCard } from '@/components/PokemonCard';
import {  Result } from '@/interfaces/pokemon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonDetails } from '@/components/PokemonDetails';

export default function HomeScreen() {
  const [allPokemons, setAllPokemons] = useState<Result[]>()
  const [filteredPokemons, setFilteredPokemons] = useState<Result[]>()
  const [search, setSearch] = useState('')
  useEffect(() => {
    getPokemons().then(res => {
      setAllPokemons(res.results)
      setFilteredPokemons(res.results)
    })
  }, [])

  const onChange = (search: string) => {
    setSearch(search)
    filterPokemons(search)
  }

  const filterPokemons = (param: string) => {
    if(allPokemons){
      let localAllPokemons: Result[] = allPokemons;
      localAllPokemons = allPokemons.filter((el) => el.name.startsWith(param))
      console.log(localAllPokemons)
      setFilteredPokemons(localAllPokemons)
    }
  }
  return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Hola mundo!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView>
          <SafeAreaView>
            <TextInput style={styles.input} value={search} onChangeText={onChange}></TextInput>
          </SafeAreaView>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          {
            filteredPokemons ? filteredPokemons.map(pokemon => <PokemonCard key={pokemon.name} url={pokemon.url}></PokemonCard>)
            :  <ThemedText>Loading...</ThemedText>
          }

        </ThemedView>
      </ParallaxScrollView>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
