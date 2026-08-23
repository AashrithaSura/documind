import test from 'node:test'; import assert from 'node:assert/strict'; import {keywords,relevant,sentences} from '../src/utils/text.js';
test('splits readable sentences',()=>assert.equal(sentences('First useful sentence here. Second useful sentence here.').length,2));
test('extracts useful keywords',()=>assert.ok(keywords('Privacy privacy controls controls security').includes('Privacy')));
test('retrieval preserves page source',()=>assert.equal(relevant([{page:4,text:'Security recommendations require review.'}], 'What security recommendations?')[0].page,4));
