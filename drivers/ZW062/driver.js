'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/781
// http://www.zwaveproducts.com/product-documentation/AeonLabs-ZW062-A1_manual.pdf

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		locked: [{
			command_class: 'COMMAND_CLASS_BARRIER_OPERATOR',
			command_get: 'BARRIER_OPERATOR_GET',
			command_report: 'BARRIER_OPERATOR_REPORT',
			command_report_parser: report => (report['State'] !== 'Closed'),
			command_set: 'BARRIER_OPERATOR_SET',
			command_set_parser: input => {
				return {
					'Target Value': (input) ? 'OPEN' : 'CLOSE'
				};
			}
		}]
	},
	settings: {
		startup_ringtone: {
			index: 32,
			size: 1,
			parser: input => new Buffer([(input) ? 1 : 0])
		},
		sensor_calibration: {
			index: 24,
			size: 1,
			parser: input => new Buffer([(input) ? 1 : 0])
		},
		opening_alarm_mode_led_frequency: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.opening_alarm_mode_sound),
				Number(newSettings.opening_alarm_mode_volume),
				Number(newSettings.opening_alarm_enabled)
			])
		},
		opening_alarm_mode_sound: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.opening_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.opening_alarm_mode_volume),
				Number(newSettings.opening_alarm_enabled)
			])
		},
		opening_alarm_mode_volume: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.opening_alarm_mode_led_frequency),
				Number(newSettings.opening_alarm_mode_sound),
				Number(input),
				Number(newSettings.opening_alarm_enabled)
			])
		},
		opening_alarm_enabled: {
			index: 37,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.opening_alarm_mode_led_frequency),
				Number(newSettings.opening_alarm_mode_sound),
				Number(newSettings.opening_alarm_mode_volume),
				Number(input)
			])
		},
		closing_alarm_mode_led_frequency: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.closing_alarm_mode_sound),
				Number(newSettings.closing_alarm_mode_volume),
				Number(newSettings.closing_alarm_enabled)
			])
		},
		closing_alarm_mode_sound: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closing_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.closing_alarm_mode_volume),
				Number(newSettings.closing_alarm_enabled)
			])
		},
		closing_alarm_mode_volume: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closing_alarm_mode_led_frequency),
				Number(newSettings.closing_alarm_mode_sound),
				Number(input),
				Number(newSettings.closing_alarm_enabled)
			])
		},
		closing_alarm_enabled: {
			index: 38,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closing_alarm_mode_led_frequency),
				Number(newSettings.closing_alarm_mode_sound),
				Number(newSettings.closing_alarm_mode_volume),
				Number(input)
			])
		},
		unknown_alarm_mode_led_frequency: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.unknown_alarm_mode_sound),
				Number(newSettings.unknown_alarm_mode_volume),
				Number(newSettings.unknown_alarm_enabled)
			])
		},
		unknown_alarm_mode_sound: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.unknown_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.unknown_alarm_mode_volume),
				Number(newSettings.unknown_alarm_enabled)
			])
		},
		unknown_alarm_mode_volume: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.unknown_alarm_mode_led_frequency),
				Number(newSettings.unknown_alarm_mode_sound),
				Number(input),
				Number(newSettings.unknown_alarm_enabled)
			])
		},
		unknown_alarm_enabled: {
			index: 39,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.unknown_alarm_mode_led_frequency),
				Number(newSettings.unknown_alarm_mode_sound),
				Number(newSettings.unknown_alarm_mode_volume),
				Number(input)
			])
		},
		closed_alarm_mode_led_frequency: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(input),
				Number(newSettings.closed_alarm_mode_sound),
				Number(newSettings.closed_alarm_mode_volume),
				Number(newSettings.closed_alarm_enabled)
			])
		},
		closed_alarm_mode_sound: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closed_alarm_mode_led_frequency),
				Number(input),
				Number(newSettings.closed_alarm_mode_volume),
				Number(newSettings.closed_alarm_enabled)
			])
		},
		closed_alarm_mode_volume: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closed_alarm_mode_led_frequency),
				Number(newSettings.closed_alarm_mode_sound),
				Number(input),
				Number(newSettings.closed_alarm_enabled)
			])
		},
		closed_alarm_enabled: {
			index: 40,
			size: 4,
			parser: (input, newSettings) => new Buffer([
				Number(newSettings.closed_alarm_mode_led_frequency),
				Number(newSettings.closed_alarm_mode_sound),
				Number(newSettings.closed_alarm_mode_volume),
				Number(input)
			])
		},
		report_type_state_changed: {
			index: 80,
			size: 1
		},
		sensor_pairing: {
			index: 241,
			size: 4,
			parser: input => {
				if (input) return new Buffer([85, 85, 85, 1]);
				return new Buffer([0, 0, 0, 0]);
			}
		}
	}
});
