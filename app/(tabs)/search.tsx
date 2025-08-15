import MovieCard from "@/components/MovieCard";
import Searchbar from "@/components/Searchbar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/servies/api";
import { updateSearchCount } from "@/servies/appwrite";
import useFetch from "@/servies/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // First, set up the debounced query without depending on movies
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => {
    // Check if the debounced query is empty.
    if (!debouncedQuery.trim()) {
      // If it's empty, do not call the API.
      // Return a resolved promise with an empty array to clear the list.

      return Promise.resolve([]);
    }
    // If there is a query, call the fetchMovies API.
    return fetchMovies({ query: debouncedQuery });
  }, [debouncedQuery]); // Pass debouncedQuery as a dependency to trigger refetch

  // Separate useEffect to handle updateSearchCount after movies are loaded
  useEffect(() => {
    if (debouncedQuery.trim() && movies?.length > 0 && movies[0]) {
      updateSearchCount(debouncedQuery, movies[0]);
    }
  }, [debouncedQuery, movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <Searchbar
                placeholder="Search Movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size={"large"}
                // Corrected the hex color code
                color={"#0000ff"}
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              debouncedQuery.trim() &&
              movies?.length === 0 && (
                <Text className="text-center text-white/80 text-lg mt-4">
                  No results found for "{debouncedQuery}".
                </Text>
              )}
          </>
        }
      />
    </View>
  );
};

export default Search;
