const schema = `
    type Query {
        getResidents: [Resident]
        getPackages: [Package]
    }
    type Mutation {
        createPackage(name: String, type: String, status: Int): packageStatusMessage
        setPackageStatus(id: ID, status: Int): packageStatusMessage
        login(email: String, password: String): loginStatusMessage
    }
    type Resident {
        id: ID!
        firstName: String
        lastName: String
    }
    type Package {
        id: ID!
        name: String
        type: String
        status: Int
    }
    type packageStatusMessage {
        status: String
        package: Package
        message: String
    }
    type loginStatusMessage {
        status: String
        token: String
        message: String
    }
`;

module.exports = { schema: schema };
