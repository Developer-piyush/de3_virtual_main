export default class Purchasable {
  constructor(values) {
    this.id = values?.id ?? "";
    this.title = values?.title ?? "";
    this.description = values?.description ?? "";
    this.imgUrl = values?.imgUrl ?? "";
    this.issuedAt = values?.issuedAt ?? null;
    this.updatedAt = values?.updatedAt ?? null;
    // TODO price
    this.maxSupply = values?.maxSupply ?? 0;
    this.isAvailable = values?.isAvailable ?? false;
  }

  static fromNear(id, metadata, isAvailable) {
    return new Purchasable({
      id,
      isAvailable,
      title: metadata.title,
      description: metadata.description,
      imgUrl: metadata.media,
      issuedAt: metadata.issued_at,
      updatedAt: metadata.updated_at,
      maxSupply: isNaN(parseInt(metadata.copies))
        ? 0
        : parseInt(metadata.copies),
    });
  }
}
