
export const HandleBoolean = (item?: boolean) => {
    if (item === null || item === undefined) return '-'
    return (item === true) ? 'Y': 'N'
} 