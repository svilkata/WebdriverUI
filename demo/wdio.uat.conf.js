//merge parent conf object + add new changes in aut conf(baseUrl, waitForTimeout, mochaOpts)

import merge from 'deepmerge'; //Merges the enumerable properties of two or more objects deeply.
import { config as wdioConf } from './wdio.conf.js';

export const config = merge(wdioConf, {
    baseUrl: 'https://rahulshettyacademy.com',
    waitForTimeout: 5000,
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        grep: "Sanity",  //use only test cases where in the name of the test case is the sanity word
    }
});