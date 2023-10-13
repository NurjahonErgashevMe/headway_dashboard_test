/* eslint-disable @typescript-eslint/no-explicit-any */
const GetParamsWithFInd = (
  dataWithId: any[],
  idName: string,
  id: string | number,
  returnParams: string[]
) => {
  const finded = dataWithId?.find((item) => item[idName] === id);
  return returnParams.map((item) => finded?.[item])?.join(' ');
};

export default GetParamsWithFInd;
