import React, { useState } from "react";
import { useQuery } from "react-query";
import { CharacterInterface } from "../interfaces/interfaces";
import { Character } from "./Character";

export const Characters = () => {
  const [page, setPage] = useState<number>(42);
  // Original fetch option, without any library

  // You would need to save the data in a state
  // const [characters, setCharacters] = useState<CharactersResult[]>();

  // Function that calls the api, jsons the response and sets it to the state
  // const fetchCharacters = async () => {
  //   const response = await fetch("https://rickandmortyapi.com/api/character");
  //   const data: CharactersInterface = await response.json();
  //   setCharacters(data.results);
  // };

  // useEffect to call the fetch function everytime the component loads
  // useEffect(() => {
  //   fetchCharacters();
  // }, []);

  // Fetch function that will be passed to the useQuery parameter.
  const fetchCharacters = async ({
    queryKey,
  }: {
    queryKey: (string | number)[];
  }) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    return response.json();
  };

  // First parameter to provide is a unique key. We can supply multiple keys as an array. Second parameter is the function and it receives the queryKeys
  // Returns data, status and some others
  const { data, status, isPreviousData } = useQuery(
    ["characters", page],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error...</div>;
  }

  console.log(data);

  return (
    <div className="characters">
      {data.results?.map((character: CharacterInterface) => (
        <Character key={character.id} character={character} />
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button
          disabled={page === data.info.pages || isPreviousData}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
