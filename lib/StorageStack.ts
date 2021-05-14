import {
  Construct,
  Stack,
  StackProps,
} from "@aws-cdk/core";
import {
  AttributeType,
  Table,
} from "@aws-cdk/aws-dynamodb";

export class StorageStack extends Stack {
  constructor(
  scope: Construct,
  id: string,
  props?: StackProps
  ) {
    super(scope, id, props);

    const replicationRegions: string[] = [
      "us-west-2",
    ];

    new Table(this, "Table", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      replicationRegions,
    });
  }
}