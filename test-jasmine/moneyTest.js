import {formatCurrency} from '../script/utils/money.js';

describe('Test Suite: Format Currency', () => {
    it('convert Cents into Dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Work with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('round upto nearest number', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
})