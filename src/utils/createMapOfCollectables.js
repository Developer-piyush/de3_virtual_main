export default function createMapOfCollectables(ownedNfts) {
  const map = new Map();

  if (ownedNfts == null || ownedNfts.length === 0) {
    return map;
  }

  ownedNfts.forEach((nft) => {
    if (!map.has(nft.type)) {
      map.set(nft.type, []);
    }

    map.get(nft.type).push(nft);
  });

  return map;
}
