/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Inject, Injectable, OpaqueToken} from '@angular/core';
import {print} from '../facade/lang';
import {MeasureValues} from '../measure_values';
import {Reporter} from '../reporter';
import {SampleDescription} from '../sample_description';

import {formatNum, formatStats, sortedProps} from './util';


/**
 * A reporter for the console
 */
@Injectable()
export class ConsoleReporter extends Reporter {
  static PRINT = new OpaqueToken('ConsoleReporter.print');
  static COLUMN_WIDTH = new OpaqueToken('ConsoleReporter.columnWidth');
  static PROVIDERS = [
    ConsoleReporter, {provide: ConsoleReporter.COLUMN_WIDTH, useValue: 18},
    {provide: ConsoleReporter.PRINT, useValue: print}
  ];

  private static _lpad(value: string, columnWidth: number, fill = ' ') {
    var result = '';
    for (var i = 0; i < columnWidth - value.length; i++) {
      result += fill;
    }
    return result + value;
  }

  private _metricNames: string[];

  constructor(
      @Inject(ConsoleReporter.COLUMN_WIDTH) private _columnWidth: number,
      sampleDescription: SampleDescription,
      @Inject(ConsoleReporter.PRINT) private _print: Function) {
    super();
    this._metricNames = sortedProps(sampleDescription.metrics);
    this._printDescription(sampleDescription);
  }

  private _printDescription(sampleDescription: SampleDescription) {
    this._print(`BENCHMARK ${sampleDescription.id}`);
    this._print('Description:');
    var props = sortedProps(sampleDescription.description);
    props.forEach((prop) => { this._print(`- ${prop}: ${sampleDescription.description[prop]}`); });
    this._print('Metrics:');
    this._metricNames.forEach((metricName) => {
      this._print(`- ${metricName}: ${sampleDescription.metrics[metricName]}`);
    });
    this._print('');
    this._printStringRow(this._metricNames);
    this._printStringRow(this._metricNames.map((_) => ''), '-');
  }

  reportMeasureValues(measureValues: MeasureValues): Promise<any> {
    var formattedValues = this._metricNames.map(metricName => {
      var value = measureValues.values[metricName];
      return formatNum(value);
    });
    this._printStringRow(formattedValues);
    return Promise.resolve(null);
  }

  reportSample(completeSample: MeasureValues[], validSamples: MeasureValues[]): Promise<any> {
    this._printStringRow(this._metricNames.map((_) => ''), '=');
    this._printStringRow(
        this._metricNames.map(metricName => formatStats(validSamples, metricName)));
    return Promise.resolve(null);
  }

  private _printStringRow(parts: any[], fill = ' ') {
    this._print(
        parts.map(part => ConsoleReporter._lpad(part, this._columnWidth, fill)).join(' | '));
  }
}
