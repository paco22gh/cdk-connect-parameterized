import * as cdk from 'aws-cdk-lib';
import * as connect from 'aws-cdk-lib/aws-connect';
import { Construct } from 'constructs';
//import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';

interface PacoCdkConnectProps extends cdk.StackProps {
    env: { account: '122372919864', region: 'us-west-2' },
    instanceArn:string,
    timezone: string,
    name: string,
    description: string,
    label_key: string,
    label_value: string,
    sthours: number,
    stminutes: number,
    ethours: number,
    etminutes: number,
    daysofweek: any[]
}



export class PacoCdkConnectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PacoCdkConnectProps) {
    super(scope, id, props);

    /*const hoursOfOperationSTTimeSliceProperty: connect.CfnHoursOfOperation.HoursOfOperationTimeSliceProperty = {
      hours: props.sthours,
      minutes: props.stminutes,
    };*/
    
    /*const hoursOfOperationETTimeSliceProperty: connect.CfnHoursOfOperation.HoursOfOperationTimeSliceProperty = {
      hours: props.ethours,
      minutes: props.etminutes,
    };

    const hoursOfOperationConfigPropertym: connect.CfnHoursOfOperation.HoursOfOperationConfigProperty = {
      day: 'MONDAY',
      endTime: hoursOfOperationETTimeSliceProperty,
      startTime: hoursOfOperationSTTimeSliceProperty,
    };
    const hoursOfOperationConfigPropertyt: connect.CfnHoursOfOperation.HoursOfOperationConfigProperty = {
      day: 'THURSDAY',
      endTime: hoursOfOperationETTimeSliceProperty,
      startTime: hoursOfOperationSTTimeSliceProperty,
    };*/
    //Array to store the list of days and times
    const hoursOfOperationConfigProperties: any[] = []
    props.daysofweek.forEach(function (dayarr) {
      console.log(dayarr[0]);
      console.log(dayarr[1]);
      //Interface to store time
      const hoursOfOperationSTTimeSliceProperty: connect.CfnHoursOfOperation.HoursOfOperationTimeSliceProperty = {
        hours: dayarr[1],
        minutes: dayarr[2],
        };
      
      const hoursOfOperationETTimeSliceProperty: connect.CfnHoursOfOperation.HoursOfOperationTimeSliceProperty = {
        hours: dayarr[3],
        minutes: dayarr[4],
        };
      //Interface to store day
      const hoursOfOperationConfigProperty: connect.CfnHoursOfOperation.HoursOfOperationConfigProperty = {
        day: dayarr[0],
        endTime: hoursOfOperationETTimeSliceProperty,
        startTime: hoursOfOperationSTTimeSliceProperty,
       };
      hoursOfOperationConfigProperties.push(hoursOfOperationConfigProperty)
    });

    //const hoursOfOperationConfigProperties: any[] = []
     //hoursOfOperationConfigProperties.push(hoursOfOperationConfigPropertym)
     //hoursOfOperationConfigProperties.push(hoursOfOperationConfigPropertyt)

//leer props con foreach y usar una misma variable cons para ir agregando al push

    const cfnHoursOfOperation = new connect.CfnHoursOfOperation(this, 'pacoCdkHoursOfOperation', {
      config: hoursOfOperationConfigProperties,
      instanceArn: props.instanceArn,
      name: props.name,
      timeZone: props.timezone,
      // the properties below are optional
      description: props.description,
      tags: [{
        key: props.label_key,
        value: props.label_value,
      }],
    });

  }
  
}
