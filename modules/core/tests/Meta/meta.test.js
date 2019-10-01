import mercuryCore from "../../dist/mercury-core";
test("test for code Container runner", () => {
  const { Meta } = mercuryCore.Code;
  const meta = new Meta()
  const createdAt = meta.createdAt
  const updateAt = meta.updatedAt
  const deletedAt = meta.deletedAt

  expect(createdAt).not.toBe(meta.assignCreatedAt())
  expect(updateAt).not.toBe(meta.assignUpdatedAt())
  expect(deletedAt).not.toBe(meta.assignDeletedAt())
  meta.assignCreatedAt(1)
  meta.assignUpdatedAt(1)
  meta.assignDeletedAt(1)
  expect(meta.createdAt).toBe(1)
  expect(meta.updatedAt).toBe(1)
  expect(meta.deletedAt).toBe(1)
});
