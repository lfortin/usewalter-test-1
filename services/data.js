
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const statusEnum = require('../constants/package-status');

const residents = [
    {
        id: 'a3151ea3-b5f2-4574-88de-a1ac96f0836c',
        firstName: 'Buzz',
        lastName: 'Lightyear',
    },
    {
        id: '28e40c84-d53f-4896-8c4d-4bd3454440f8',
        firstName: 'Lightning',
        lastName: 'McQueen',
    },
];

const packages = [
    {
        id: '97dd2084-8de0-4e85-bffd-be9477694c97',
        name: 'some equipment',
        type: 'hardware',
        status: statusEnum.CREATED,
    },
    {
        id: '3e0411fe-b14c-4a91-b246-57be5fd393e9',
        name: 'food',
        type: 'food',
        status: statusEnum.PROCESSED,
    },
];

const dataService = {
    getResidents: async function() {
        return residents;
    },
    getPackages: async function() {
        return packages;
    },
    createPackage: async function(name, type, status) {
        // here we may validate data input...

        let package = {
            id: uuidv4(),
            name,
            type,
            status,
        };
        packages.push(package);

        return package;
    },
    setPackageStatus: async function(packageId, status) {
        // here we may validate data input...

        let package = _.find(packages, item => item.id === packageId);
        package.status = status;

        return package;
    },
};

module.exports = dataService;
