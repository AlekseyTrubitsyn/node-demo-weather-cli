const getArgs = (arr) => {
    const args = arr.slice(2);

    const result = {};

    if (!args.length) {
        return result;
    }

    let i = 0;
    while (i < args.length) {
        const current = args[i];
        const next = args[i + 1];
        const isKey = c => c.charAt(0) === '-';

        switch (true) {
            case ((next === undefined || isKey(next))):
                result[current.substr(1)] = true;
            case (!isKey(current)):
                i++;
                continue;

            default:
                result[current.substr(1)] = next;
                i += 2;
        }
    }

    return result;
}

export default getArgs;
