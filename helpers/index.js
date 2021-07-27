import Papa from "papaparse";

export const getCities = async () => {
  const response = await fetch("/data/cities.csv");
  const reader = response.body.getReader();
  const result = await reader.read(); // raw array
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value); // the csv text
  const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
  const data = results.data; // array of objects

  return data;
};

export const sortByParameter = (array, parameter) => {
  if (parameter !== "city" && parameter !== "country") {
    return array.sort((a, b) => (+a[parameter] > +b[parameter] && 1) || -1);
  }

  return array.sort((a, b) => (a[parameter] > b[parameter] && 1) || -1);
};
