
export const split_FilePath = (path: string) => {
    if (path == null || path == undefined) return ''
    const paths = path.split('\\')

    // console.log('split_FilePath:', paths)
    // console.log('filename:', paths[paths.length -1])

    return path.split('\\')
}

export const extract_FileName = (path: string) => {
    if (path == null || path == undefined) return ''
    const paths = path.split('\\')

    return paths[paths.length -1]
}