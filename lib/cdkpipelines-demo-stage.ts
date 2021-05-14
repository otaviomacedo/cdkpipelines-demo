import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { CdkpipelinesDemoStack } from './cdkpipelines-demo-stack';
import {MyEc2AppStack} from "./ec2-stack";

/**
 * Deployable unit of web service app
 */
export class CdkpipelinesDemoStage extends Stage {
    public readonly urlOutput: CfnOutput;

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const service = new CdkpipelinesDemoStack(this, 'WebService', {
          stackName: "ActualService"
        });

      // new MyEc2AppStack(this, 'MyEc2AppStack', {
      //   env: {
      //     region: 'us-east-2',
      //     account: '11111111'
      //   }
      // });

        // Expose CdkpipelinesDemoStack's output one level higher
        this.urlOutput = service.urlOutput;
    }
}