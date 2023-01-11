export default class NFT {
  constructor(values) {
    this.id = values?.id ?? "";
    this.type = values?.type ?? "";
    this.family = values?.family ?? "";
    this.title = values?.title ?? "";
    this.description = values?.description ?? "";
    this.imgUrl = values?.imgUrl ?? "";
    this.issuedAt = values?.issuedAt ?? null;
    this.updatedAt = values?.updatedAt ?? null;
    this.extraInformation = values?.extraInformation ?? {};
  }

  get isEvolvable() {
    return this.extraInformation.generation <= 2;
  }

  static fromNear(data) {
    const metadata = data?.metadata ?? {};
    return new NFT({
      id: data?.token_id,
      type: data?.token_type,
      family: data?.token_family,
      title: metadata.title,
      description: metadata.description,
      imgUrl: metadata.media,
      issuedAt: metadata.issued_at,
      updatedAt: metadata.updated_at,
      extraInformation:
        metadata.extra != null ? JSON.parse(metadata.extra) : {},
    });
  }
}
