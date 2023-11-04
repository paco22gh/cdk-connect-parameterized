#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PacoCdkConnectStack } from '../lib/paco-cdk-connect-stack';


const app = new cdk.App();
new PacoCdkConnectStack(app, 'PacoCdkConnectStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  instanceArn:'arn:aws:connect:us-west-2:122372919864:instance/25e8510b-3248-4d78-bc31-ba21cb0c468f',
  timezone: cdk.TimeZone.AMERICA_MEXICO_CITY.timezoneName,
  env: { account: '122372919864', region: 'us-west-2' },
  name: 'Pacos availability',    description: 'The time to reach out Paco',
  label_key: 'origin',
  label_value: 'cdk',
  sthours: 8,
  stminutes: 0,
  ethours: 17,
  etminutes: 0,
  daysofweek: [['MONDAY',8,0,17,0],['TUESDAY',8,0,17,0],['WEDNESDAY',8,0,17,0],['THURSDAY',8,0,17,0],['FRIDAY',8,0,14,0]]
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});