import { icons } from "@/constants/icons";
import { fetchMovieCredits, fetchMovieDetails } from "@/servies/api";
import useFetch from "@/servies/useFetch";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
  isFullWidth?: boolean;
}

const MovieInfo = ({ label, value, isFullWidth = true }: MovieInfoProps) => (
  <View className={`flex-col items-start justify-center mt-5 ${isFullWidth ? 'w-full' : ''}}`}>
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Badge = ({ text }: { text: string }) => (
  <View className="bg-dark-100 px-3 py-1 rounded-full mr-2 mb-2">
    <Text className="text-white text-xs">{text}</Text>
  </View>
);

const CastCard = ({ name, character, profilePath }: { name: string; character: string; profilePath: string | null }) => (
  <View className="mr-4 items-center" style={{ width: 100 }}>
    <Image
      source={{
        uri: profilePath
          ? `https://image.tmdb.org/t/p/w200${profilePath}`
          : "https://placehold.co/200x300/1a1a1a/ffffff.png?text=No+Image",
      }}
      className="w-[100px] h-[150px] rounded-lg mb-2"
      resizeMode="cover"
    />
    <Text className="text-white font-bold text-xs text-center" numberOfLines={1}>
      {name}
    </Text>
    <Text className="text-light-200 text-xs text-center" numberOfLines={1}>
      {character}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading: movieLoading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  const { data: credits, loading: creditsLoading } = useFetch(() =>
    fetchMovieCredits(id as string)
  );

  const openHomepage = () => {
    if (movie?.homepage) {
      Linking.openURL(movie.homepage);
    }
  };

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="relative">
          <Image
            source={{
              uri: movie?.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`
                : "https://placehold.co/600x400/1a1a1a/ffffff.png",
            }}
            className="w-full h-[250px]"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(10, 10, 10, 0.8)', '#0A0A0A']}
            className="absolute bottom-0 left-0 right-0 h-[100px]"
          />
          <View className="absolute bottom-[-60px] left-5 flex-row">
            <Image
              source={{
                uri: movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                  : "https://placehold.co/600x400/1a1a1a/ffffff.png",
              }}
              className="w-[120px] h-[180px] rounded-lg"
              resizeMode="cover"
            />
            <View className="ml-4 mt-auto mb-2 flex-1 pr-5">
              <Text className="text-white font-bold text-xl">{movie?.title}</Text>
              {movie?.tagline && (
                <Text className="text-light-200 italic text-sm mt-1">"{movie?.tagline}"</Text>
              )}
              <View className="flex-row items-center gap-x-2 mt-2">
                <Text className="text-light-200 text-sm">
                  {movie?.release_date?.split("-")[0]}
                </Text>
                {movie?.runtime && (
                  <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
                )}
                <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1">
                  <Image source={icons.star} className="size-3" />
                  <Text className="text-white font-bold text-xs">
                    {Math.round(movie?.vote_average ?? 0)}/10
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-col items-start justify-center mt-[70px] px-5">
          <View className="flex-row flex-wrap mt-4">
            {movie?.genres?.map((genre) => (
              <Badge key={genre.id} text={genre.name} />
            ))}
          </View>
          
          <MovieInfo label="Overview" value={movie?.overview} />
          
          <View className="flex-row justify-between w-full mt-5">
            <View className="w-[48%]">
              <MovieInfo
                label="Status"
                value={movie?.status}
                isFullWidth={false}
              />
            </View>
            <View className="w-[48%]">
              <MovieInfo
                label="Original Language"
                value={movie?.spoken_languages?.find(lang => lang.iso_639_1 === movie.original_language)?.english_name || movie?.original_language}
                isFullWidth={false}
              />
            </View>
          </View>
          
          <View className="flex-row justify-between w-full">
            <View className="w-[48%]">
              <MovieInfo
                label="Budget"
                value={movie?.budget ? `$${Math.round((movie?.budget || 0) / 1_000_000)} Million` : "N/A"}
                isFullWidth={false}
              />
            </View>
            <View className="w-[48%]">
              <MovieInfo
                label="Revenue"
                value={movie?.revenue ? `$${Math.round((movie?.revenue || 0) / 1_000_000)} Million` : "N/A"}
                isFullWidth={false}
              />
            </View>
          </View>

          {movie?.production_countries && movie.production_countries.length > 0 && (
            <MovieInfo
              label="Production Countries"
              value={movie.production_countries.map(country => country.name).join(", ")}
            />
          )}

          {movie?.production_companies && movie.production_companies.length > 0 && (
            <MovieInfo
              label="Production Companies"
              value={movie.production_companies.map(company => company.name).join(", ")}
            />
          )}
          
          {movie?.spoken_languages && movie.spoken_languages.length > 0 && (
            <MovieInfo
              label="Spoken Languages"
              value={movie.spoken_languages.map(lang => lang.english_name).join(", ")}
            />
          )}
          
          {credits?.cast && credits.cast.length > 0 && (
            <View className="mt-6 w-full">
              <Text className="text-white font-bold text-lg mb-4">Cast</Text>
              <FlatList
                data={credits.cast.slice(0, 15)} // Limit to first 15 cast members
                renderItem={({ item }) => (
                  <CastCard
                    name={item.name}
                    character={item.character}
                    profilePath={item.profile_path}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4"
              />
            </View>
          )}
          
          {movie?.homepage && (
            <TouchableOpacity 
              className="bg-accent rounded-lg py-3 mt-6 w-full items-center"
              onPress={openHomepage}
            >
              <Text className="text-white font-semibold">Visit Official Website</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-dark-100 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={"#fff"}
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
