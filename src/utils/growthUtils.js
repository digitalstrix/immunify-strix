import { LINE_TYPES, CHILD_LINE } from '../constants/growthConstants';

const extractData = (stdGraphs, measurement, dataKey) => {
    return stdGraphs[measurement].map(point => point[dataKey]);
}

export const generateGrowthDatasets = (stdGraphs, growthInfo, measurement) => {
    const stdGowthLines = LINE_TYPES.map((line) => {
        return ({
            ...line,
            data: extractData(stdGraphs, measurement, line.dataKey)
        });
    });
    stdGowthLines.push({
        ...CHILD_LINE,
        data: growthInfo[measurement]
    });
    return stdGowthLines;
};

export const generateLabels = (stdGraphs, measurement) => extractData(stdGraphs, measurement, 'name');

const fillBlanks = (data, measurement, top = 60) => {
    const output = [];
    for(let i = 0; i <= top; i++) {
        output.push(null);
    }
    data.forEach((record) => {
        // discard record if the age is not within the accepted range
        if (record.adjustedAge >= 0 && record.adjustedAge <= top) {
            output[record.adjustedAge] = record[measurement];
        }        
    });
    return output;
};

export const processGrowthData = (data = []) => {
    const filtered = data.map((record) => {
        const ceiled = Math.ceil(record.age);
        const diff = ceiled - record.age;
        return {
            ...record,
            adjustedAge: diff <= 0.5 ? ceiled : Math.floor(record.age),
            diff: diff <= 0.5 ? diff : record.age - Math.floor(record.age)
        };        
    }).reduce((acc, val) => {
        const curr = acc[val.adjustedAge];
        if (!curr || curr.diff > val.diff) {
            acc[val.adjustedAge] = val;
        }
        return acc;
    }, {});

    const intermediate = Object.entries(filtered)
    .sort((a, b) => a[0] > b[0] ? 1 : -1)
    .map(([key, value]) => value);

    return {
        height: fillBlanks(intermediate, 'height', 24),
        weight: fillBlanks(intermediate, 'weight'),
        hcw: fillBlanks(intermediate, 'hcw')
    };

};