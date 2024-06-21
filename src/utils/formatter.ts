export const formatDate = (date: Date | undefined) => {
    if (!date) return
    return new Intl.DateTimeFormat('eng', {
        dateStyle: 'medium',
    }).format(new Date(date))
}
