#!/usr/bin/env node
import {App, Construct, Stack} from '@aws-cdk/core';
import { CdkpipelinesDemoPipelineStack } from '../lib/cdkpipelines-demo-pipeline-stack';
import {CdkpipelinesDemoStage} from "../lib/cdkpipelines-demo-stage";
import { StorageStage } from "../lib/StorageStage";

const app = new App();

new CdkpipelinesDemoPipelineStack(app, 'CdkpipelinesDemoPipelineStack', {
    env: { account: '280619947791', region: 'us-east-2' },
});
//
// new CdkpipelinesDemoStage(app, 'Dev', {
//   env: {account: '280619947791', region: 'us-east-2'}
// })

// const parent = new Construct(app, 'Parent');
// const stack = new Stack(parent, 'Stack');

app.synth();