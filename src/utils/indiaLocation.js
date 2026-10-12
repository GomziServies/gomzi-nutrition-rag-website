import { State, City } from "country-state-city";

export const states = State.getStatesOfCountry("IN").map((state) => ({
  label: state.name,
  value: state.isoCode,
}));

export const getCities = (stateCode) => {
  if (!stateCode) return [];

  return City.getCitiesOfState("IN", stateCode).map((city) => ({
    label: city.name,
    value: city.name,
  }));
};
