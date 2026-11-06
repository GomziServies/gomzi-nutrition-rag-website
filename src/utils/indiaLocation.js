import locations from "../data/indiaLocations.json";

// India-only address options extracted from country-state-city 3.2.1.
export const states = locations.states;
export const getCities = stateCode => (locations.cities[stateCode] || []).map(name => ({ label: name, value: name }));
