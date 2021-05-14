import {
  Stage,
  Construct,
  StageProps,
} from "@aws-cdk/core";
import { StorageStack } from "./StorageStack";

export class StorageStage extends Stage {
  constructor(
  scope: Construct,
  id: string,
  props?: StageProps
  ) {
    super(scope, id, props);

    new StorageStack(
    this,
    "storage-stack"
    );
  }
}