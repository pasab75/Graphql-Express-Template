module.exports = deepAssign = (object1, object2, maxDepth = 5) => {
    Object.keys(object1).forEach((key) => {
        if (!object2.hasOwnProperty(key)) object2[key] = object1[key];
        else if (
            object2[key] instanceof Object &&
            object1[key] instanceof Object &&
            depth > 0
        )
            object2[key] = deepAssign(object1[key], object2[key], depth--);
        else if (object2[key] instanceof Array && object1[key] instanceof Array)
            object2[key].concat(object1[key]);
        else if (object2[key] === undefined || object2[key] === null)
            object2[key] = object1[key];
    });
    return object2;
};
