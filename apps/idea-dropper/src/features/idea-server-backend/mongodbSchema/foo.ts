
export async function validate() {
  // MongoDB code for schema validation

  // await db.command({
  //   "collMod": process.env.GAMES_COLLECTION_NAME,
  //   "validator": {
  //       $jsonSchema: {
  //           bsonType: "object",
  //           required: ["name", "price", "category"],
  //           additionalProperties: false,
  //           properties: {
  //           _id: {},
  //           name: {
  //               bsonType: "string",
  //               description: "'name' is required and is a string"
  //           },
  //           price: {
  //               bsonType: "number",
  //               description: "'price' is required and is a number"
  //           },
  //           category: {
  //               bsonType: "string",
  //               description: "'category' is required and is a string"
  //           }
  //           }
  //       }
  //    }
  // });

}
