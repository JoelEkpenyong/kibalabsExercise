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

export const getOrderParameter = (url) => {
  return url.split("=")[1]; //get's the sorting paramter by spliting the url into an array and getting the last item
};

export const sortByParameter = (array, parameter = "number") => {
  if (parameter !== "city" && parameter !== "country") {
    return array.sort((a, b) => (+a[parameter] > +b[parameter] && 1) || -1);
  }

  return array.sort((a, b) => (a[parameter] > b[parameter] && 1) || -1);
};
