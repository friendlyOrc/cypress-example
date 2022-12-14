export const expectedSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "http://example.com/example.json",
  type: "object",
  title: "The root schema",
  description: "The root schema comprises the entire JSON document.",
  default: {},
  required: ["status", "data", "message"],
  properties: {
    status: {
      $id: "#/properties/status",
      type: "string",
      title: "The status schema",
      description: "An explanation about the purpose of this instance.",
      default: "",
    },
    data: {
      $id: "#/properties/data",
      type: "array",
      title: "The data schema",
      description: "An explanation about the purpose of this instance.",
      default: [],
      additionalItems: true,
      items: {
        $id: "#/properties/data/items",
        anyOf: [
          {
            $id: "#/properties/data/items/anyOf/0",
            type: "object",
            title: "The first anyOf schema",
            description: "An explanation about the purpose of this instance.",
            default: {},
            required: [
              "id",
              "employee_name",
              "employee_salary",
              "employee_age",
              "profile_image",
            ],
            properties: {
              id: {
                $id: "#/properties/data/items/anyOf/0/properties/id",
                type: "integer",
                title: "The id schema",
                description:
                  "An explanation about the purpose of this instance.",
                default: 0,
              },
              employee_name: {
                $id: "#/properties/data/items/anyOf/0/properties/employee_name",
                type: "string",
                title: "The employee_name schema",
                description:
                  "An explanation about the purpose of this instance.",
                default: "",
              },
              employee_salary: {
                $id: "#/properties/data/items/anyOf/0/properties/employee_salary",
                type: "integer",
                title: "The employee_salary schema",
                description:
                  "An explanation about the purpose of this instance.",
                default: 0,
              },
              employee_age: {
                $id: "#/properties/data/items/anyOf/0/properties/employee_age",
                type: "integer",
                title: "The employee_age schema",
                description:
                  "An explanation about the purpose of this instance.",
                default: 0,
              },
              profile_image: {
                $id: "#/properties/data/items/anyOf/0/properties/profile_image",
                type: "string",
                title: "The profile_image schema",
                description:
                  "An explanation about the purpose of this instance.",
                default: "",
              },
            },
            additionalProperties: true,
          },
        ],
      },
    },
    message: {
      $id: "#/properties/message",
      type: "string",
      title: "The message schema",
      description: "An explanation about the purpose of this instance.",
      default: "",
    },
  },
  additionalProperties: true,
};
