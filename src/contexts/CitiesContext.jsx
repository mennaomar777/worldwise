import { createContext, useContext, useEffect, useState } from "react";
const CitiesContext = createContext();

export default function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  async function fetchCities() {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/cities");
      const data = await res.json();
      setCities(data);
    } catch (error) {
      throw new Error("There was an error loading cities");
    } finally {
      setIsLoading(false);
    }
  }

  async function getCity(id) {
    setIsLoading(true);
    if (Number(id) === currentCity.id) return;
    try {
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      throw new Error("There was an error loading the city.");
    } finally {
      setIsLoading(false);
    }
  }
  async function createCity(newCity) {
    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      throw new Error("There was an error creating the city.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "Delete",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
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
