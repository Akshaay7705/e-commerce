export const createSession = (name,sessionValue) => {
    return sessionStorage.setItem(name, sessionValue)
}  

export const getSession = (name) => {
    return sessionStorage.getItem(name)
}  

export const removeSession = (name) => {
    return sessionStorage.removeItem(name)
}  