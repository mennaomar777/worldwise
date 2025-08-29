import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

const CitiesContext = createContext();

export default function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  async function fetchCities() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("cities").select("*");
      if (error) throw error;
      setCities(data);
    } catch (error) {
      console.error(error);
      throw new Error("There was an error loading cities");
    } finally {
      setIsLoading(false);
    }
  }

  async function getCity(id) {
    setIsLoading(true);
    if (Number(id) === currentCity.id) return;
    try {
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      setCurrentCity(data);
    } catch (error) {
      console.error(error);
      throw new Error("There was an error loading the city.");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("cities")
        .insert([newCity])
        .select()
        .single();
      if (error) throw error;
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.error(error);
      throw new Error("There was an error creating the city.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("cities").delete().eq("id", id);
      if (error) throw error;
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.error(error);
      throw new Error("There was an error deleting the city.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Unknown context");
  return context;
}
