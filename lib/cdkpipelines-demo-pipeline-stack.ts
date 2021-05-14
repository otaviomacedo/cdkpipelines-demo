import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codebuild from '@aws-cdk/aws-codebuild';
import {Construct, SecretValue, Stack, StackProps} from '@aws-cdk/core';
import {CdkPipeline, SimpleSynthAction} from "@aws-cdk/pipelines";
import {CdkpipelinesDemoStage} from "./cdkpipelines-demo-stage";
import * as path from "path";
import {BuildSpec} from "@aws-cdk/aws-codebuild";
import { StorageStack } from "./StorageStack";
import { StorageStage } from "./StorageStage";

/**
 * The stack that defines the application pipeline
 */
export class CdkpipelinesDemoPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    // const buildProject = new codebuild.PipelineProject(this, 'BuildProject', {
    //   buildSpec: BuildSpec.fromObject({
    //     version: "0.2",
    //     phases: {
    //       install: {
    //         commands: [
    //           'nohup /usr/local/bin/dockerd --host=unix:///var/run/docker.sock --host=tcp://127.0.0.1:2375 --storage-driver=overlay2 &',
    //           'timeout 15 sh -c "until docker info; do echo .; sleep 1; done"',
    //         ]
    //       },
    //       build: {
    //         commands: [
    //           "docker build /home/dockremap"
    //         ]
    //       }
    //     }
    //   }),
    //   environment: {
    //     buildImage: codebuild.LinuxBuildImage.fromAsset(this, 'BuildImage', {
    //       directory: '/tmp/docker',
    //     }),
    //     privileged: true,
    //   },
    // });
    //
    // const synthAction = new codepipeline_actions.CodeBuildAction({
    //   actionName: 'Build',
    //   project: buildProject,
    //   input: sourceArtifact,
    //   outputs: [cloudAssemblyArtifact],
    // });


    const pipeline = new CdkPipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'MyServicePipeline',
      cloudAssemblyArtifact,

      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager('github-token'),
        owner: 'otaviomacedo',
        repo: 'cdkpipelines-demo',
      }),

      // synthAction,

      // How it will be built and synthesized
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,

        // We need a build step to compile the TypeScript Lambda
        buildCommand: 'npm run build'
      }),

    });

    pipeline.addApplicationStage(new StorageStage(this, 'storage'));

    // pipeline.addApplicationStage(new CdkpipelinesDemoStage(this, 'PreProd', {
    //   env: {account: '280619947791', region: 'us-east-2'}
    // }));

  }
}