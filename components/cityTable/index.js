import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { getCities, sortByParameter } from "../../helpers";

const CityTable = () => {
  const [cityData, setCityData] = useState([]);

  const route = useRouter();
  const query = route.query;

  console.log(route);

  useEffect(async () => {
    const cities = await getCities();
    if (query.orderByField) {
      setCityData(sortByParameter(cities, query.orderByField));
    } else {
      setCityData(cities);
    }
    console.dir(cities);
  }, [query]);

  const tableRows = cityData.map((row, idx) => {
    if (row) {
      let {
        number,
        city,
        country,
        allBuildings,
        ["100m+"]: hundred,
        ["150m+"]: oneFifty,
        ["200m+"]: twoHundred,
        ["300m+"]: threeHundred,
        telecomTowers,
        allStructures,
      } = row;

      return (
        <Tr key={`${idx}-${number}`}>
          <Th isNumeric>{number}</Th>
          <Th>{city}</Th>
          <Th>{country}</Th>
          <Th isNumeric>{allBuildings}</Th>
          <Th isNumeric>{hundred}</Th>
          <Th isNumeric>{oneFifty}</Th>
          <Th isNumeric>{twoHundred}</Th>
          <Th isNumeric>{threeHundred}</Th>
          <Th isNumeric>{telecomTowers}</Th>
          <Th isNumeric>{allStructures}</Th>
        </Tr>
      );
    }
  });

  return (
    <Table variant="simple">
      <TableCaption fontSize="md">
        Cities and number of high rise buildings
      </TableCaption>
      <Thead>
        <Tr>
          <Th isNumeric>#</Th>
          <Th>City</Th>
          <Th>country</Th>
          <Th isNumeric>All buildings</Th>
          <Th isNumeric>100m+</Th>
          <Th isNumeric>150m+</Th>
          <Th isNumeric>200m+</Th>
          <Th isNumeric>300m+</Th>
          <Th isNumeric>telecom towers</Th>
          <Th isNumeric>all structures</Th>
        </Tr>
      </Thead>
      <Tbody>{tableRows}</Tbody>
    </Table>
  );
};

export default CityTable;
