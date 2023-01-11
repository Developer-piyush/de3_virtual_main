import Prismic from "@prismicio/client";
const apiEndpoint = "https://mtvrs.cdn.prismic.io/api/v2";

const client = Prismic.client(apiEndpoint);

const prismicFetcher = async (prismicType, uid) => {
  if (uid) {
    return client.getByUID(prismicType, uid);
  }

  const response = await client.query(
    Prismic.Predicates.at("document.type", prismicType),
    {
      pageSize: 100,
    }
  );

  if (response?.results == null) {
    throw new Error("Prismic results not defined");
  }

  return response.results;
};

export default prismicFetcher;
