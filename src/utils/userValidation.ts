export const isEmpty = (...strings: string[]): boolean => {
    const isEmptyArr = strings.map((str) => {
        if (str === null || str === undefined || str.length === 0 || isHavingOnlyWhiteSpaces(str))
            return true
        return false
    })

    return isEmptyArr.includes(true)
}

const isHavingOnlyWhiteSpaces = (elem: string): boolean => {
    if (elem.replace(/\s/g, '').length) return false
    return true
}
