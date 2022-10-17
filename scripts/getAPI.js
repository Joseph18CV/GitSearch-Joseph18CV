async function getAPI (url) {
    try{
        const api = await fetch(url)
        const apiJson = await api.json()
        return apiJson
    }catch(error){
        return error
    }
}