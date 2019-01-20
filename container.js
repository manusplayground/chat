const dependable = require("dependable");
const path = require("path");

const container = dependable.container();

const dependencies = [
    ['_', 'lodash']
];

dependencies.forEach((dependency) => {
    container.register(dependency[0], () => {
        return dependency[1];
    })
});

container.load(path.join(__dirname, "/controllers"));
container.load(path.join(__dirname, "/helpers"));

container.register("container", () => {
    return container;
});

module.exports = container;

