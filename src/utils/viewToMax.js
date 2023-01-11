export default async function viewToMax(
  account,
  contractName,
  methodName,
  args,
  offsetKey = "from_index"
) {
  if (
    account == null ||
    contractName == null ||
    contractName === "" ||
    methodName == null ||
    methodName === "" ||
    args == null
  ) {
    throw new Error("All parameters are required");
  }

  let resultsArr = [];
  const limit = "20";
  let fromIdx = 0;

  while (true) {
    const callResultsArr = await account.viewFunction(
      contractName,
      methodName,
      {
        ...args,
        limit,
        [offsetKey]: `${fromIdx}`,
      }
    );

    if (callResultsArr == null) {
      throw new Error("Call returned undefined response");
    }

    resultsArr = [...resultsArr, ...callResultsArr];

    if (callResultsArr.length < 20) {
      break;
    }

    fromIdx += 20;
  }

  return resultsArr;
}
