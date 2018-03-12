let assert = require('assert'),
    PathParser = require('../lib/PathParser'),
    SampleHandler = require('../lib/SampleHandler');

describe('Parser', () => {
    it('parseData', () => {
        let parser = new PathParser();
        let pathData = "M40,70 Q50,150 90,90 T135,130 L160,70 C180,180 280,55 280,140 S400,110 290,100";

        parser.setHandler(new SampleHandler());
        parser.parseData(pathData);
    })
});
