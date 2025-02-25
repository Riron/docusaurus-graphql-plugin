import { buildSchema } from "graphql";
import { groupSortedTypes } from "../../groupSortedTypes";
import { convertEnumsToMarkdown } from "../convertEnumsToMarkdown";

describe("convertEnumsToMarkdown", () => {
  function getTypePath() {
    return "#";
  }

  it("should render enums", () => {
    const schema = buildSchema(`
      """
      Represents a user's role.
      """
      enum UserRole {
        "User has admin rights."
        Admin
        "User has no particular rights."
        User
        "Unknown user"
        Anonymous
          @deprecated(
            reason: "Anonymous will be removed with the next major release"
          )
      }
    `);
    const { enums } = groupSortedTypes(Object.values(schema.getTypeMap()));

    expect(
      convertEnumsToMarkdown(enums, {
        getTypePath,
      })
    ).toMatchSnapshot();
  });
});
